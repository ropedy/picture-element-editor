import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import '../styles/PaletteDropdown.scss';

const PaletteDropdown = ({ selected, onChange }) => {
  const [ expanded, setExpanded ] = useState(false);
  const elementRef = useRef();
  const { palettes } = useSelector(({ palette }) => palette);

  useEffect(() => {
    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  const closeMenu = evt => {
    if (!elementRef.current.contains(evt.target)) {
      setExpanded(false);
    }
  };

  const valueChange = id => {
    onChange(id);
    setExpanded(false);
  };

  const getPaletteGradient = colors => {
    const multiplier = 100 / (colors.length - 1);
    let gradient = '';

    for (const color of colors) {
      const index = colors.indexOf(color);
      const percent = Math.floor(index * multiplier);

      gradient += `${color} ${percent}%,`;
    }

    gradient = gradient.replace(/,$/, '');

    return {
      background: `linear-gradient(135deg, ${gradient})`
    };
  };


  return <div className='dropdown' ref={elementRef}>
    <div className='dropdown-main' onClick={() => setExpanded(!expanded)}>
      <span className='selected-text'>{palettes.find(p => p.id === selected).name}</span>
      <span className='selected-icon'>
        <FontAwesomeIcon className='icon' icon={expanded ? faAngleUp : faAngleDown} />
      </span>
    </div>
    {expanded ? <div className='dropdown-list'>
      {palettes.map(p => {
        return <div key={p.id} className='dropdown-list-row-wrapper' onClick={() => valueChange(p.id)}>
          <div className='dropdown-list-row'>
            <div className='row-colors-indicator' style={getPaletteGradient(p.colors)} />
            <span className='row-text'>{p.name}</span>
          </div>
        </div>;
      })}
    </div> : null}
  </div>;
};

export default PaletteDropdown;
