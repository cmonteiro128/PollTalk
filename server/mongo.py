from flask import Flask
from flask_socketio import SocketIO, send, join_room, leave_room
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import urllib
import uuid
import os

app = Flask(__name__)
CORS(app)
if (os.path.isfile("config.txt")):
    with open("config.txt") as file:
        line = file.read()
    pword = line
    port = 5000
else:
    pword = os.environ['DBPASS']
    print(pword)

port = int(os.environ.get('PORT', 5000))

app.config['SECRET_KEY'] = '9C494A6376164C5B8044A6465F47FC79'
app.config['MONGO_DBNAME'] = 'test'
app.config['MONGO_URI'] = 'mongodb://apiuser:' + \
    urllib.parse.quote_plus(pword) + \
    '@ds211029.mlab.com:11029/polltalk'
mongo = PyMongo(app)
socketio = SocketIO(app)

#
#   ROUTES FOR API'S
#

# Gets the information for a given poll.
# Serves as both the admin data returner and the user data returner
# Determined by the length of the poll ID given


@app.route('/poll/<pollid>', methods=['GET'])
@cross_origin()
def get_poll(pollid):
    output = internal_get_poll(pollid)
    return jsonify({'result': output})


def internal_get_poll(pollid):
    poll = mongo.db.polls
    # pollid = request.json['pollid']
    if len(pollid) == 8:
        pollobject = poll.find_one({'pollID': pollid, 'open': True})
        if pollobject:
            output = {'pollName': pollobject['pollName'],
                      'pollID': pollobject['pollID'],
                      'options': pollobject['options'],
                      'totalVotes': pollobject['totalVotes']}
        else:
            output = "COULD NOT FIND"
    elif len(pollid) == 32:
        pollobject = poll.find_one({'adminID': pollid})
        if pollobject:
            output = {'pollName': pollobject['pollName'],
                      'options': pollobject['options'],
                      'open': pollobject['open'],
                      'pollID': pollobject['pollID'],
                      'totalVotes': pollobject['totalVotes']}
        else:
            output = "COULD NOT FIND"
    return output

# Creates a poll and returns the Admin ID, and the POll ID
# Accepts a json with the format {'pollName','options[]'}


@app.route('/createPoll', methods=['POST'])
@cross_origin()
def create_poll():
    secretPollID = uuid.uuid4().hex.upper()
    pollid = secretPollID[:8]
    poll = mongo.db.polls
    options = []
    # options = request.json['options']
    for option in request.json['pollOptions']:
        options.append({
            'option': option,
            'count': 0,
            'chat': []
        })
    pollName = request.json['pollName']
    poll.insert({'pollID': pollid, 'pollName': pollName,
                 'options': options, 'open': True, 'adminID': secretPollID,
                 'totalVotes': 0})
    output = {'pollName': pollName, 'options': options,
              'pollID': pollid, 'adminID': secretPollID, 'totalVotes': 0}
    return jsonify({'result': output})

# Used to vote in the polls, increments the count for the
# index passed into the option parameter


@app.route('/poll/<pollid>/<int:option>', methods=['POST'])
@cross_origin()
def vote(pollid, option):
    poll = mongo.db.polls
    pollobject = poll.find_one({'pollID': pollid, 'open': True})
    if pollobject:
        pollobject['options'][int(option)]['count'] += 1
        pollobject['totalVotes'] += 1
        poll.update({'pollID': pollid}, pollobject)
        output = {'pollName': pollobject['pollName'],
                  'options': pollobject['options']}
    else:
        output = "COULD NOT FIND"
    return jsonify({'result': output})

# Used to close a poll, Poll can only be closed with the admin
# link


@app.route('/poll/<pollid>/close', methods=['POST'])
@cross_origin()
def closepoll(pollid):
    poll = mongo.db.polls
    pollobject = poll.find_one({'adminID': pollid})
    if pollobject:
        pollobject['open'] = False
        poll.update({"adminID": pollid}, pollobject)
        output = "Closed"
    else:
        output = "COULD NOT FIND"
    return jsonify({'result': output})


def add_to_chat(pollid, option, message, name):
    poll = mongo.db.polls
    pollobject = poll.find_one({'pollID': pollid, 'open': True})
    if pollobject:
        pollobject['options'][int(option)]['chat'].append(
            {'message': message, 'name': name})
        poll.update({'pollID': pollid}, pollobject)

#
#   SOCKET CONNECTIONS
#

# data = {room}


@socketio.on('join')
def on_join(data):
    print('joined room ' + data['room'])
    room = data['room']
    join_room(room)
    # send(get_poll((pollid)), room=room)
    data = internal_get_poll(room)
    socketio.emit('new_Data', {'result': data}, room=room, json=True)

# data = {room}


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)

# data = { room, option}


@socketio.on('vote')
def on_vote(data):
    room = data['room']
    data = data['option']
    vote(room, data)
    data = internal_get_poll(room)
    socketio.emit('new_Data', {'result': data}, room=room, json=True)

# data = {room, messege, name, option}


@socketio.on('chat')
def on_chat(data):
    room = data['room']
    message = data['message']
    name = data['name']
    option = data['option']
    add_to_chat(room, option, message, name)
    data = internal_get_poll(room)
    socketio.emit('new_Data', {'result': data}, room=room, json=True)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=port)
