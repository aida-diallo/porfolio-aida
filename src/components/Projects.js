import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const projects = [
    {
      number: '01',
      name: 'E-Commerce Platform',
      description:
        'Plateforme e-commerce complète avec système de paiement intégré, gestion de panier et tableau de bord administrateur.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
    },
    {
      number: '02',
      name: 'Application de Gestion',
      description:
        'Application de gestion de tâches et de projets avec authentification, collaboration en temps réel et notifications.',
      tech: ['React', 'Firebase', 'Material UI', 'WebSocket'],
      github: '#',
      live: '#',
    },
    {
      number: '03',
      name: 'Portfolio Créatif',
      description:
        'Portfolio personnel avec design moderne, animations fluides et une expérience utilisateur immersive.',
      tech: ['React', 'Framer Motion', 'CSS3', 'Responsive'],
      github: '#',
      live: '#',
    },
    {
      number: '04',
      name: 'API RESTful',
      description:
        'API backend complète avec authentification JWT, gestion des rôles et documentation Swagger intégrée.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
      github: '#',
      live: '#',
    },
  ];

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

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="project-number">{project.number}</div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} className="project-link" aria-label="Code source">
                  <FiGithub />
                </a>
                <a href={project.live} className="project-link" aria-label="Voir le projet">
                  <FiExternalLink />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
