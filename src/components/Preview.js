import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import '../styles/Preview.scss';

const Preview = () => {
  const [ showPreview, setShowPreview ] = useState(true);
  const [ zoomValue, setZoomValue ] = useState(15);
  const { size, pixels } = useSelector(({ canvas }) => canvas);
  const [ canvasSize, setCanvasSize ] = useState({
    width: size.width * zoomValue,
    height: size.height * zoomValue
  });

  useEffect(() => {
    setCanvasSize({
      width: size.width * zoomValue,
      height: size.height * zoomValue
    });
  }, [size, zoomValue]);

  useEffect(() => {
    if (!showPreview) {
      return;
    }

    const canvas = document.querySelector('#preview-canvas-div canvas');
    const context = canvas.getContext('2d');

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    for (const pixel of pixels) {
      if (pixel.color) {
        const idx = pixels.indexOf(pixel);
        const x = idx % size.width;
        const y = Math.floor(idx / size.width);

        context.fillStyle = pixel.color;
        context.fillRect(x * zoomValue, y * zoomValue, zoomValue, zoomValue);
      }
    }
  }, [pixels, canvasSize, showPreview]);

  const changeZoomValue = newValue => {
    const clampedValue = Math.max(Math.min(newValue, 15), 1);

    setZoomValue(clampedValue);
  };

  return <div id='preview'>
    <div id='preview-canvas-div' style={{ display: showPreview ? 'grid' : 'none' }}>
      <canvas />
    </div>
    <footer>
      Preview
      <button  className='preview-toggle-button'onClick={() => setShowPreview(!showPreview)}>
        <FontAwesomeIcon className='icon' icon={showPreview ? faAngleDown : faAngleUp} />
      </button>
      <button className='minus-button' onClick={() => changeZoomValue(zoomValue - 1)}>
        <FontAwesomeIcon className='icon' icon={faMinus} />
      </button>
      <span className='zoom-value-display'>{zoomValue}</span>
      <button className='plus-button' onClick={() => changeZoomValue(zoomValue + 1)}>
        <FontAwesomeIcon className='icon' icon={faPlus} />
      </button>
    </footer>
  </div>;
};

export default Preview;
