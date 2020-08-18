import { getId } from '../utils/utils';

const initialState = {
  boxType: 'newProject',
  show: false,
  newProject: {
    width: 16,
    height: 16
  },
  colorSwapRows: [
    { id: getId(), from: null, to: null }
  ]
};

const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_WIDTH':
      return { ...state, newProject: { ...state.newProject, width: action.width }};
    case 'SET_PROJECT_HEIGHT':
      return { ...state, newProject: { ...state.newProject, height: action.height }};
    case 'SET_COLOR_SWAP_ROWS':
      return { ...state, colorSwapRows: action.colorSwapRows };
    case 'SHOW_BOX':
      return { ...state, boxType: action.boxType, show: true };
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

export const setProjectWidth = width => {
  return {
    type: 'SET_PROJECT_WIDTH',
    width
  };
};

export const setProjectHeight = height => {
  return {
    type: 'SET_PROJECT_HEIGHT',
    height
  };
};

export const setColorSwapRows = colorSwapRows => {
  return {
    type: 'SET_COLOR_SWAP_ROWS',
    colorSwapRows
  };
};

export default paletteReducer;
