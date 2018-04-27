export default (state=[], {type, payload}) => {

  switch (type) {
  case 'GET_COMMITS':
    return payload;
  default:
    return state;
  }
};
