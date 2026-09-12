'use client';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export function useSocket(onDrawLine, onClearCanvas) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on('draw-line', (data) => {
      if (onDrawLine) onDrawLine(data);
    });

    socketRef.current.on('clear-canvas', () => {
      if (onClearCanvas) onClearCanvas();
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [onDrawLine, onClearCanvas]);

  const emitDraw = (data) => {
    socketRef.current?.emit('draw-line', data);
  };

  const emitClear = () => {
    socketRef.current?.emit('clear-canvas');
  };

  return { emitDraw, emitClear };
}