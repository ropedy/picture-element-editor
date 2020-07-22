import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import ColorPalette from './ColorPalette';
import Canvas from './Canvas';
import ActionBox from './ActionBox';
import Preview from './Preview';

import { setPixel } from '../reducers/canvasReducer';

import '../styles/Main.scss';

const Main = () => {
  const dispatch = useDispatch();
  const show = useSelector(({ actionBox }) => actionBox.show);
  const [{ isOverCurrent }, drop] = useDrop({
    accept: 'canvas-pixel',
    drop: item => {
      if (isOverCurrent) {
        dispatch(setPixel(item.id, null));
      }
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    })
  });

  return <main ref={drop} id='picture-element-editor-main'>
    {show ? <ActionBox /> : null}
    <ColorPalette />
    <Canvas />
    <Preview />
  </main>;
};

export default Main;
