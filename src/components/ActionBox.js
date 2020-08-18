import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NewProject from './NewProject';
import ColorSwap from './ColorSwap';

import { hideBox } from '../reducers/actionBoxReducer';

import '../styles/ActionBox.scss';

const ActionBox = () => {
  const dispatch = useDispatch();
  const { boxType } = useSelector(({ actionBox }) => actionBox);

  const closeBox = evt => {
    const box = document.querySelector('.action-box');
    const target = evt.target;
    const targetRemoved = !document.contains(target);

    if (!box.contains(target) && !targetRemoved) {
      dispatch(hideBox());
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeBox);

    return () => {
      document.removeEventListener('click', closeBox);
    };
  }, []);

  const getLeft = () => {
    switch (boxType) {
      case 'newProject':
        return '5.5em';
      case 'colorSwap':
        return '15em';
      default:
        return '0';
    }
  };

  const getTitle = () => {
    switch (boxType) {
      case 'newProject':
        return 'New project';
      case 'colorSwap':
        return 'Color swap';
      default:
        return null;
    }
  };

  const renderBox = () => {
    switch (boxType) {
      case 'newProject':
        return <NewProject />;
      case 'colorSwap':
        return <ColorSwap />;
      default:
        return null;
    }
  };


  return <div className='action-box' style={{ left: getLeft() }}>
    <div className='action-box-header'>
      <span className='action-box-header-title'>{getTitle()}</span>
      <button onClick={() => dispatch(hideBox())}><FontAwesomeIcon  className='icon' icon={faTimes} /></button>
    </div>
    {renderBox()}
  </div>;
};

export default ActionBox;
