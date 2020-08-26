import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import '../styles/Export';

const Export = () => {
  const [ factor, setFactor ] = useState(1);
  const { size, pixels } = useSelector(({ canvas }) => canvas);

  const save = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = size.width * factor;
    canvas.height = size.height * factor;

    for (const pixel of pixels) {
      if (pixel.color) {
        const idx = pixels.indexOf(pixel);
        const x = idx % size.width;
        const y = Math.floor(idx / size.width);

        context.fillStyle = pixel.color;
        context.fillRect(x * factor, y * factor, factor, factor);
      }
    }

    const anchor = document.createElement('a');
    anchor.download = 'image.png';
    anchor.href = canvas.toDataURL('image/png');
    anchor.click();
  };

  return <div id='export'>
    <div id='export-size'>
      <label>Size</label>
      <input
        type='number'
        value={factor}
        onChange={evt => setFactor(evt.target.value)}
        min={1}
      />
    </div>
    <div id='image-dimensions'>
      <div>Image dimensions:</div>
      <div>Width: {size.width * factor} px</div>
      <div>Height: {size.height * factor} px</div>
    </div>
    <button onClick={save}>Export</button>
  </div>;
};

export default Export;
