'use strict';

/**
 * Controller that renders our about page.
 */
function about (request, response) {
  var contextData = {
    'title': 'The Half Mountain Team'
  };
  response.render('about', contextData);
}

module.exports = {
  about: about
};
