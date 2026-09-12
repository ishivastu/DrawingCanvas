'use client';
import React from 'react';

export default function Toolbar({
  color,
  setColor,
  brushSize,
  setBrushSize,
  activeTool,
  setActiveTool,
  clearCanvas,
}) {
  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-3 rounded-2xl shadow-2xl text-white select-none">
      <div className="flex items-center gap-2 px-2 border-r border-slate-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Color</span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
        />
      </div>

      <div className="flex items-center gap-2 px-2 border-r border-slate-700">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Size: {brushSize}px</span>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-24 accent-indigo-500 cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-2 px-2">
        <button
          onClick={() => setActiveTool('brush')}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            activeTool === 'brush' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Brush
        </button>
        <button
          onClick={() => setActiveTool('eraser')}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            activeTool === 'eraser' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Eraser
        </button>
      </div>

      <button
        onClick={clearCanvas}
        className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-xl text-sm font-medium transition-all"
      >
        Clear Board
      </button>
    </div>
  );
}