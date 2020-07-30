import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CanvasPixel from './CanvasPixel';

import '../styles/Canvas.scss';

const Canvas = () => {
  const [ canvasPixel, setCanvasPixel ] = useState(null);
  const { size, zoom, offset, pixels } = useSelector(({ canvas }) => canvas);

  const pixelSize = 100 * zoom;
  const width = size.width * pixelSize;
  const height = size.height * pixelSize;

  useEffect(() => {
    const canvas = document.querySelector('#main-canvas');
    const context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    for (const pixel of pixels) {
      if (pixel.color) {
        const idx = pixels.indexOf(pixel);
        const x = idx % size.width;
        const y = Math.floor(idx / size.width);

        context.fillStyle = pixel.color;
        context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }

    context.fillStyle = '#B6B4CE';

    for (let x = 0; x <= size.width; x++) {
      const lastLineFix = x === size.width ? 1 : 0;
      const linePos = x * pixelSize - lastLineFix;

      context.fillRect(linePos, 0, 1, height);
    }

    for (let y = 0; y <= size.height; y++) {
      const lastLineFix = y === size.height ? 1 : 0;
      const linePos = y * pixelSize - lastLineFix;

      context.fillRect(0, linePos, width, 1);
    }
  }, [pixels, size, zoom, canvasPixel]);

  const mouseMove = evt => {
    const { top, left } = evt.target.getBoundingClientRect();
    const x = Math.ceil(evt.clientX - left);
    const y = Math.ceil(evt.clientY - top);

    const canvasX = Math.max(Math.min(Math.floor(x / width * size.width), size.width - 1), 0);
    const canvasY = Math.max(Math.min(Math.floor(y / height * size.height), size.height - 1));
    const id = canvasX + canvasY * size.width;
    const color = pixels.find(p => p.id === id).color;

    const cPixel = { x: canvasX, y: canvasY, id, color };

    if (!canvasPixel || canvasPixel.x !== canvasX || canvasPixel.y !== canvasY) {
      setCanvasPixel(cPixel);
    }
  };

  const style = {
    width: width + 'px',
    height: height + 'px',
    transform: `translate(-${width / 2 - offset.x}px, -${height / 2 - offset.y}px)`
  };

  const hidePixel = evt => {
    if (document.querySelector('#canvas-pixel') !== evt.relatedTarget) {
      setCanvasPixel(null);
    }
  };

  return <div id='main-canvas-div' style={style}>
    <canvas id='main-canvas' onMouseMove={mouseMove} onDragOver={mouseMove} onMouseOut={hidePixel} />
    {canvasPixel ? <CanvasPixel
      color={canvasPixel.color}
      id={canvasPixel.id}
      x={canvasPixel.x}
      y={canvasPixel.y}
      pixelSize={pixelSize}
      hidePixel={hidePixel}
      setCanvasPixel={setCanvasPixel}
    /> : null}
  </div>;
};

export default Canvas;
