import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { swapColors } from '../reducers/canvasReducer';
import { setColorSwapRows, hideBox } from '../reducers/actionBoxReducer';

import { getId } from '../utils/utils';

import '../styles/ColorSwap';

const ColorSwapRow = ({ row, colors, rowChanged, deleteRow }) => {
  const onRowChange = (evt, key) => {
    const value = evt.target.value === 'transparent' ? null : evt.target.value;

    rowChanged(row.id, key, value);
  };

  return <div className='color-swap-row'>
    <select value={row.from || 'transparent'} onChange={evt => onRowChange(evt, 'from')}>
      {colors.map(c => {
        return <option key={c} value={c}>{c || 'transparent'}</option>;
      })}
    </select>
    <span><FontAwesomeIcon className='icon' icon={faLongArrowAltRight} /></span>
    <select value={row.to || 'transparent'} onChange={evt => onRowChange(evt, 'to')}>
      {colors.map(c => {
        return <option key={c} value={c}>{c || 'transparent'}</option>;
      })}
    </select>
    <button className='row-count-button' onClick={() => deleteRow(row.id)}>
      <FontAwesomeIcon className='icon' icon={faMinus} />
    </button>
  </div>;
};

const ColorSwap = () => {
  const dispatch = useDispatch();
  const colors = useSelector(({ palette }) => palette.palettes.find(p => p.id === palette.currentPalette).colors);
  const { colorSwapRows } = useSelector(({ actionBox }) => actionBox);
  const allColors = [ null , ...colors ];

  const addRow = () => {
    dispatch(setColorSwapRows(colorSwapRows.concat({
      id: getId(),
      from: null,
      to: null
    })));
  };

  const rowChanged = (id, key, color) => {
    dispatch(setColorSwapRows(colorSwapRows.map(c => {
      return c.id !== id ? c : { ...c, [key]: color };
    })));
  };

  const deleteRow = id => {
    dispatch(setColorSwapRows(colorSwapRows.filter(c => c.id !== id)));
  };

  const reset = () => {
    dispatch(setColorSwapRows([{ id: getId(), from: null, to: null }]));
  };

  const changeColors = () => {
    const colorSwapData = Object.fromEntries(colorSwapRows.map(row => [ row.from, row.to ]));

    dispatch(swapColors(colorSwapData));
    dispatch(hideBox());
    reset();
  };

  return <div id='color-swap'>
    {colorSwapRows.map(row => <ColorSwapRow
      key={row.id}
      row={row}
      colors={allColors}
      rowChanged={rowChanged}
      deleteRow={deleteRow}
    />)}
    <div className='empty-row'>
      <button className='row-count-button' onClick={addRow}>
        <FontAwesomeIcon className='icon' icon={faPlus} />
      </button>
    </div>
    <div className='swap-buttons-wrapper'>
      <button id='color-swap-reset' onClick={reset}>Reset</button>
      <button id='color-swap-exec' className='' onClick={changeColors}>Swap colors</button>
    </div>
  </div>;
};

export default ColorSwap;
