import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { hideBox } from '../reducers/actionBoxReducer';

import '../styles/ActionBox.scss';

const ActionBox = () => {
  const dispatch = useDispatch();
  const { show, boxType } = useSelector(({ actionBox }) => actionBox);

  if (!show) {
    return null;
  }

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
        return 'New project';
      default:
        return null;
    }
  };


  return <div className='action-box'>
    <div>{getTitle()}<button onClick={() => dispatch(hideBox())}>CLOSE</button></div>
  </div>;
};

export default ActionBox;
