import React from 'react';
import { useDrag } from 'react-dnd';

import '../styles/PaletteColor.scss';

const PaletteColor = ({ color }) => {
  const [, drag] = useDrag({
    item: {
      type: 'palette-color',
      color
    }
  });

  const style = {
    backgroundColor: color
  };

  return <div ref={drag} className='palette-color' style={style} />;
};

export default PaletteColor;
