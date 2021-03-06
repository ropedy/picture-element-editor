import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import canvasReducer from './reducers/canvasReducer';
import paletteReducer from './reducers/paletteReducer';
import actionBoxReducer from './reducers/actionBoxReducer';
import keyboardReducer from './reducers/keyboardReducer';
import colorEditorReducer from './reducers/colorEditorReducer';

const reducer = combineReducers({
  canvas: canvasReducer,
  palette: paletteReducer,
  actionBox: actionBoxReducer,
  keyboard: keyboardReducer,
  colorEditor: colorEditorReducer
});

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;
