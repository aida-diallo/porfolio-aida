import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiTool } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const iconMap = {
  code: <FiCode />,
  server: <FiServer />,
  tool: <FiTool />,
};

const Skills = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API}/skills`)
      .then(res => res.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const renderDots = (level) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`skill-dot ${i < level ? 'filled' : ''}`}
      ></span>
    ));
  };

  return (
    <section className="section skills" id="competences">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// 04 . Expertise</span>
          <h2 className="section-title">Compétences</h2>
          <div className="section-line"></div>
        </motion.div>

        {categories.length === 0 ? (
          <div className="loading-section"><div className="loading-spinner"></div></div>
        ) : (
          <div className="skills-grid">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="skill-icon">{iconMap[cat.icon] || <FiCode />}</div>
                <h3 className="skill-category-title">{cat.category}</h3>
                <div className="skill-list">
                  {cat.skills.map((skill, i) => (
                    <div key={i} className="skill-item">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-level">{renderDots(skill.level)}</div>
                    </div>
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

export default Skills;
