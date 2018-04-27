'use strict';

const User = require('../model/users.list');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/adduser', bodyParser, (request, response) => {
    let user = new User({
      user: request.body.user,
    });
    user.save()
      .then(user => {
        response.status(201).json(user);
      })
      .catch(err => {
        return errorHandler(err, response);
      });
  });
};
