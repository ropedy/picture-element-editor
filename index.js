import React from 'react';
import ReactDOM from 'react-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux' ;
import store from './src/store';

import App from './src/App';

import listenKeyboard from './src/utils/keyboardListener';

listenKeyboard();

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
  , document.querySelector('#app'));
