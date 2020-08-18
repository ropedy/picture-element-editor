import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import { swapColors } from '../reducers/canvasReducer';
import { setColorSwapRows, hideBox } from '../reducers/actionBoxReducer';

import { getId } from '../utils/utils';

import '../styles/ColorSwap';

const ColorSwapRow = ({ row, colors, rowChanged, deleteRow }) => {
  const onRowChange = (evt, key) => {
    const value = evt.target.value === 'transparent' ? null : evt.target.value;

    rowChanged(row.id, key, value);
  };

  return <div>
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
    <button className='delete-button' onClick={() => deleteRow(row.id)}>del</button>
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

  const changeColors = () => {
    const colorSwapData = Object.fromEntries(colorSwapRows.map(row => [ row.from, row.to ]));

    dispatch(swapColors(colorSwapData));
    dispatch(hideBox());
    dispatch(setColorSwapRows([{ id: getId(), from: null, to: null }]));
  };

  return <div id='color-swap'>
    {colorSwapRows.map(row => <ColorSwapRow
      key={row.id}
      row={row}
      colors={allColors}
      rowChanged={rowChanged}
      deleteRow={deleteRow}
    />)}
    <button onClick={addRow}>new</button>
    <button onClick={changeColors}>change colors</button>
  </div>;
};

export default ColorSwap;
