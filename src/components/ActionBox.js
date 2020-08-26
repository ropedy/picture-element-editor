import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import NewProject from './NewProject';
import ColorSwap from './ColorSwap';
import Export from './Export';

import { hideBox } from '../reducers/actionBoxReducer';

import '../styles/ActionBox.scss';

const ActionBox = () => {
  const dispatch = useDispatch();
  const { boxType } = useSelector(({ actionBox }) => actionBox);

  const closeBox = evt => {
    const box = document.querySelector('.action-box');
    const target = evt.target;
    const targetRemoved = !document.contains(target);
    const isActionButton = !!target.closest('#picture-element-editor-header > .action-button');

    if (!box.contains(target) && !targetRemoved && !isActionButton) {
      dispatch(hideBox());
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeBox);

    return () => {
      document.removeEventListener('click', closeBox);
    };
  }, []);

  const getPosition = () => {
    switch (boxType) {
      case 'newProject':
        return { left: '5.5em' };
      case 'colorSwap':
        return { left: '15em' };
      case 'export':
        return { right: '.5em' };
      default:
        return { left: '0' };
    }
  };

  const getTitle = () => {
    switch (boxType) {
      case 'newProject':
        return 'New project';
      case 'colorSwap':
        return 'Color swap';
      case 'export':
        return 'Export';
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
      case 'export':
        return <Export />;
      default:
        return null;
    }
  };


  return <div className='action-box' style={getPosition()}>
    <div className='action-box-header'>
      <span className='action-box-header-title'>{getTitle()}</span>
      <button onClick={() => dispatch(hideBox())}><FontAwesomeIcon  className='icon' icon={faTimes} /></button>
    </div>
    {renderBox()}
  </div>;
};

export default ActionBox;
