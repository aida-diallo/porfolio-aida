import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiTool } from 'react-icons/fi';

const Skills = () => {
  const categories = [
    {
      icon: <FiCode />,
      title: 'Front-End',
      skills: [
        { name: 'React.js', level: 4 },
        { name: 'JavaScript / ES6+', level: 5 },
        { name: 'HTML5 / CSS3', level: 5 },
        { name: 'TypeScript', level: 3 },
        { name: 'Tailwind CSS', level: 4 },
      ],
    },
    {
      icon: <FiServer />,
      title: 'Back-End',
      skills: [
        { name: 'Node.js', level: 4 },
        { name: 'Python', level: 4 },
        { name: 'Express.js', level: 4 },
        { name: 'MongoDB', level: 3 },
        { name: 'PostgreSQL', level: 3 },
      ],
    },
    {
      icon: <FiTool />,
      title: 'Outils & Autres',
      skills: [
        { name: 'Git / GitHub', level: 5 },
        { name: 'Figma', level: 3 },
        { name: 'Docker', level: 2 },
        { name: 'Linux', level: 3 },
        { name: 'Méthode Agile', level: 4 },
      ],
    },
  ];

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
              <div className="skill-icon">{cat.icon}</div>
              <h3 className="skill-category-title">{cat.title}</h3>
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
      </div>
    </section>
  );
};

export default Skills;
