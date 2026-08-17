import React from 'react';
import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    // MotionConfig reducedMotion="user" disables transform/layout animations for
    // users who prefer reduced motion — a global, non-invasive accessibility win.
    <MotionConfig reducedMotion="user">
      <Preloader />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
