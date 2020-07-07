import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import canvasReducer from './reducers/canvasReducer';
import paletteReducer from './reducers/paletteReducer';

const reducer = combineReducers({
  canvas: canvasReducer,
  palette: paletteReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;
