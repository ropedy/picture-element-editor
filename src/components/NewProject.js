import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { newProject } from '../reducers/canvasReducer';
import { hideBox, setProjectWidth, setProjectHeight } from '../reducers/actionBoxReducer';

import '../styles/NewProject.scss';

const NewProject = () => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(({ actionBox }) => actionBox.newProject);

  const createNew = () => {
    dispatch(newProject({ width, height }));
    dispatch(hideBox());
  };

  const sizeIsValid = () => {
    return 0 < width && width < 33 && 0 < height && height < 33;
  };

  const clampWidth = evt => {
    const clampedWidth = Math.max(Math.min(+evt.target.value, 32), 1);

    dispatch(setProjectWidth(clampedWidth));
  };

  const clampHeight = evt => {
    const clampedHeight = Math.max(Math.min(+evt.target.value, 32), 1);

    dispatch(setProjectHeight(clampedHeight));
  };

  return <div id='new-project'>
    <div>
      <label>Width</label>
      <input
        type='number'
        value={width}
        onBlur={clampWidth}
        onChange={evt => dispatch(setProjectWidth(evt.target.value))}
        min='1'
        max='32'
      />
    </div>
    <div>
      <label>Height</label>
      <input
        type='number'
        value={height}
        onBlur={clampHeight}
        onChange={evt => dispatch(setProjectHeight(evt.target.value))}
        min='1'
        max='32'
      />
    </div>
    <button disabled={!sizeIsValid()} onClick={createNew}>Create new</button>
  </div>;
};

export default NewProject;
