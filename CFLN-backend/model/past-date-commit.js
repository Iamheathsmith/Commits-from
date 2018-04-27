'use strict';

const mongoose = require('mongoose');

const PastCommits = mongoose.Schema({
  searchResults: {type: Object, required: true},
});


module.exports = mongoose.model('pastCommits', PastCommits);
