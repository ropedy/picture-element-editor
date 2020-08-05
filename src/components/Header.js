import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';

import ZoomButtons from './ZoomButtons';

import { showBox, hideBox } from '../reducers/actionBoxReducer';

import icon from '../../icon.svg';

import '../styles/Header.scss';

const Header = () => {
  const show = useSelector(({ actionBox }) => actionBox.show);
  const dispatch = useDispatch();
  const newProject = () => {
    if (show) {
      dispatch(hideBox());
    }
    else {
      dispatch(showBox('newProject'));
    }
  };

  return <header id='picture-element-editor-header'>
    <img src={icon} />
    <button className='full-button' onClick={newProject}>
      <span>New</span>
      <FontAwesomeIcon className='icon' icon={faBorderAll} />
    </button>
    <ZoomButtons />
  </header>;
};

export default Header;
