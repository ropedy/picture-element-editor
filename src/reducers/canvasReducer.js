const createPixels = size => {
  const pixels = [];

  for (let i = 0; i < size; i++) {
    pixels.push({
      id: i,
      color: null
    });
  }

  return pixels;
};

const initialState = {
  size: { width: 4, height: 4 },
  zoom: 1,
  pixels: createPixels(16)
};

const getInitialZoom = size => {
  const longerSide = Math.max(size.width, size.height);
  const zoom = 2 ** (Math.ceil(Math.log2(longerSide)) - 2);
  const inverse = 1 / zoom;

  return inverse;
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_PROJECT':
      return { pixels: createPixels(action.size.width * action.size.height), zoom: getInitialZoom(action.size), size: action.size };
    case 'SET_PIXEL':
      return { ...state, pixels: state.pixels.map(p => p.id !== action.id ? p : { ...p, color: action.color }) };
    default:
      return state;
  }
};

export const newProject = size => {
  return {
    type: 'NEW_PROJECT',
    size
  };
};

export const setPixel = (id, color) => {
  return {
    type: 'SET_PIXEL',
    id, color
  };
};

export default canvasReducer;
