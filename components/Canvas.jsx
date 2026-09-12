'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from '@/hooks/useSocket';
import Toolbar from './Toolbar';

export default function Canvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ec4899'); // Pink default
  const [brushSize, setBrushSize] = useState(10); // 10px default
  const [activeTool, setActiveTool] = useState('brush');
  
  const lastPosition = useRef({ x: 0, y: 0 });

  const drawLine = useCallback((ctx, x0, y0, x1, y1, strokeColor, size, tool) => {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = tool === 'eraser' ? '#090d16' : strokeColor;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.closePath();
  }, []);

  const handleRemoteDraw = useCallback((data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawLine(ctx, data.x0, data.y0, data.x1, data.y1, data.color, data.size, data.tool);
  }, [drawLine]);

  const handleRemoteClear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const { emitDraw, emitClear } = useSocket(handleRemoteDraw, handleRemoteClear);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Standard drag-to-draw start
  const startDrawing = (e) => {
    if (e.target.closest('.toolbar-container')) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    lastPosition.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Standard drag movement
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvasRef.current.getBoundingClientRect();

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    drawLine(
      ctx,
      lastPosition.current.x,
      lastPosition.current.y,
      currentX,
      currentY,
      color,
      brushSize,
      activeTool
    );

    emitDraw({
      x0: lastPosition.current.x,
      y0: lastPosition.current.y,
      x1: currentX,
      y1: currentY,
      color,
      size: brushSize,
      tool: activeTool,
    });

    lastPosition.current = { x: currentX, y: currentY };
  };

  // Stop drawing when mouse button or finger is released
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emitClear();
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#090d16] select-none touch-none">
      <div className="toolbar-container">
        <Toolbar
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          clearCanvas={clearCanvas}
        />
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        className="absolute inset-0 cursor-crosshair block"
      />
    </main>
  );
}