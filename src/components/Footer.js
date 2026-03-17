import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} <span>Aida Diallo</span> — Tous droits réservés
        </p>
        <button className="footer-back-top" onClick={scrollToTop}>
          Retour en haut
        </button>
      </div>
    </footer>
  );
};

export default Footer;
