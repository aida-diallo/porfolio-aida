import React, { useState, useEffect } from 'react';

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà refusé récemment
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      if (now - dismissedDate < 7 * 24 * 60 * 60 * 1000) return;
    }

    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // Détecter iOS (Safari ne supporte pas beforeinstallprompt)
    const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOSDevice) {
      setIsIOS(true);
      setTimeout(() => setShowPrompt(true), 3000);
      return;
    }

    // Android / Desktop Chrome
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      // Sur iOS on ne peut pas déclencher l'install, on ferme juste le modal
      setShowPrompt(false);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    // Fermer le modal dans tous les cas (accepté ou refusé)
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem('pwa-dismissed', new Date().toISOString());
  };

  if (!showPrompt) return null;

  return (
    <div style={styles.overlay} onClick={handleDismiss}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.icon}>
          <img src="/favicon.svg" alt="AD" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Installer l'application</h3>
        {isIOS ? (
          <p style={styles.text}>
            Pour installer, appuyez sur{' '}
            <strong style={{ color: '#c8a86e' }}>Partager</strong> (icône ↑) puis{' '}
            <strong style={{ color: '#c8a86e' }}>Sur l'écran d'accueil</strong>.
          </p>
        ) : (
          <p style={styles.text}>
            Ajoutez <strong>Aida Diallo Portfolio</strong> à votre écran d'accueil pour un accès rapide !
          </p>
        )}
        <div style={styles.buttons}>
          <button onClick={handleDismiss} style={styles.btnNo}>
            Non merci
          </button>
          {!isIOS && (
            <button onClick={handleInstall} style={styles.btnYes}>
              Oui, installer
            </button>
          )}
          {isIOS && (
            <button onClick={handleDismiss} style={styles.btnYes}>
              Compris !
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: 'linear-gradient(145deg, #1a1a1a, #111)',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '360px',
    width: '90%',
    textAlign: 'center',
    border: '1px solid rgba(200, 168, 110, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
  },
  icon: {
    width: '70px',
    height: '70px',
    margin: '0 auto 1rem',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(200, 168, 110, 0.3)',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#c8a86e',
    fontSize: '1.3rem',
    marginBottom: '0.5rem',
    fontFamily: "'Playfair Display', serif",
  },
  text: {
    color: '#aaa',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    fontFamily: "'Inter', sans-serif",
  },
  buttons: {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
  },
  btnNo: {
    padding: '0.7rem 1.3rem',
    borderRadius: '10px',
    border: '1px solid #333',
    background: 'transparent',
    color: '#888',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },
  btnYes: {
    padding: '0.7rem 1.3rem',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #c8a86e, #a8884e)',
    color: '#0a0a0a',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.2s ease',
  },
};

export default InstallPWA;
