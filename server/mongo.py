from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
import urllib
import uuid

app = Flask(__name__)

with open("config.txt") as file:
    line = file.read()
pword = line


app.config['MONGO_DBNAME'] = 'test'
app.config['MONGO_URI'] = 'mongodb://apiuser:' + \
    urllib.parse.quote_plus(pword) + \
    '@ds211029.mlab.com:11029/polltalk'
mongo = PyMongo(app)


# @app.route('/star', methods=['GET'])
# def get_all_stars():
#     star = mongo.db.stars
#     output = []
#     for s in star.find():
#         output.append({'name': s['name'], 'distance': s['distance']})
#     return jsonify({'result': output})


# @app.route('/star', methods=['POST'])
# def add_star():
#     star = mongo.db.stars
#     name = request.json['name']
#     distance = request.json['distance']
#     star_id = star.insert({'name': name, 'distance': distance})
#     new_star = star.find_one({'_id': star_id})
#     output = {'name': new_star['name'], 'distance': new_star['distance']}
#     return jsonify({'result': output})

@app.route('/poll/<pollid>', methods=['GET'])
def get_poll(pollid):
    poll = mongo.db.polls
    # pollid = request.json['pollid']
    pollobject = poll.find_one({'pollID': pollid})
    output = {'pollName': pollobject['pollName'],
              'options': pollobject['options']}
    if pollobject:
        output = {'pollName': pollobject['pollName'],
                  'options': pollobject['options']}
    else:
        output = "COULD NOT FIND"
    return jsonify({'result': output})


@app.route('/createPoll', methods=['POST'])
def create_poll():
    pollid = uuid.uuid4().hex[:8].upper()
    poll = mongo.db.polls
    options = []
    # options = request.json['options']
    for option in request.json['options']:
        options.append({
            'option': option,
            'count': 0,
        })
    pollName = request.json['pollName']
    poll.insert({'pollID': pollid, 'pollName': pollName, 'options': options})
    output = {'pollName': pollName, 'options': options, 'pollID': pollid}
    return jsonify({'result': output})


@app.route('/poll/<pollid>/<option>', methods=['POST'])
def vote(pollid, option):
    poll = mongo.db.polls
    pollobject = poll.find_one({'pollID': pollid})
    if pollobject:
        pollobject['options'][int(option)]['count'] += 1
        poll.update({'pollID': pollid}, pollobject)
        output = {'pollName': pollobject['pollName'],
                  'options': pollobject['options']}
    else:
        output = "COULD NOT FIND"
    return jsonify({'result': output})


if __name__ == '__main__':
    app.run(debug=True)
