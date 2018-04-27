'use strict';

const User = require('../model/users.list');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/adduser', bodyParser, (request, response) => {
    console.log('am hitting this', request.body.user);
    let user = new User({
      user: request.body.user,
    });
    user.save()
      .then(user => {
        console.log('i saved');
        response.status(201).json(user);
      })
      .catch(err => {
        console.log('i failed');
        return errorHandler(err, response);
      });
  });
};
