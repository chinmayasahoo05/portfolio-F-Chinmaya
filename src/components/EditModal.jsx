import { useState } from 'react';
import axios from 'axios';
import { FiX, FiPlus, FiTrash2, FiLock, FiUser, FiSave } from 'react-icons/fi';

const EditModal = ({ isOpen, onClose, data, onSaveSuccess }) => {
    const [step, setStep] = useState(1);
    const [creds, setCreds] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name:        data?.name        || '',
        tagline:     data?.tagline     || '',
        description: data?.description || '',
        aboutText:   data?.aboutText   || '',
        email:       data?.email       || '',
        location:    data?.location    || '',
        roles:       data?.roles       || [],
        skills:      data?.skills      || []
    });

    if (!isOpen) return null;

    const close = () => {
        setStep(1);
        setCreds({ username: '', password: '' });
        setError('');
        onClose();
    };

    const handleLogin = async e => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/api/login', creds);
            if (res.data.success) setStep(2);
        } catch { setError('Invalid username or password'); }
    };

    const handleSave = async e => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await axios.put('/api/portfolio', form);
            if (res.data.success) { onSaveSuccess(res.data.data); close(); }
        } catch { setError('Failed to save. Try again.'); }
        finally { setSaving(false); }
    };

    const addSkill  = () => setForm({ ...form, skills: [...form.skills, { name: '', expertise: '' }] });
    const rmSkill   = i => setForm({ ...form, skills: form.skills.filter((_, j) => j !== i) });
    const editSkill = (i, f, v) => {
        const s = [...form.skills]; s[i][f] = v;
        setForm({ ...form, skills: s });
    };

    const addRole  = () => setForm({ ...form, roles: [...form.roles, ''] });
    const rmRole   = i => setForm({ ...form, roles: form.roles.filter((_, j) => j !== i) });
    const editRole = (i, v) => {
        const r = [...form.roles]; r[i] = v;
        setForm({ ...form, roles: r });
    };

    return (
        <div style={styles.overlay} onClick={e => e.target === e.currentTarget && close()}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.modalHead}>
                    <span style={styles.modalTitle}>
                        {step === 1 ? '🔒 Admin Login' : '✏️ Edit Portfolio'}
                    </span>
                    <button onClick={close} style={styles.closeBtn}><FiX /></button>
                </div>

                {error && <div style={styles.errBox}>{error}</div>}

                {/* Step 1 — Login */}
                {step === 1 && (
                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}><FiUser size={12} /> Username</label>
                            <input
                                style={styles.input}
                                type="text" placeholder="chinmaya05"
                                value={creds.username}
                                onChange={e => setCreds({ ...creds, username: e.target.value })}
                                required autoFocus
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}><FiLock size={12} /> Password</label>
                            <input
                                style={styles.input}
                                type="password" placeholder="••••••"
                                value={creds.password}
                                onChange={e => setCreds({ ...creds, password: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.primaryBtn}>Verify & Continue →</button>
                    </form>
                )}

                {/* Step 2 — Edit Form */}
                {step === 2 && (
                    <form onSubmit={handleSave} style={{ ...styles.form, maxHeight: '72vh', overflowY: 'auto', paddingRight: '6px' }}>
                        {/* Basic */}
                        <div style={styles.section}>
                            <div style={styles.sectionLabel}>Basic Info</div>
                            {[
                                ['name',        'Full Name',    'text',  'Chinmaya Sahoo'],
                                ['tagline',     'Tagline',      'text',  'Building the future...'],
                                ['email',       'Email',        'email', 'you@gmail.com'],
                                ['location',    'Location',     'text',  'Odisha, India'],
                            ].map(([key, label, type, ph]) => (
                                <div key={key} style={styles.field}>
                                    <label style={styles.label}>{label}</label>
                                    <input
                                        style={styles.input} type={type} placeholder={ph}
                                        value={form[key]}
                                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                                        required
                                    />
                                </div>
                            ))}
                            <div style={styles.field}>
                                <label style={styles.label}>Description (Hero)</label>
                                <textarea style={{ ...styles.input, minHeight: '72px', resize: 'vertical' }}
                                    value={form.description} placeholder="Curious mind. Creative code..."
                                    onChange={e => setForm({ ...form, description: e.target.value })} required />
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>About Text</label>
                                <textarea style={{ ...styles.input, minHeight: '60px', resize: 'vertical' }}
                                    value={form.aboutText} placeholder="MERN Stack developer..."
                                    onChange={e => setForm({ ...form, aboutText: e.target.value })} required />
                            </div>
                        </div>

                        {/* Roles */}
                        <div style={styles.section}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={styles.sectionLabel}>Typed Roles</div>
                                <button type="button" onClick={addRole} style={styles.addBtn}><FiPlus size={12}/> Add Role</button>
                            </div>
                            {form.roles.map((r, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input style={{ ...styles.input, flex: 1 }} value={r}
                                        placeholder="e.g. MERN Stack Developer"
                                        onChange={e => editRole(i, e.target.value)} />
                                    <button type="button" onClick={() => rmRole(i)} style={styles.rmBtn}><FiTrash2 size={13} /></button>
                                </div>
                            ))}
                        </div>

                        {/* Skills */}
                        <div style={styles.section}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={styles.sectionLabel}>Skills</div>
                                <button type="button" onClick={addSkill} style={styles.addBtn}><FiPlus size={12}/> Add Skill</button>
                            </div>
                            {form.skills.map((sk, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input style={{ ...styles.input, flex: 2 }} value={sk.name}
                                        placeholder="Skill Name"
                                        onChange={e => editSkill(i, 'name', e.target.value)} />
                                    <input style={{ ...styles.input, flex: 1 }} value={sk.expertise}
                                        placeholder="e.g. 85%"
                                        onChange={e => editSkill(i, 'expertise', e.target.value)} />
                                    <button type="button" onClick={() => rmSkill(i)} style={styles.rmBtn}><FiTrash2 size={13} /></button>
                                </div>
                            ))}
                        </div>

                        <button type="submit" style={styles.primaryBtn} disabled={saving}>
                            <FiSave /> {saving ? 'Saving…' : 'Save All Changes'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

/* ── Inline styles (no CSS import needed) ── */
const styles = {
    overlay: {
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 999
    },
    modal: {
        background: '#0e0e1c',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        width: '90%', maxWidth: '520px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
        overflow: 'hidden'
    },
    modalHead: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.2rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(244,63,94,0.08) 100%)'
    },
    modalTitle: { fontWeight: 700, fontSize: '1rem', color: '#e2e8f0' },
    closeBtn: {
        background: 'none', border: 'none', color: '#64748b',
        fontSize: '1.2rem', cursor: 'pointer', padding: '4px',
        borderRadius: '6px', display: 'flex', alignItems: 'center'
    },
    errBox: {
        margin: '0.8rem 1.5rem 0',
        padding: '10px 14px',
        background: 'rgba(244,63,94,0.1)',
        border: '1px solid rgba(244,63,94,0.3)',
        borderRadius: '8px',
        color: '#fb7185', fontSize: '0.82rem'
    },
    form: {
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '4px'
    },
    section: { marginBottom: '1.2rem' },
    sectionLabel: {
        fontSize: '0.68rem', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.1em',
        color: '#7c3aed', marginBottom: '10px',
        fontFamily: 'JetBrains Mono, monospace'
    },
    field: { marginBottom: '0.9rem' },
    label: {
        display: 'flex', alignItems: 'center', gap: '5px',
        fontSize: '0.72rem', fontWeight: 600, color: '#64748b',
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px'
    },
    input: {
        width: '100%', padding: '0.65rem 0.9rem',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', color: '#e2e8f0',
        fontFamily: 'Outfit, sans-serif', fontSize: '0.9rem',
        outline: 'none', transition: 'border-color 0.2s'
    },
    primaryBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        width: '100%', padding: '0.8rem',
        background: 'linear-gradient(135deg, #7c3aed 0%, #f43f5e 100%)',
        border: 'none', borderRadius: '10px',
        color: '#fff', fontWeight: 700, fontSize: '0.95rem',
        cursor: 'pointer', marginTop: '0.5rem',
        fontFamily: 'Outfit, sans-serif'
    },
    addBtn: {
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '4px 12px', borderRadius: '6px',
        background: 'rgba(124,58,237,0.12)',
        border: '1px solid rgba(124,58,237,0.25)',
        color: '#a855f7', fontSize: '0.75rem', fontWeight: 600,
        cursor: 'pointer', fontFamily: 'Outfit, sans-serif'
    },
    rmBtn: {
        padding: '0 10px', borderRadius: '8px',
        background: 'rgba(244,63,94,0.1)',
        border: '1px solid rgba(244,63,94,0.2)',
        color: '#fb7185', cursor: 'pointer', fontSize: '0.85rem',
        display: 'flex', alignItems: 'center'
    }
};

export default EditModal;
