const initialState = {
  show: false
};

const colorEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY':
      return { ...state,  show: action.state };
    default:
      return state;
  }
};

export const setVisibility = (state) => {
  return {
    type: 'SET_VISIBILITY',
    state
  };
};

export default colorEditorReducer;
