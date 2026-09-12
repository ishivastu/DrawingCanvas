# 🎨 Real-Time Collaborative Drawing Canvas

A high-performance, real-time collaborative drawing whiteboard built as a solution for the Frontend R&D Assignment[cite: 2]. This application allows multiple users to draw simultaneously on a shared canvas with instant synchronization across clients via WebSockets.


[![Live Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen?style=flat-square&logo=render)](https://drawingcanvas-w4nw.onrender.com/)
![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?style=flat-square&logo=tailwind-css)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io)
![Node.js](https://img.shields.io/badge/Node.js-Custom_Server-green?style=flat-square&logo=node.js)

### 🚀 **[Check out the Live App Here](https://drawingcanvas-w4nw.onrender.com/)**

---

## ✨ Features

* **Real-Time Multi-User Collaboration:** Instantly broadcast and render drawings across all connected clients using a custom WebSocket backend.
* **Interactive Custom Toolbar:** 
  * Live **Color Picker** for choosing custom strokes.
  * Dynamic **Brush Size Slider** (1px to 50px).
  * **Brush & Eraser** mode toggling.
  * **Clear Board** option that syncs clearing actions globally across all connected peers.
* **Responsive Canvas Surface:** Automatically scales to fit different viewports while retaining precise coordinate calculations.
* **Modular Code Architecture:** Clean separation of concerns with dedicated components, custom hooks, and a custom Node server.

---

## 📂 Project Structure

```text
flamai/
├── app/
│   ├── globals.css           # Tailwind global styles
│   ├── layout.jsx            # Root application layout
│   └── page.jsx              # Main entry point rendering the canvas
├── components/
│   ├── Canvas.jsx            # Core HTML5 canvas drawing engine & event loop
│   └── Toolbar.jsx           # Floating UI controls (colors, sizing, tools)
├── hooks/
│   └── useSocket.js          # Custom network hook wrapping Socket.io events
├── server.js                 # Custom Node.js/Express & Socket.io server
├── package.json
└── README.md
