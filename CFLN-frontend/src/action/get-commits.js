import superagent from 'superagent';

export const getCommits = searchResults => ({
  type: 'GET_COMMITS',
  payload: searchResults,
});

export const getCommitsAction = search => dispatch => {
  // let sendData = {
  //   user: search.userName,
  // };

  return superagent.get(`${__API_URL__}/CF-commits-from-last-night`)
    // .send(sendData)
    .then(res => {
      return dispatch(getCommits(res.body));
    })
    .catch(err => console.log(err));
};
