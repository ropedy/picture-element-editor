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
  offset: { x: 0, y: 0 },
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
    case 'UPDATE_OFFSET':
      return { ...state,
        offset: {
          x: state.offset.x + action.vector.x,
          y: state.offset.y + action.vector.y
        }
      };
    case 'UPDATE_ZOOM':
      return { ...state,
        zoom: Math.max(state.zoom * (action.up ? 2 : .5), 0.0625)
      };
    case 'NEW_PROJECT':
      return { ...state,
        pixels: createPixels(action.size.width * action.size.height),
        zoom: getInitialZoom(action.size),
        size: action.size,
        offset: { x: 0, y: 0 }
      };
    case 'SET_PIXEL':
      return { ...state, pixels: state.pixels.map(p => p.id !== action.id ? p : { ...p, color: action.color }) };
    case 'SWAP_COLORS': {
      const pixels = state.pixels.map(p => {
        const swapColors = Object.keys(action.colorSwapData).map(c => c === 'null' ? null : c);
        const colorShouldSwap = swapColors.includes(p.color);
        const color = colorShouldSwap ? action.colorSwapData[p.color] : p.color;

        return { ...p, color };
      });

      return { ...state, pixels };
    }
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

export const updateOffset = vector => {
  return {
    type: 'UPDATE_OFFSET',
    vector
  };
};

export const updateZoom = up => {
  return {
    type: 'UPDATE_ZOOM',
    up
  };
};

export const swapColors = colorSwapData => {
  return {
    type: 'SWAP_COLORS',
    colorSwapData
  };
};

export default canvasReducer;
