import React from 'react';
import { useSelector } from 'react-redux';

import CanvasPixel from './CanvasPixel';

import '../styles/Canvas.scss';

const Canvas = () => {
  const { size, zoom, pixels } = useSelector(({ canvas }) => canvas);

  const width = size.width * 100 * zoom;
  const height = size.height * 100 * zoom;

  const style = {
    width: width + 'px',
    height: height + 'px',
    transform: `translate(-${width / 2}px, -${height / 2}px)`
  };

  return <div id='canvas' style={style}>
    {pixels.map(p => <CanvasPixel key={p.id} id={p.id} color={ p.color || 'transparent' } />)}
  </div>;
};

export default Canvas;
