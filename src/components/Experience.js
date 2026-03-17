import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API = 'https://porfolio-aida-backend.onrender.com/api';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`${API}/experiences`)
      .then(res => res.json())
      .then(setExperiences)
      .catch(() => {});
  }, []);

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

        {experiences.length === 0 ? (
          <div className="loading-section"><div className="loading-spinner"></div></div>
        ) : (
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
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
        )}
      </div>
    </section>
  );
};

export default Experience;
