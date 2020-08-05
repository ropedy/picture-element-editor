import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';

import { updateZoom } from '../reducers/canvasReducer';

import '../styles/ZoomButtons.scss';

const ZoomButtons = () => {
  const dispatch = useDispatch();

  return <div id='zoom-buttons'>
    <span>Zoom</span>
    <button onClick={() => dispatch(updateZoom(true))}>
      <FontAwesomeIcon className='icon' icon={faSearchPlus} />
    </button>
    <button onClick={() => dispatch(updateZoom(false))}>
      <FontAwesomeIcon className='icon' icon={faSearchMinus} />
    </button>
  </div>;
};

export default ZoomButtons;
