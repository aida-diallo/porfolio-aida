import React, { useState, useEffect } from 'react';

function getDeviceInfo() {
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|Chrome|FxiOS|EdgiOS/.test(ua);
  const isChrome = /CriOS|Chrome/.test(ua) && !/EdgiOS|Edge/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  return { isIOS, isSafari, isChrome, isAndroid, isStandalone };
}

function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [device, setDevice] = useState({});

  useEffect(() => {
    const info = getDeviceInfo();
    setDevice(info);

    // Déjà installé en mode standalone
    if (info.isStandalone) return;

    // Vérifier si l'utilisateur a déjà refusé récemment
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const now = new Date();
      if (now - dismissedDate < 7 * 24 * 60 * 60 * 1000) return;
    }

    // iOS : pas de beforeinstallprompt, on affiche notre propre popup
    if (info.isIOS) {
      setTimeout(() => setShowPrompt(true), 3000);
      return;
    }

    // Android / Desktop : écouter l'événement beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (device.isIOS) {
      setShowPrompt(false);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem('pwa-dismissed', new Date().toISOString());
  };

  if (!showPrompt) return null;

  // iOS + pas Safari (Chrome, Firefox, etc.) → dire d'ouvrir dans Safari
  const iosNotSafari = device.isIOS && !device.isSafari;
  // iOS + Safari → instructions pour ajouter à l'écran d'accueil
  const iosSafari = device.isIOS && device.isSafari;

  return (
    <div style={styles.overlay} onClick={handleDismiss}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.icon}>
          <img src="/favicon.svg" alt="AD" style={styles.logo} />
        </div>
        <h3 style={styles.title}>Installer l'application</h3>

        {iosNotSafari && (
          <div style={styles.text}>
            <p style={{ marginBottom: '0.8rem' }}>
              Pour installer l'application sur votre iPhone :
            </p>
            <div style={styles.steps}>
              <p style={styles.step}>
                <span style={styles.stepNum}>1</span>
                Ouvrez ce site dans <strong style={{ color: '#c8a86e' }}>Safari</strong>
              </p>
              <p style={styles.step}>
                <span style={styles.stepNum}>2</span>
                Appuyez sur <strong style={{ color: '#c8a86e' }}>Partager</strong> (icône ↑)
              </p>
              <p style={styles.step}>
                <span style={styles.stepNum}>3</span>
                Choisissez <strong style={{ color: '#c8a86e' }}>Sur l'écran d'accueil</strong>
              </p>
            </div>
          </div>
        )}

        {iosSafari && (
          <div style={styles.text}>
            <p style={{ marginBottom: '0.8rem' }}>
              Ajoutez <strong>Aida Diallo Portfolio</strong> à votre écran d'accueil :
            </p>
            <div style={styles.steps}>
              <p style={styles.step}>
                <span style={styles.stepNum}>1</span>
                Appuyez sur <strong style={{ color: '#c8a86e' }}>Partager</strong> (icône ↑ en bas)
              </p>
              <p style={styles.step}>
                <span style={styles.stepNum}>2</span>
                Choisissez <strong style={{ color: '#c8a86e' }}>Sur l'écran d'accueil</strong>
              </p>
              <p style={styles.step}>
                <span style={styles.stepNum}>3</span>
                Appuyez sur <strong style={{ color: '#c8a86e' }}>Ajouter</strong>
              </p>
            </div>
          </div>
        )}

        {!device.isIOS && (
          <p style={styles.text}>
            Ajoutez <strong>Aida Diallo Portfolio</strong> à votre écran d'accueil pour un accès rapide !
          </p>
        )}

        <div style={styles.buttons}>
          <button onClick={handleDismiss} style={styles.btnNo}>
            Non merci
          </button>
          {!device.isIOS && (
            <button onClick={handleInstall} style={styles.btnYes}>
              Oui, installer
            </button>
          )}
          {device.isIOS && (
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
    maxWidth: '380px',
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
  steps: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginTop: '0.5rem',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    margin: 0,
    color: '#ccc',
    fontSize: '0.85rem',
  },
  stepNum: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'rgba(200, 168, 110, 0.2)',
    color: '#c8a86e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
    flexShrink: 0,
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
