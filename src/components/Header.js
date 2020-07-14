import React from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';

import { showBox } from '../reducers/actionBoxReducer';

import icon from '../../icon.svg';

import '../styles/Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const newProject = () => {
    dispatch(showBox('newProject'));
  };

  return <header id='picture-element-editor-header'>
    <img src={icon} />
    <button onClick={newProject}>
      <span>New</span>
      <FontAwesomeIcon className='icon' icon={faBorderAll} />
    </button>
  </header>;
};

export default Header;
