import React from 'react';
import { useSelector } from 'react-redux';

import CanvasPixel from './CanvasPixel';

import '../styles/Canvas.scss';

const Canvas = () => {
  const pixels = useSelector(({ canvas }) => canvas.pixels);

  return <div id='canvas'>
    {pixels.map(p => <CanvasPixel key={p.id} id={p.id} color={ p.color || 'transparent' } />)}
  </div>;
};

export default Canvas;
