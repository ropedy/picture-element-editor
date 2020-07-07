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
  pixels: createPixels(16)
};

const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CANVAS_SIZE':
      return { ...state, size: action.size };
    case 'SET_PIXEL':
      return { ...state, pixels: state.pixels.map(p => p.id !== action.id ? p : { ...p, color: action.color }) };
    default:
      return state;
  }
};

export const setCanvasSize = size => {
  return {
    type: 'SET_CANVAS_SIZE',
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
