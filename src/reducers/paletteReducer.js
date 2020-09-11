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
        '#FFFFFF', '#EEEEEE', '#DDDDDD', '#CCCCCC',
        '#BBBBBB', '#AAAAAA', '#999999', '#888888',
        '#777777', '#666666', '#555555', '#444444',
        '#333333', '#222222', '#111111', '#000000'
      ]
    },
    {
      id: 2,
      name: 'NES',
      colors: [
        '#000000', '#FCFCFC', '#F8F8F8', '#BCBCBC',
        '#7C7C7C', '#A4E4FC', '#3CBCFC', '#0078F8',
        '#0000FC', '#B8B8F8', '#6888FC', '#0058F8',
        '#0000BC', '#D8B8F8', '#9878F8', '#6844FC',
        '#4428BC', '#F8B8F8', '#F878F8', '#D800CC',
        '#940084', '#F8A4C0', '#F85898', '#E40058',
        '#A80020', '#F0D0B0', '#F87858', '#F83800',
        '#A81000', '#FCE0A8', '#FCA044', '#E45C10',
        '#881400', '#F8D878', '#F8B800', '#AC7C00',
        '#503000', '#D8F878', '#B8F818', '#00B800',
        '#007800', '#B8F8B8', '#58D854', '#00A800',
        '#006800', '#B8F8D8', '#58F898', '#00A844',
        '#005800', '#00FCFC', '#00E8D8', '#008888',
        '#004058', '#F8D8F8', '#787878'
      ]
    },
    {
      id: 3,
      name: 'Piet',
      colors: [
        '#FFFFFF', '#000000', '#FFC0C0', '#FFFFC0',
        '#C0FFC0', '#C0FFFF', '#C0C0FF', '#FFC0FF',
        '#FF0000', '#FFFF00', '#00FF00', '#00FFFF',
        '#0000FF', '#FF00FF', '#C00000', '#C0C000',
        '#00C000', '#00C0C0', '#0000C0', '#C000C0'
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
