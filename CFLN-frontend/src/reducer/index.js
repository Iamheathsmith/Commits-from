
import {combineReducers} from 'redux';
import addUser from './addUser';
import getCommits from './getCommits';

export default combineReducers({
  addUser: addUser,
  getCommits: getCommits,
});
