import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import canvasReducer from './reducers/canvasReducer';
import paletteReducer from './reducers/paletteReducer';
import actionBoxReducer from './reducers/actionBoxReducer';

const reducer = combineReducers({
  canvas: canvasReducer,
  palette: paletteReducer,
  actionBox: actionBoxReducer
});

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;
