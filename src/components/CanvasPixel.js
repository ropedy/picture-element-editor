import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import { setPixel } from '../reducers/canvasReducer';

import '../styles/CanvasPixel.scss';

const CanvasPixel = ({ id, color }) => {
  const dispatch = useDispatch();
  const [{ isOver }, drop] = useDrop({
    accept: 'palette-color',
    drop: item => dispatch(setPixel(id, item.color)),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
  });

  const style = {
    backgroundColor: isOver ? 'black' : color
  };

  return <div ref={drop} className='canvas-pixel' style={style} />;
};

export default CanvasPixel;
