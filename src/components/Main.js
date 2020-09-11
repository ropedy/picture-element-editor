import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import ColorPalette from './ColorPalette';
import Canvas from './Canvas';
import ActionBox from './ActionBox';
import Preview from './Preview';
import ColorEditor from './ColorEditor';

import { setPixel, updateOffset } from '../reducers/canvasReducer';

import '../styles/Main.scss';

const Main = () => {
  const [ mouseDown, setMouseDown ] = useState(false);
  const dispatch = useDispatch();
  const { show } = useSelector(({ actionBox }) => actionBox);
  const { show: showColorEditor } = useSelector(({ colorEditor }) => colorEditor);
  const { Space: spaceDown } = useSelector(({ keyboard }) => keyboard);
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

  useEffect(() => {
    const main = document.querySelector('#picture-element-editor-main');

    main.addEventListener('mousedown', () => setMouseDown(true));
    main.addEventListener('mouseup', () => setMouseDown(false));
  }, []);

  useEffect(() => {
    const main = document.querySelector('#picture-element-editor-main');

    if (spaceDown && mouseDown) {
      main.addEventListener('mousemove', changeOffset);
    }

    return () => {
      main.removeEventListener('mousemove', changeOffset);
    };
  }, [spaceDown, mouseDown]);

  const changeOffset = evt => {
    dispatch(updateOffset({ x: -evt.movementX, y: -evt.movementY }));
  };

  return <main ref={drop} id='picture-element-editor-main'>
    {show ? <ActionBox /> : null}
    {showColorEditor ? <ColorEditor /> : null}
    <ColorPalette />
    <Canvas />
    <Preview />
  </main>;
};

export default Main;
