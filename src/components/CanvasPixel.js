import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { setPixel } from '../reducers/canvasReducer';

import { isLight } from '../utils/colorUtils';

import '../styles/CanvasPixel.scss';

const CanvasPixel = ({ id, color, x, y, pixelSize, hidePixel, setCanvasPixel }) => {
  const dispatch = useDispatch();
  const [ mouseDown, setMouseDown ] = useState(false);
  const { width, height } = useSelector(({ canvas }) => canvas.size);
  const { Space: spaceDown } = useSelector(({ keyboard }) => keyboard);

  const [, drop] = useDrop({
    accept: ['palette-color', 'canvas-pixel'],
    drop: item => {
      if (item.type === 'palette-color') {
        dispatch(setPixel(id, item.color));
      }

      setCanvasPixel({ id, color: item.color, x, y });

      return { id, color };
    }
  });

  const [, drag] = useDrag({
    item: {
      type: 'canvas-pixel',
      color, id
    },
    canDrag: () => {
      return !spaceDown;
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (!dropResult) {
        return;
      }

      const alt = dropResult.dropEffect === 'copy';
      const { id, color } = dropResult;

      if (alt) {
        dispatch(setPixel(item.id, color));
      }

      dispatch(setPixel(id, item.color));
    }
  });

  let hlColor = isLight(color) ? 'white' : 'black';

  const lastCol = x === (width - 1);
  const lastRow = y === (height - 1);
  const borderSizeFix = mouseDown ? 2 : 0;
  const style = {
    left: `${x * pixelSize + 1}px`,
    top: `${y * pixelSize + 1}px`,
    width: `calc(${100 / width}% - ${(lastCol ? 2 : 1) + borderSizeFix}px)`,
    height: `calc(${100 / height}% - ${(lastRow ? 2 : 1) + borderSizeFix}px)`,
    backgroundColor: mouseDown ? color : hlColor,
    opacity: mouseDown ? '1' : '.5',
    border: mouseDown ? '1px solid #B6B4CE' : 'none'
  };

  const onMouseDown = evt => {
    setMouseDown(true);

    if (evt.shiftKey) {
      dispatch(setPixel(id, null));
    }
  };

  const dndRef = element => {
    drag(element);
    drop(element);
  };

  return <div
    ref={dndRef}
    id='canvas-pixel'
    style={style}
    onMouseDown={onMouseDown}
    onMouseUp={() => setMouseDown(false)}
    onMouseOut={hidePixel}
  />;
};

export default CanvasPixel;
