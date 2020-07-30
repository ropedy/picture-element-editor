const initialState = {
  Space: false
};

const keyboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KEY':
      return { ...state,  [ action.key ]: action.state };
    default:
      return state;
  }
};

export const setKey = (key, state) => {
  return {
    type: 'SET_KEY',
    key, state
  };
};

export default keyboardReducer;
