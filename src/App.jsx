import React from 'react';
import { Outlet } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    // MotionConfig reducedMotion="user" disables transform/layout animations for
    // users who prefer reduced motion — a global, non-invasive accessibility win.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Preloader />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}

export default App;
