import React from 'react';
import { useSelector } from 'react-redux';

import ColorPalette from './ColorPalette';
import Canvas from './Canvas';
import ActionBox from './ActionBox';

import '../styles/Main.scss';

const Main = () => {
  const show = useSelector(({ actionBox }) => actionBox.show);

  return <main id='picture-element-editor-main'>
    {show ? <ActionBox /> : null}
    <ColorPalette />
    <Canvas />
  </main>;
};

export default Main;
