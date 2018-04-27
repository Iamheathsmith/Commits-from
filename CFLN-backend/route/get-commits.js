'use strict';

const User = require('../model/users.list');
const LastCommits = require('../model/past-date-commit');
const superagent = require('superagent');
const errorHandler = require('../lib/error-handler');


module.exports = function(router) {
  router.get('/CF-commits-from-last-night', (request, response) => {
    console.log('getting commits');
    User.find()
      .then(user => user.map(user => user.user))
      .then(userList => {
        let prom = userList.map(user => {
          return superagent.get(`${process.env.GITHUB_URL}${user}/events/public`)
            .set('Authorization', `Basic ${process.env.BASIC_AUTH}`)
            .then(data => {
              let holder = [];
              let preDay = new Date(new Date().setDate(new Date().getDate() - 1));
              let date = preDay.toISOString().split('T');
              for (let i = 0; i < 10; i++) {
              // for (let i = 0; i < data.body.length; i++) {
                let check = data.body[i].created_at.split('T');
                console.log('test', check[0]);
                console.log('next', date[0]);
                if (check[0] <= date[0] && data.body[i].payload.commits) {
                  let commits = {
                    searchResults: {
                      Name: data.body[i].actor.login,
                      Avator: data.body[i].actor.avatar_url,
                      message: data.body[i].payload.commits[0].message,
                      date: data.body[i].created_at,
                    },
                  };
                  holder.push(commits);
                }
              }
              return LastCommits.create(holder);
            })
            .catch(console.error);
        });
        Promise.all(prom)
          .then(data => {
            response.status(200).json(data);
          })
          .catch(err => {
            errorHandler(err, response);
          });
      });
  });

  router.delete('/delete-comments', (request, response) => {
    console.log('deleting commits');
    LastCommits.remove()
      .then(() => response.sendStatus(204))
      .catch(err => errorHandler(err, response));
  });

};
