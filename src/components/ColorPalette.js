import React from 'react';
import { useSelector } from 'react-redux';

import PaletteColor from './PaletteColor';

import '../styles/ColorPalette.scss';

const ColorPalette = () => {
  const colors = useSelector(({ palette }) => palette.palettes.find(p => p.id === palette.currentPalette).colors);

  return <div id='color-palette'>
    {colors.map(c => <PaletteColor key={c} color={c} />)}
  </div>;
};

export default ColorPalette;
