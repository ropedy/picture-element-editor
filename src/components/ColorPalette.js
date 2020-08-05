import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PaletteColor from './PaletteColor';

import { useRefState } from '../utils/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

import '../styles/ColorPalette.scss';

const ColorPalette = () => {
  const [ grabActive, grabActiveRef, setGrabActive ] = useRefState(false);
  const [ offset, offsetRef, setOffset ] = useRefState({ x: 0, y: 0 });

  const colors = useSelector(({ palette }) => palette.palettes.find(p => p.id === palette.currentPalette).colors);

  useEffect(() => {
    document.addEventListener('mousemove', movePalette);
    document.addEventListener('mouseup', grabEnd);

    return () => {
      document.removeEventListener('mousemove', movePalette);
      document.removeEventListener('mouseup', grabEnd);
    };
  }, []);

  const movePalette = evt => {
    if (grabActiveRef.current) {
      const { x, y } = offsetRef.current;

      const main = document.querySelector('#picture-element-editor-main');
      const palette = document.querySelector('#color-palette');
      const mainRect = main.getBoundingClientRect();
      const paletteRect = palette.getBoundingClientRect();

      const topOOB = mainRect.y > (paletteRect.y + evt.movementY);
      const bottomOOB = mainRect.y + mainRect.height < (paletteRect.y + paletteRect.height + evt.movementY);
      const leftOOB = mainRect.x > (paletteRect.x + evt.movementX);
      const rightOOB = mainRect.x + mainRect.width < (paletteRect.x + paletteRect.width + evt.movementX);
      const OOB = topOOB || bottomOOB || leftOOB || rightOOB;

      if (!OOB) {
        setOffset({ x: x + evt.movementX, y: y + evt.movementY });
      }
    }
  };

  const grabStart = () => {
    setGrabActive(true);
  };

  const grabEnd = () => {
    setGrabActive(false);
  };

  const style = {
    transform: `translate(${offset.x}px, calc(-50% + ${offset.y}px))`,
    cursor: grabActive ?  'grabbing' : 'grab'
  };

  return <div id='color-palette' style={style}>
    <div id='color-palette-handle' onMouseDown={grabStart} onDoubleClick={() => setOffset({ x: 0, y: 0 })}>
      <FontAwesomeIcon className='icon' icon={faGripLines} />
    </div>
    {colors.map(c => <PaletteColor key={c} color={c} />)}
  </div>;
};

export default ColorPalette;
