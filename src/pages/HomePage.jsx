import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Hero from '../components/Hero.jsx';
import Intro from '../components/Intro.jsx';
import FeaturedWork from '../components/FeaturedWork.jsx';
import About from '../components/About.jsx';
import FocusAreas from '../components/FocusAreas.jsx';
import Experience from '../components/Experience.jsx';
import Stats from '../components/Stats.jsx';
import Skills from '../components/Skills.jsx';
import Cta from '../components/Cta.jsx';
import Education from '../components/Education.jsx';
import Achievements from '../components/Achievements.jsx';
import Contact from '../components/Contact.jsx';
import { buildPersonSchema, buildProfilePageSchema, buildWebsiteSchema } from '../data/schema.js';

function HomePage() {
  // Support deep links like /#skills coming from the navbar on other pages.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView();
    }
  }, [hash]);

  return (
    <>
      <Seo
        title="Dhairya Shah | Full-Stack Developer & DevOps Engineer"
        description="Dhairya Shah is a full-stack developer and DevOps engineer based in Ahmedabad, Gujarat. Six live products shipped end-to-end — MERN, Django/Flask, Docker, CI/CD and cloud deployment."
        path="/"
      />
      <JsonLd data={buildPersonSchema()} />
      <JsonLd data={buildWebsiteSchema()} />
      <JsonLd data={buildProfilePageSchema('/')} />

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
    </>
  );
}

export default HomePage;
