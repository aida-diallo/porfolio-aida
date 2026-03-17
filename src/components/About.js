import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API}/profile`)
      .then(res => res.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  if (!profile) {
    return (
      <section className="section about" id="a-propos">
        <div className="container">
          <div className="loading-section"><div className="loading-spinner"></div></div>
        </div>
      </section>
    );
  }

  const statsData = [
    { number: profile.stats.years, label: "Années d'expérience" },
    { number: profile.stats.projects, label: 'Projets réalisés' },
    { number: profile.stats.technologies, label: 'Technologies maîtrisées' },
    { number: profile.stats.engagement, label: 'Passion & Engagement' },
  ];

  const details = [
    { label: 'Nom', value: profile.name },
    { label: 'Localisation', value: profile.location },
    { label: 'Spécialité', value: profile.specialty },
    { label: 'Disponibilité', value: profile.availability },
  ];

  return (
    <section className="section about" id="a-propos">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// 01 . À propos</span>
          <h2 className="section-title">Me connaître</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profile.about.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="about-stats">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-details"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {details.map((detail, index) => (
              <div key={index} className="detail-item">
                <div className="detail-label">{detail.label}</div>
                <div className="detail-value">{detail.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
