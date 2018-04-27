'use strict';

const mongoose = require('mongoose');

const UserList = mongoose.Schema({
  user: {type: Object, required: true},
});


module.exports = mongoose.model('userList', UserList);
