# 🎨 Real-Time Collaborative Drawing Canvas

A high-performance, real-time collaborative drawing application built as part of the Frontend R&D Assignment. This app allows multiple users to draw simultaneously on a shared canvas with live synchronization across clients.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=flat-square&logo=tailwind-css)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io)

---

## ✨ Features

* **Real-Time Collaboration:** Instantly broadcast and render drawings across all connected clients via WebSocket architecture.
* **Interactive Toolbar:** Easily switch tools, customize brush sizes, and pick custom colors.
* **Eraser Mode:** Seamlessly switch to eraser mode to clean up mistakes.
* **Responsive Surface:** Automatically scales to fit different viewport sizes while keeping coordinate tracking precise.
* **Modular Component Architecture:** Clean separation of concerns between stateful hooks, modular UI layout, and the core canvas rendering engine.

---

## 📂 Project Structure

```text
collaborative-canvas/
├── app/
│   ├── globals.css           # Tailwind global styles
│   ├── layout.jsx            # Root layout component
│   └── page.jsx              # Main page wrapper entry
├── components/
│   ├── Canvas.jsx            # Core HTML5 canvas drawing engine & listeners
│   └── Toolbar.jsx           # Floating user controls (color, size, tools)
├── hooks/
│   └── useSocket.js          # Custom network hook for Socket.io events
├── package.json
└── README.md