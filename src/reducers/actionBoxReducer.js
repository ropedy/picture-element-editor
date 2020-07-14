const initialState = {
  boxType: 'newProject',
  show: false
};

const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_BOX':
      return { boxType: action.boxType, show: true };
    case 'HIDE_BOX':
      return { ...state, show: false };
    default:
      return state;
  }
};

export const showBox = boxType => {
  return {
    type: 'SHOW_BOX',
    boxType
  };
};

export const hideBox = () => {
  return {
    type: 'HIDE_BOX'
  };
};

export default paletteReducer;
