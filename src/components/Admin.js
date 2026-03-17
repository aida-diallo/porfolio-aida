import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave, FiArrowLeft, FiLock, FiLogOut } from 'react-icons/fi';

const API = 'https://porfolio-aida-backend.onrender.com/api';

const Admin = ({ onClose }) => {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  // Vérifier le token au chargement
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const verifyToken = async () => {
    try {
      const res = await fetch(`${API}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        setIsLoggedIn(true);
        fetchAll();
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  // ==================== LOGIN ====================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('admin_token', data.token);
        setIsLoggedIn(true);
        setLoginPassword('');
        fetchAll();
      } else {
        setLoginError(data.error || 'Mot de passe incorrect');
      }
    } catch {
      setLoginError('Erreur de connexion au serveur');
    }
    setLoginLoading(false);
  };

  const logout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('admin_token');
  };

  // ==================== FETCH ====================
  const fetchAll = () => {
    fetch(`${API}/profile`).then(r => r.json()).then(setProfile).catch(() => {});
    fetch(`${API}/projects`).then(r => r.json()).then(setProjects).catch(() => {});
    fetch(`${API}/experiences`).then(r => r.json()).then(setExperiences).catch(() => {});
    fetch(`${API}/skills`).then(r => r.json()).then(setSkills).catch(() => {});
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // ==================== PROFILE ====================
  const saveProfile = async () => {
    const res = await fetch(`${API}/profile`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(profile),
    });
    if (res.status === 401) return logout();
    showMessage('Profil sauvegardé !');
  };

  // ==================== PROJECTS ====================
  const [projectForm, setProjectForm] = useState({
    name: '', description: '', tech: '', github: '', live: '', featured: false
  });

  const saveProject = async () => {
    const data = { ...projectForm, tech: projectForm.tech.split(',').map(t => t.trim()).filter(Boolean) };
    if (editing && editing.type === 'project') {
      const res = await fetch(`${API}/projects/${editing.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (res.status === 401) return logout();
      showMessage('Projet modifié !');
    } else {
      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (res.status === 401) return logout();
      showMessage('Projet ajouté !');
    }
    setProjectForm({ name: '', description: '', tech: '', github: '', live: '', featured: false });
    setEditing(null);
    fetch(`${API}/projects`).then(r => r.json()).then(setProjects);
  };

  const editProject = (p) => {
    setProjectForm({ ...p, tech: p.tech.join(', ') });
    setEditing({ type: 'project', id: p.id });
    setTab('projects');
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    const res = await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.status === 401) return logout();
    fetch(`${API}/projects`).then(r => r.json()).then(setProjects);
    showMessage('Projet supprimé !');
  };

  // ==================== EXPERIENCES ====================
  const [expForm, setExpForm] = useState({
    period: '', role: '', company: '', description: '', tags: ''
  });

  const saveExperience = async () => {
    const data = { ...expForm, tags: expForm.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editing && editing.type === 'experience') {
      const res = await fetch(`${API}/experiences/${editing.id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (res.status === 401) return logout();
      showMessage('Expérience modifiée !');
    } else {
      const res = await fetch(`${API}/experiences`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
      });
      if (res.status === 401) return logout();
      showMessage('Expérience ajoutée !');
    }
    setExpForm({ period: '', role: '', company: '', description: '', tags: '' });
    setEditing(null);
    fetch(`${API}/experiences`).then(r => r.json()).then(setExperiences);
  };

  const editExperience = (e) => {
    setExpForm({ ...e, tags: e.tags.join(', ') });
    setEditing({ type: 'experience', id: e.id });
    setTab('experiences');
  };

  const deleteExperience = async (id) => {
    if (!window.confirm('Supprimer cette expérience ?')) return;
    const res = await fetch(`${API}/experiences/${id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.status === 401) return logout();
    fetch(`${API}/experiences`).then(r => r.json()).then(setExperiences);
    showMessage('Expérience supprimée !');
  };

  // ==================== SKILLS ====================
  const saveSkills = async () => {
    const res = await fetch(`${API}/skills`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(skills),
    });
    if (res.status === 401) return logout();
    showMessage('Compétences sauvegardées !');
  };

  const addSkillToCategory = (catIndex) => {
    const updated = [...skills];
    updated[catIndex].skills.push({ name: 'Nouvelle compétence', level: 3 });
    setSkills(updated);
  };

  const updateSkill = (catIndex, skillIndex, field, value) => {
    const updated = [...skills];
    updated[catIndex].skills[skillIndex][field] = field === 'level' ? parseInt(value) : value;
    setSkills(updated);
  };

  const removeSkill = (catIndex, skillIndex) => {
    const updated = [...skills];
    updated[catIndex].skills.splice(skillIndex, 1);
    setSkills(updated);
  };

  // ==================== LOGIN SCREEN ====================
  if (!isLoggedIn) {
    return (
      <div className="admin-overlay">
        <div className="admin-panel">
          <div className="admin-header">
            <button className="admin-back" onClick={onClose}>
              <FiArrowLeft /> Retour au portfolio
            </button>
          </div>
          <div className="login-container">
            <div className="login-icon"><FiLock /></div>
            <h1 className="login-title">Administration</h1>
            <p className="login-subtitle">Connectez-vous pour gérer votre portfolio</p>
            <form onSubmit={handleLogin} className="login-form">
              <div className="admin-field">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {loginError && <div className="login-error">{loginError}</div>}
              <button type="submit" className="admin-btn save login-btn" disabled={loginLoading}>
                {loginLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==================== ADMIN PANEL ====================
  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <button className="admin-back" onClick={onClose}>
              <FiArrowLeft /> Retour au portfolio
            </button>
            <button className="admin-back" onClick={logout} style={{color: '#e74c3c'}}>
              <FiLogOut /> Déconnexion
            </button>
          </div>
          <h1 className="admin-title">Panneau d'administration</h1>
          {message && <div className="admin-message">{message}</div>}
        </div>

        <div className="admin-tabs">
          {[
            { key: 'profile', label: 'Profil' },
            { key: 'projects', label: 'Projets' },
            { key: 'experiences', label: 'Expériences' },
            { key: 'skills', label: 'Compétences' },
          ].map(t => (
            <button
              key={t.key}
              className={`admin-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => { setTab(t.key); setEditing(null); }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {/* ===== PROFIL ===== */}
          {tab === 'profile' && profile && (
            <div className="admin-section">
              <h2>Informations personnelles</h2>
              <div className="admin-form">
                <div className="admin-field">
                  <label>Nom complet</label>
                  <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Titre / Métier</label>
                  <input value={profile.title} onChange={e => setProfile({...profile, title: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>{"Phrase d'accroche"}</label>
                  <input value={profile.greeting} onChange={e => setProfile({...profile, greeting: e.target.value})} />
                </div>
                <div className="admin-field full">
                  <label>Description (Hero)</label>
                  <textarea value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})} />
                </div>
                <div className="admin-field full">
                  <label>À propos - Paragraphe 1</label>
                  <textarea value={profile.about[0] || ''} onChange={e => { const a = [...profile.about]; a[0] = e.target.value; setProfile({...profile, about: a}); }} />
                </div>
                <div className="admin-field full">
                  <label>À propos - Paragraphe 2</label>
                  <textarea value={profile.about[1] || ''} onChange={e => { const a = [...profile.about]; a[1] = e.target.value; setProfile({...profile, about: a}); }} />
                </div>
                <div className="admin-field full">
                  <label>À propos - Paragraphe 3</label>
                  <textarea value={profile.about[2] || ''} onChange={e => { const a = [...profile.about]; a[2] = e.target.value; setProfile({...profile, about: a}); }} />
                </div>
                <div className="admin-field">
                  <label>Localisation</label>
                  <input value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Spécialité</label>
                  <input value={profile.specialty} onChange={e => setProfile({...profile, specialty: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Disponibilité</label>
                  <input value={profile.availability} onChange={e => setProfile({...profile, availability: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>GitHub URL</label>
                  <input value={profile.github} onChange={e => setProfile({...profile, github: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>LinkedIn URL</label>
                  <input value={profile.linkedin} onChange={e => setProfile({...profile, linkedin: e.target.value})} />
                </div>
                <div className="admin-field">
                  <label>Twitter URL</label>
                  <input value={profile.twitter} onChange={e => setProfile({...profile, twitter: e.target.value})} />
                </div>

                <h3 style={{gridColumn: '1 / -1', marginTop: '20px'}}>Statistiques</h3>
                <div className="admin-field">
                  <label>{"Années d'expérience"}</label>
                  <input value={profile.stats.years} onChange={e => setProfile({...profile, stats: {...profile.stats, years: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Projets réalisés</label>
                  <input value={profile.stats.projects} onChange={e => setProfile({...profile, stats: {...profile.stats, projects: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Technologies</label>
                  <input value={profile.stats.technologies} onChange={e => setProfile({...profile, stats: {...profile.stats, technologies: e.target.value}})} />
                </div>
                <div className="admin-field">
                  <label>Engagement</label>
                  <input value={profile.stats.engagement} onChange={e => setProfile({...profile, stats: {...profile.stats, engagement: e.target.value}})} />
                </div>

                <div className="admin-actions">
                  <button className="admin-btn save" onClick={saveProfile}><FiSave /> Sauvegarder le profil</button>
                </div>
              </div>
            </div>
          )}

          {/* ===== PROJETS ===== */}
          {tab === 'projects' && (
            <div className="admin-section">
              <h2>{editing?.type === 'project' ? 'Modifier le projet' : 'Ajouter un projet'}</h2>
              <div className="admin-form">
                <div className="admin-field">
                  <label>Nom du projet</label>
                  <input value={projectForm.name} onChange={e => setProjectForm({...projectForm, name: e.target.value})} placeholder="Mon super projet" />
                </div>
                <div className="admin-field">
                  <label>Technologies (séparées par des virgules)</label>
                  <input value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="admin-field full">
                  <label>Description</label>
                  <textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} placeholder="Décrivez votre projet..." />
                </div>
                <div className="admin-field">
                  <label>Lien GitHub</label>
                  <input value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} placeholder="https://github.com/..." />
                </div>
                <div className="admin-field">
                  <label>Lien du site live</label>
                  <input value={projectForm.live} onChange={e => setProjectForm({...projectForm, live: e.target.value})} placeholder="https://monprojet.com" />
                </div>
                <div className="admin-actions">
                  <button className="admin-btn save" onClick={saveProject}>
                    {editing?.type === 'project' ? <><FiSave /> Modifier</> : <><FiPlus /> Ajouter</>}
                  </button>
                  {editing && (
                    <button className="admin-btn cancel" onClick={() => { setEditing(null); setProjectForm({ name: '', description: '', tech: '', github: '', live: '', featured: false }); }}>
                      <FiX /> Annuler
                    </button>
                  )}
                </div>
              </div>

              <h2 style={{marginTop: '40px'}}>Mes projets ({projects.length})</h2>
              <div className="admin-list">
                {projects.map(p => (
                  <div key={p.id} className="admin-list-item">
                    <div className="admin-list-info">
                      <strong>{p.name}</strong>
                      <span>{p.tech.join(', ')}</span>
                      <span className="admin-list-links">
                        {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Voir le site</a>}
                        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                      </span>
                    </div>
                    <div className="admin-list-actions">
                      <button className="admin-btn-icon edit" onClick={() => editProject(p)}><FiEdit2 /></button>
                      <button className="admin-btn-icon delete" onClick={() => deleteProject(p.id)}><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== EXPERIENCES ===== */}
          {tab === 'experiences' && (
            <div className="admin-section">
              <h2>{editing?.type === 'experience' ? "Modifier l'expérience" : 'Ajouter une expérience'}</h2>
              <div className="admin-form">
                <div className="admin-field">
                  <label>Période</label>
                  <input value={expForm.period} onChange={e => setExpForm({...expForm, period: e.target.value})} placeholder="2024 — Présent" />
                </div>
                <div className="admin-field">
                  <label>Rôle / Poste</label>
                  <input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} placeholder="Développeuse Full Stack" />
                </div>
                <div className="admin-field">
                  <label>{"Entreprise / Structure"}</label>
                  <input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} placeholder="Nom de l'entreprise" />
                </div>
                <div className="admin-field">
                  <label>Technologies (séparées par des virgules)</label>
                  <input value={expForm.tags} onChange={e => setExpForm({...expForm, tags: e.target.value})} placeholder="React, Node.js, MongoDB" />
                </div>
                <div className="admin-field full">
                  <label>Description</label>
                  <textarea value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} placeholder="Décrivez votre rôle et vos réalisations..." />
                </div>
                <div className="admin-actions">
                  <button className="admin-btn save" onClick={saveExperience}>
                    {editing?.type === 'experience' ? <><FiSave /> Modifier</> : <><FiPlus /> Ajouter</>}
                  </button>
                  {editing && (
                    <button className="admin-btn cancel" onClick={() => { setEditing(null); setExpForm({ period: '', role: '', company: '', description: '', tags: '' }); }}>
                      <FiX /> Annuler
                    </button>
                  )}
                </div>
              </div>

              <h2 style={{marginTop: '40px'}}>Mon parcours ({experiences.length})</h2>
              <div className="admin-list">
                {experiences.map(e => (
                  <div key={e.id} className="admin-list-item">
                    <div className="admin-list-info">
                      <strong>{e.role}</strong>
                      <span>{e.company} — {e.period}</span>
                    </div>
                    <div className="admin-list-actions">
                      <button className="admin-btn-icon edit" onClick={() => editExperience(e)}><FiEdit2 /></button>
                      <button className="admin-btn-icon delete" onClick={() => deleteExperience(e.id)}><FiTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== COMPETENCES ===== */}
          {tab === 'skills' && (
            <div className="admin-section">
              <h2>Gérer les compétences</h2>
              {skills.map((cat, catIndex) => (
                <div key={catIndex} className="admin-skill-category">
                  <div className="admin-skill-cat-header">
                    <h3>{cat.category}</h3>
                    <button className="admin-btn small" onClick={() => addSkillToCategory(catIndex)}>
                      <FiPlus /> Ajouter
                    </button>
                  </div>
                  {cat.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="admin-skill-row">
                      <input
                        value={skill.name}
                        onChange={e => updateSkill(catIndex, skillIndex, 'name', e.target.value)}
                        className="admin-skill-input"
                      />
                      <div className="admin-skill-level">
                        {[1, 2, 3, 4, 5].map(n => (
                          <button
                            key={n}
                            className={`admin-dot ${n <= skill.level ? 'active' : ''}`}
                            onClick={() => updateSkill(catIndex, skillIndex, 'level', n)}
                          />
                        ))}
                      </div>
                      <button className="admin-btn-icon delete" onClick={() => removeSkill(catIndex, skillIndex)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
              <div className="admin-actions" style={{marginTop: '30px'}}>
                <button className="admin-btn save" onClick={saveSkills}><FiSave /> Sauvegarder les compétences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
