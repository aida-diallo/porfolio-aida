import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const API = 'https://porfolio-aida-backend.onrender.com/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API}/projects`)
      .then(res => res.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  return (
    <section className="section projects" id="projets">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">// 03 . Réalisations</span>
          <h2 className="section-title">Mes projets</h2>
          <div className="section-line"></div>
        </motion.div>

        {projects.length === 0 ? (
          <div className="loading-section"><div className="loading-spinner"></div></div>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub /> Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      className="project-link project-link-visit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink /> Visiter
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
