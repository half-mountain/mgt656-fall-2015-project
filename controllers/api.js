'use strict';

var events = require('../models/events');

/**
 * Controller that renders the API splash page
 */
function viewApi(request, response) {
  response.json({ message: 'API Landing Page' });
}

/**
 * Controller that renders a list of events in JSON.
 * Controller also handles searching for list of events using query string.
 */
function listEventsJSON(request, response) {
  var search = request.query.search;
  var output = {events: []};

  events.getAll().success(function (allEvents) {
    if (search) {
      for (var i = 0; i < allEvents.length; i++) {
        var curEvent = allEvents[i];
        if(curEvent.title.indexOf(search) !== -1) {
          output.events.push(curEvent);
        }
        else {
          for (var j = 0; j < curEvent.attending.length; j++) {
            if(curEvent.attending[j].indexOf(search) !== -1) {
              output.events.push(curEvent);
            }
          }
        }
      }
    }
    else {
      output.events = allEvents;
    }

    response.json(output);

  }).error(function (err) {
    throw err;
  });
}

/**
 * Controller that renders a specified event in JSON.
 */
function eventDetailJSON(request, response) {
  var ev = events.getById(parseInt(request.params.id));
  response.json({ event: ev });
}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'viewApi': viewApi,
  'listEventsJSON': listEventsJSON,
  'eventDetailJSON': eventDetailJSON
};
