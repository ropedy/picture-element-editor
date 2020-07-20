import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NewProject from './NewProject';

import { hideBox } from '../reducers/actionBoxReducer';

import '../styles/ActionBox.scss';

const ActionBox = () => {
  const dispatch = useDispatch();
  const { boxType } = useSelector(({ actionBox }) => actionBox);

  const closeBox = evt => {
    const box = document.querySelector('.action-box');
    const target = evt.target;

    if (!box.contains(target)) {
      dispatch(hideBox());
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeBox);

    return () => {
      document.removeEventListener('click', closeBox);
    };
  }, []);

  const getTitle = () => {
    switch (boxType) {
      case 'newProject':
        return 'New project';
      default:
        return null;
    }
  };

  const renderBox = () => {
    switch (boxType) {
      case 'newProject':
        return <NewProject />;
      default:
        return null;
    }
  };


  return <div className='action-box'>
    <div className='action-box-header'>
      <span className='action-box-header-title'>{getTitle()}</span>
      <button onClick={() => dispatch(hideBox())}><FontAwesomeIcon  className='icon' icon={faTimes} /></button>
    </div>
    {renderBox()}
  </div>;
};

export default ActionBox;
