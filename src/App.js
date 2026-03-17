import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import { FiSettings } from 'react-icons/fi';
import './App.css';
import './components/Admin.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return <Admin onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <button
        className="admin-toggle"
        onClick={() => setShowAdmin(true)}
        title="Administration"
      >
        <FiSettings />
      </button>
    </div>
  );
}

export default App;
