import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import PaletteDropdown from './PaletteDropdown';

import { setVisibility } from '../reducers/colorEditorReducer';
import { setCurrentPalette } from '../reducers/paletteReducer';

import '../styles/ColorEditor';

const ColorEditor = () => {
  const dispatch = useDispatch();
  const [ selectedPalette, setSelectedPalette ] = useState(0);

  const activatePalette = () => {
    dispatch(setCurrentPalette(selectedPalette));
  };

  return <div id='color-editor-background'>
    <div id='color-editor'>
      <div id='color-editor-header'>
        <span id='color-editor-header-title'>Color editor</span>
        <button onClick={() => dispatch(setVisibility(false))}><FontAwesomeIcon  className='icon' icon={faTimes} /></button>
      </div>
      <PaletteDropdown
        selected={selectedPalette}
        onChange={id => setSelectedPalette(id)}
      />
      <button className='activate-button' onClick={activatePalette}>Activate</button>
    </div>
  </div>;
};

export default ColorEditor;
