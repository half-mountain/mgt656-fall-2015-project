'use strict';

var events = require('../models/events');
var express = require('express');
var router = express.Router();


/**
 * Controller that renders our index (home) page.
 */


function index (request, response) {

  events.getUpcomingEvents().success(function (eventList) {
    var contextData = {
      'title': 'Half Mountain',
      'tagline': 'Check out our upcoming events!',
      'events': eventList
    }
    response.render('index', contextData);

  }).error(function (err) {
      throw err;
  });
}

module.exports = {
  index: index
};
