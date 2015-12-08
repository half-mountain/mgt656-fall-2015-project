'use strict';

/**
 * Controller that renders our donation page.
 */
function donation (request, response) {
  var contextData = {
    'title': 'Thank You!'
  };
  response.render('donation', contextData);
}

module.exports = {
  donation: donation
};
