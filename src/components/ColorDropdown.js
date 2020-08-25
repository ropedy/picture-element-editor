import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import '../styles/ColorDropdown.scss';

const ColorDropdown = ({ colors, selected, onChange }) => {
  const [ expanded, setExpanded ] = useState(false);
  const elementRef = useRef();

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

  const valueChange = color => {
    onChange(color);
    setExpanded(false);
  };

  return <div className='color-dropdown' ref={elementRef}>
    <div className='color-dropdown-main' onClick={() => setExpanded(!expanded)}>
      <div className={`selected-color-indicator${!selected ? ' hidden' : ''}`} style={{ backgroundColor: selected }} />
      <span className='selected-color-text'>{selected || 'None'}</span>
      <span className='selected-color-icon'>
        <FontAwesomeIcon className='icon' icon={expanded ? faAngleUp : faAngleDown} />
      </span>
    </div>
    {expanded ? <div className='color-dropdown-list'>
      {colors.map(c => {
        return <div key={c} className='color-dropdown-list-row-wrapper' onClick={() => valueChange(c)}>
          <div className='color-dropdown-list-row'>
            <div className={`row-color-indicator${!c ? ' hidden' : ''}`} style={{ backgroundColor: c }} />
            <span className='row-color-text'>{c || 'None'}</span>
          </div>
        </div>;
      })}
    </div> : null}
  </div>;
};

export default ColorDropdown;
