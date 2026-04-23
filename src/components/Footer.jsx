import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import './Footer.css';

const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Footer = ({ data }) => {
    const year = new Date().getFullYear();
    if (!data) return null;

    const initials = data.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CS';

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="footer-logo-box">{initials}</div>
                        <span className="footer-logo-name">{data.name}</span>
                    </div>
                    <p className="footer-tagline">{data.tagline}</p>
                </div>

                <div className="footer-col">
                    <h5>Navigate</h5>
                    <ul>
                        {['home', 'about', 'skills', 'contact'].map(id => (
                            <li key={id}>
                                <a onClick={() => go(id)}>
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <h5>Connect</h5>
                    <div className="footer-socials">
                        <a href="#" className="footer-soc" title="GitHub"><FaGithub /></a>
                        <a href="#" className="footer-soc" title="LinkedIn"><FaLinkedin /></a>
                        <a href="#" className="footer-soc" title="Email"><FaEnvelope /></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {year} {data.name}. All rights reserved.</span>
                <span>Built with <FaHeart className="heart" /> using React & Node.js</span>
            </div>
        </footer>
    );
};

export default Footer;
