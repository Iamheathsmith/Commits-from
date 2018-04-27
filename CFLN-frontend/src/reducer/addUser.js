export default (state=[], {type, payload}) => {
  console.log('am in the reducer');
  switch (type) {
  case 'ADD_USER':
    return [...state, payload];
  default:
    return state;
  }
};
