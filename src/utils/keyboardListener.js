import store from '../store';

import { setKey } from '../reducers/keyboardReducer';
import { updateZoom } from '../reducers/canvasReducer';

const keyDownTracker = evt => {
  if (evt.repeat) {
    return;
  }

  if (evt.code === 'Space') {
    store.dispatch(setKey('Space', evt.type === 'keydown'));
  }
  else if (evt.code === 'NumpadAdd' && evt.type === 'keydown') {
    store.dispatch(updateZoom(true));
  }
  else if (evt.code === 'NumpadSubtract' && evt.type === 'keydown') {
    store.dispatch(updateZoom(false));
  }
};

const listenKeyboard = () => {
  document.addEventListener('keydown', keyDownTracker);
  document.addEventListener('keyup', keyDownTracker);
};

export default listenKeyboard;
