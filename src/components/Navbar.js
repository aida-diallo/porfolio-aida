import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-logo">
          A<span>.</span>D
        </div>
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {['a-propos', 'experience', 'projets', 'competences', 'contact'].map((item) => (
            <li key={item}>
              <Link
                to={item}
                smooth={true}
                duration={800}
                offset={-80}
                onClick={closeMenu}
              >
                {item === 'a-propos' ? 'À propos' : item === 'competences' ? 'Compétences' : item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
