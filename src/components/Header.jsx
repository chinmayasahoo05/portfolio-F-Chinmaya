import { useState, useEffect } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import './Header.css';

const navItems = ['Home', 'About', 'Skills', 'Contact'];

const Header = ({ onEditClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const go = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setOpen(false);
    };

    return (
        <>
            <header className={`header${scrolled ? ' scrolled' : ''}`}>
                <div className="header-inner">
                    <div className="logo-mark" onClick={() => go('home')}>
                        <div className="logo-box">CS</div>
                        <div className="logo-words">
                            <div className="logo-name">Chinmaya</div>
                            <div className="logo-tag">dev · portfolio</div>
                        </div>
                    </div>

                    <ul className="nav-desktop">
                        {navItems.map(n => (
                            <li key={n}><a onClick={() => go(n)}>{n}</a></li>
                        ))}
                        <li>
                            <button className="nav-edit-btn" onClick={onEditClick}>
                                <FiEdit3 size={13} /> Edit
                            </button>
                        </li>
                    </ul>

                    <button className={`burger${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="menu">
                        <span /><span /><span />
                    </button>
                </div>
            </header>

            <ul className={`nav-mobile${open ? ' open' : ''}`}>
                {navItems.map(n => (
                    <li key={n}><a onClick={() => go(n)}>{n}</a></li>
                ))}
                <li className="mob-edit-wrap">
                    <button className="btn btn-primary" onClick={() => { setOpen(false); onEditClick(); }}>
                        <FiEdit3 size={13} /> Edit Profile
                    </button>
                </li>
            </ul>
        </>
    );
};

export default Header;
