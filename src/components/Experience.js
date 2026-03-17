import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      period: '2024 — Présent',
      role: 'Développeuse Full Stack',
      company: 'Projet Personnel / Freelance',
      description:
        'Conception et développement d\'applications web complètes. Mise en place d\'architectures modernes et de solutions performantes pour divers clients.',
      tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    },
    {
      period: '2023 — 2024',
      role: 'Développeuse Front-End',
      company: 'Stage / Projet Académique',
      description:
        'Développement d\'interfaces utilisateur réactives et modernes. Collaboration avec les équipes design pour créer des expériences utilisateur optimales.',
      tags: ['JavaScript', 'React', 'CSS3', 'Figma'],
    },
    {
      period: '2022 — 2023',
      role: 'Formation en Développement Web',
      company: 'Parcours Académique',
      description:
        'Apprentissage approfondi des fondamentaux du développement web, des bases de données et des méthodologies de développement agile.',
      tags: ['HTML/CSS', 'JavaScript', 'Python', 'SQL'],
    },
  ];

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// 02 . Parcours</span>
          <h2 className="section-title">Mon expérience</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <span className="timeline-period">{exp.period}</span>
              <h3 className="timeline-role">{exp.role}</h3>
              <p className="timeline-company">{exp.company}</p>
              <p className="timeline-description">{exp.description}</p>
              <div className="timeline-tags">
                {exp.tags.map((tag, i) => (
                  <span key={i} className="timeline-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
