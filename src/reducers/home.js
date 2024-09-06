const homeReducer = (state = [], action) => {
  switch (action.type) {
    case 'HOME':
      return action.payload;
    default:
      return state;
  }
};

export default homeReducer;
