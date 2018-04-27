'use strict';


const superagent = require('superagent');
const schedule = require('node-schedule');
const User = require('../model/users.list');
const LastCommits = require('../model/past-date-commit');

module.exports = function () {
  schedule.scheduleJob({minute: 59}, function(){
    console.log('gettting new commits');
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
                let check = data.body[i].created_at.split('T');
                if (check[0] === date[0]) {
                  let commits =
            {
              searchResults: {
                Name: data.body[i].actor.login,
                Avator: data.body[i].actor.avatar_url,
                message: data.body[i].payload.commits ? data.body[i].payload.commits[0].message : 'User did not write a message',
                date: data.body[i].created_at,
              },
            };
                  holder.push(commits);
                }
              }
              return LastCommits.create(holder);
            }
            );
        });
        Promise.all(prom);
      });
  });

  schedule.scheduleJob({minute: 58}, function(){
    console.log('dropping commits');
    LastCommits.remove()
      .then(() => console.log('removed'))
      .catch(console.error);
  });
};
