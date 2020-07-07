import React from 'react';

import ColorPalette from './ColorPalette';
import Canvas from './Canvas';

import '../styles/Main.scss';

const Main = () => {
  return <main id='picture-element-editor-main'>
    <ColorPalette />
    <Canvas />
  </main>;
};

export default Main;
