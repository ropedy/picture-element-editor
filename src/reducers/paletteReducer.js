const initialState = {
  currentPalette: 0,
  palettes: [
    {
      id: 0,
      name: 'Test palette',
      colors: [
        '#000000', '#FFFFFF', '#FF0000', '#FFFF00',
        '#00FF00', '#00FFFF', '#0000FF', '#7F7F7F',
        '#FF00FF', '#FF7F00', '#007FFF', '#7FFF00',
        '#7F00FF', '#FF007F', '#00FF7F', '#FF7F7F'
      ]
    },
    {
      id: 1,
      name: 'Grayscale',
      colors: [
        '#FFF', '#EEE', '#DDD', '#CCC',
        '#BBB', '#AAA', '#999', '#888',
        '#777', '#666', '#555', '#444',
        '#333', '#222', '#111', '#000'
      ]
    }
  ]
};

const paletteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PALETTE':
      return { ...state, currentPalette: action.id };
    default:
      return state;
  }
};

export const setCurrentPalette = id => {
  return {
    type: 'SET_CURRENT_PALETTE',
    id
  };
};

export default paletteReducer;
