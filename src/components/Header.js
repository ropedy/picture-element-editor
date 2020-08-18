import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faClone } from '@fortawesome/free-solid-svg-icons';

import ZoomButtons from './ZoomButtons';

import { showBox, hideBox } from '../reducers/actionBoxReducer';

import icon from '../../icon.svg';

import '../styles/Header.scss';

const Header = () => {
  const { show, boxType } = useSelector(({ actionBox }) => actionBox);
  const dispatch = useDispatch();

  const newProject = () => {
    if (show && boxType === 'newProject') {
      dispatch(hideBox());
    }
    else {
      dispatch(showBox('newProject'));
    }
  };

  const colorSwap = () => {
    if (show && boxType === 'colorSwap') {
      dispatch(hideBox());
    }
    else {
      dispatch(showBox('colorSwap'));
    }
  };

  return <header id='picture-element-editor-header'>
    <img src={icon} />
    <button className='full-button action-button' onClick={newProject}>
      <span>New</span>
      <FontAwesomeIcon className='icon' icon={faBorderAll} />
    </button>
    <ZoomButtons />
    <button className='full-button action-button' onClick={colorSwap}>
      <span>Swap</span>
      <FontAwesomeIcon className='icon' icon={faClone} />
    </button>
  </header>;
};

export default Header;
