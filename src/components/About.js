import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { number: '2+', label: 'Années d\'expérience' },
    { number: '10+', label: 'Projets réalisés' },
    { number: '5+', label: 'Technologies maîtrisées' },
    { number: '100%', label: 'Passion & Engagement' },
  ];

  const details = [
    { label: 'Nom', value: 'Aida Diallo' },
    { label: 'Localisation', value: 'Sénégal' },
    { label: 'Spécialité', value: 'Développement Full Stack' },
    { label: 'Disponibilité', value: 'Ouverte aux opportunités' },
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
            <p>
              Je suis une développeuse passionnée par la technologie et l'innovation.
              Mon parcours m'a permis de développer une expertise solide dans la
              conception et le développement d'applications web modernes.
            </p>
            <p>
              J'aime relever des défis techniques et créer des solutions élégantes
              qui allient performance et esthétique. Chaque projet est pour moi
              une opportunité d'apprendre et de repousser mes limites.
            </p>
            <p>
              Mon approche se concentre sur la qualité du code, l'expérience
              utilisateur et les bonnes pratiques de développement.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
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
