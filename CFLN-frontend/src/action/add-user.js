import superagent from 'superagent';

export const addUser = searchResults => ({
  type: 'ADD_USER',
  payload: searchResults,
});

export const addUserAction = search => dispatch => {
  let sendData = {
    user: search.userName,
  };

  return superagent.post(`${__API_URL__}/adduser`)
    .send(sendData)
    .then(res => {
      return dispatch(addUser(res.body));
    })
    .catch(err => console.log(err));
};
