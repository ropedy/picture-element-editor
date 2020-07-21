import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { newProject } from '../reducers/canvasReducer';
import { hideBox, setProjectWidth, setProjectHeight } from '../reducers/actionBoxReducer';

import '../styles/NewProject.scss';

const NewProject = () => {
  const dispatch = useDispatch();
  const [ showQuickSizing, setShowQuickSizing ] = useState(false);
  const [ sizeIndicator, setSizeIndicator ] = useState({ width: 'Width', height: 'Height' });
  const [ quickSizeCoords, setQuickSizeCoords ] = useState(null);
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

  const hideQuickSizing = evt => {
    const mouseAreas = document.querySelectorAll('.expand-indicator, .quick-sizing-div');
    const mouseAreasArray = [ ...mouseAreas ];

    if (!mouseAreasArray.some(el => el.contains(evt.relatedTarget))) {
      setShowQuickSizing(false);
      setQuickSizeCoords(null);
      setSizeIndicator({ width: 'Width', height: 'Height' });
    }
  };

  const setSizeCoordinates = coords => {
    setQuickSizeCoords(coords);
    setSizeIndicator({
      width: `W(${2 ** (coords.x + 2)})`,
      height: `H(${2 ** (coords.y + 2)})`
    });
  };

  const quickSizingClicked = coords => {
    dispatch(setProjectWidth(2 ** (coords.x + 2)));
    dispatch(setProjectHeight(2 ** (coords.y + 2)));
  };

  return <div id='new-project'>
    <div>
      <label>{sizeIndicator.width}</label>
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
      <label>{sizeIndicator.height}</label>
      <input
        type='number'
        value={height}
        onBlur={clampHeight}
        onChange={evt => dispatch(setProjectHeight(evt.target.value))}
        min='1'
        max='32'
      />
    </div>
    <div className='new-button-wrapper'>
      <button disabled={!sizeIsValid()} onClick={createNew}>Create new</button>
    </div>
    <div onMouseEnter={() => setShowQuickSizing(true)} onMouseLeave={hideQuickSizing} className='expand-indicator'>
      <FontAwesomeIcon className='icon' icon={faAngleDown} />
    </div>
    { showQuickSizing ? <div onMouseLeave={hideQuickSizing} className='quick-sizing-div'>
      <table>
        <tbody>
          {[0,1,2,3].map((y, i) => {
            return <tr key={i}>
              {[0,1,2,3].map((x, j) => {
                let highlight = false;

                if (quickSizeCoords) {
                  highlight = quickSizeCoords.x >= x && quickSizeCoords.y >= y;
                }

                return <td
                  key={j}
                  className={highlight ? 'highlight' : ''}
                  onMouseEnter={() => setSizeCoordinates({ x, y })}
                  onClick={() => quickSizingClicked({ x, y })}
                />;
              })}
            </tr>;
          })}
        </tbody>
      </table>
    </div> : null}
  </div>;
};

export default NewProject;
