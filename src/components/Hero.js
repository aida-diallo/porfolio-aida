import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API}/profile`)
      .then(res => res.json())
      .then(setProfile)
      .catch(() => setProfile({
        greeting: 'Bonjour, je suis',
        name: 'Aida Diallo',
        title: 'Développeuse Full Stack',
        description: 'Passionnée par la création d\'expériences numériques élégantes et performantes.',
      }));
  }, []);

  if (!profile) return null;

  return (
    <section className="hero" id="accueil">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="hero-greeting">{profile.greeting}</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {profile.name.split(' ')[0]} <span className="accent">{profile.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.p
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {profile.title}
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {profile.description}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="projets" smooth={true} duration={800} offset={-80}>
              <button className="btn-primary">Voir mes projets</button>
            </Link>
            <Link to="contact" smooth={true} duration={800} offset={-80}>
              <button className="btn-secondary">Me contacter</button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
