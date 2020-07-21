import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';

import { setPixel } from '../reducers/canvasReducer';

import '../styles/CanvasPixel.scss';

const CanvasPixel = ({ id, color }) => {
  const dispatch = useDispatch();
  const { width, height } = useSelector(({ canvas }) => canvas.size);

  const [{ isOver }, drop] = useDrop({
    accept: ['palette-color', 'canvas-pixel'],
    drop: item => {
      if (item.type === 'palette-color') {
        dispatch(setPixel(id, item.color));
      }

      return { id, color };
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    }),
  });

  const [, drag] = useDrag({
    item: {
      type: 'canvas-pixel',
      color, id
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

  const dndRef = element => {
    drag(element);
    drop(element);
  };

  const style = {
    backgroundColor: isOver ? 'black' : color,
    width: `calc(${100 / width}% - 1px)`,
    height: `calc(${100 / height}% - 1px)`
  };

  return <div ref={dndRef} className='canvas-pixel' style={style} />;
};

export default CanvasPixel;
