'use strict';

var events = require('../models/events');
var validator = require('validator');

// Date data that would be useful to you
// completing the project These data are not
// used a first.
//
var allowedDateInfo = {
  months: {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  },
  minutes: [0, 30],
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ]
};

/**
 * Controller that renders a list of events in HTML.
 */
function listEvents(request, response) {
  var currentTime = new Date();
  var contextData = {
    'events': events.all,
    'time': currentTime
  };
  response.render('event.html', contextData);
}

/**
 * Controller that renders a page for creating new events.
 */
function newEvent(request, response){
  var contextData = {};
  response.render('create-event.html', contextData);
}

/**
 * Function that returns true if integer 
 */
function isInteger(x) {
  return x % 1 === 0;
}

/**
 * Controller to which new events are submitted.
 * Validates the form and adds the new event to
 * our global list of events.
 */
function saveEvent(request, response){
  var contextData = {errors: []};

  if (validator.isLength(request.body.title, 5, 50) === false) {
    contextData.errors.push('Your title should be between 5 and 100 letters.');
  }

  if (validator.isLength(request.body.location, 1, 50) === false) {
    contextData.errors.push('Your location should be between 1 and 50 characters.');
  }

  if (request.body.year>2016 || request.body.year<2015) {
    contextData.errors.push('The year of your event should be 2015 or 2016.');
  }

  if (isInteger(request.body.year) === false) {
    contextData.errors.push('The year of your event should be an integer.');
  }

  if (request.body.month>11 || request.body.month<0) {
    contextData.errors.push('The month of your event should be between January and December.');
  }

  if (isInteger(request.body.month) === false) {
    contextData.errors.push('The month of your event should be an integer.');
  }

  if (request.body.day>31 || request.body.day<1) {
    contextData.errors.push('The day of your event should be between the 1st and the 31st day of the month.');
  }

  if (isInteger(request.body.day) === false) {
    contextData.errors.push('The day of your event should be an integer.');
  }

  if (request.body.hour>23 || request.body.hour<0) {
    contextData.errors.push('The hour of your event should fall within the 24-hour day. Try again!');
  }

  if (isInteger(request.body.hour) === false) {
    contextData.errors.push('The hour of your event should be an integer.');
  }

  if (contextData.errors.length === 0) {
    var newEvent = {
      title: request.body.title,
      location: request.body.location,
      image: request.body.image,
      date: new Date(),
      attending: []
    };
    events.all.push(newEvent);
    response.redirect('/events');
  }else{
    response.render('create-event.html', contextData);
  }
}

function eventDetail (request, response) {
  var ev = events.getById(parseInt(request.params.id));
  if (ev === null) {
    // response.status(404).send('No such event'); // 404 PAGE NEEDS TO BE BETTER DEFINED
    response.render('event-detail.html', {event: ev});
  }
  response.render('event-detail.html', {event: ev});
}


// what is called when someone rsvps to an event
function rsvp (request, response){
  // takes the incoming params id and identifies the event user wants to RSVP to and then stores in variable "ev"
  var ev = events.getById(parseInt(request.params.id));
  // if it doesn't find the event, it says 'No such event'
  if (ev === null) {
    response.status(404).send('No such event');
  }

  if(validator.isEmail(request.body.email) && request.body.email.toLowerCase().indexOf('@yale.edu') !== -1){
    ev.attending.push(request.body.email);
    // Need to add a directive to save the event here.
    response.redirect('/events/' + ev.id);
  }else{
    var contextData = {errors: [], event: ev};
    if(request.body.email.toLowerCase().indexOf('harvard') !== -1){
      contextData.errors.push('Harvard not allowed!');
    }else{
      contextData.errors.push('Invalid email! Are you a Yale student?');
    }
    response.render('event-detail.html', contextData);
  }

}

/**
 * Export all our functions (controllers in this case, because they
 * handles requests and render responses).
 */
module.exports = {
  'listEvents': listEvents,
  'eventDetail': eventDetail,
  'newEvent': newEvent,
  'saveEvent': saveEvent,
  'rsvp': rsvp
};
