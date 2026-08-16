import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import FocusAreas from './components/FocusAreas';
import Experience from './components/Experience';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Cta from './components/Cta';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [preloaderActive, setPreloaderActive] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setPreloaderActive(false)} />
      
      {/* Scrollable homepage content starts here */}
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <FeaturedWork />
        <About />
        <FocusAreas />
        <Experience />
        <Stats />
        <Skills />
        <Cta />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
