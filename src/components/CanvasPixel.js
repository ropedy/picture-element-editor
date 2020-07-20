import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { setPixel } from '../reducers/canvasReducer';

import '../styles/CanvasPixel.scss';

const CanvasPixel = ({ id, color }) => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(({ canvas }) => canvas.size);

  const [{ isOver }, drop] = useDrop({
    accept: 'palette-color',
    drop: item => dispatch(setPixel(id, item.color)),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
  });

  const style = {
    backgroundColor: isOver ? 'black' : color,
    width: `calc(${100 / width}% - 1px)`,
    height: `calc(${100 / height}% - 1px)`
  };

  return <div ref={drop} className='canvas-pixel' style={style} />;
};

export default CanvasPixel;
