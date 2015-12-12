'use strict';

var mongo = require('mongodb');
var monk = require('monk');
// var mongoUri = process.env.MONGOLAB_URI;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  var db = monk("mongodb://localhost:27017/halfmountain")
}
if (process.env.NODE_ENV === 'production') {
  var db = monk(process.env.MONGOLAB_URI);
}

if (process.env.NODE_ENV === 'testing') {
  var db = monk("mongodb://localhost:27017/halfmountain");
}

var collection = db.get('eventlist');


/**
 * Returns the first event that has a particular id.
 */
function getById (id) {
   return collection.findOne({id: id});
}

function getAll () {
  return collection.find({}, {sort : { "date" : 1, "title": 1 } });
}

function getUpcomingEvents () {
  return collection.find({"date": { $gt: new Date() } }, {sort : { "date" : 1, "title": 1 } });
}

function getMaxId (callback, errorCallBack) {

  collection.findOne({}, {sort: {id: -1}}, function(err, object) {
    if (err) {
      errorCallBack(err);
    } else if (object === null){
      callback(0);
    } else {
      callback(object.id);
    }
  });

  // var maxId = null;
  // for (var i = allEvents.length - 1; i >= 0; i--) {
  //   if (maxId === null || maxId < allEvents[i].id){
  //     maxId = allEvents[i].id;
  //   }
  // }
  // return maxId;
}


module.exports = exports = {
  getAll: getAll,
  getById: getById,
  getMaxId: getMaxId,
  collection: collection,
  getUpcomingEvents: getUpcomingEvents
};
