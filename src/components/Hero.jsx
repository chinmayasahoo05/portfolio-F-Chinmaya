import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ data }) => {
    const typedRef = useRef(null);

    useEffect(() => {
        if (!data?.roles?.length) return;
        const roles = data.roles;
        let ri = 0, ci = 0, del = false, timer;
        const tick = () => {
            if (!typedRef.current) return;
            const cur = roles[ri];
            if (!del) {
                typedRef.current.textContent = cur.slice(0, ci + 1);
                ci++;
                if (ci === cur.length) { del = true; timer = setTimeout(tick, 2200); return; }
            } else {
                typedRef.current.textContent = cur.slice(0, ci - 1);
                ci--;
                if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
            }
            timer = setTimeout(tick, del ? 48 : 95);
        };
        tick();
        return () => clearTimeout(timer);
    }, [data?.roles]);

    if (!data) return null;

    return (
        <section className="hero" id="home">
            <div className="hero-orb1" /><div className="hero-orb2" />
            <div className="container hero-bento">

                {/* ── Cell A — Main title ── */}
                <div className="hb-main">
                    <div className="hero-eyebrow">Available for opportunities</div>

                    <h1 className="hero-name">
                        Hi, I'm{' '}
                        <span className="hero-name-hl">{data.name}</span>
                    </h1>

                    <div className="hero-role-line">
                        <span ref={typedRef} className="hero-typed" />
                        <span className="hero-cursor" />
                    </div>

                    <p className="hero-desc">{data.description}</p>

                    <div className="hero-cta">
                        <button className="btn btn-primary"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Get In Touch
                        </button>
                        <button className="btn btn-ghost"
                            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
                            View Skills ↓
                        </button>
                    </div>
                </div>

                {/* ── Cell B — Info sidebar ── */}
                <div className="hb-info">
                    {/* Profile Photo */}
                    <div className="hb-photo-wrap">
                        <img
                            src="/profile.jpg"
                            alt={data.name}
                            className="hb-photo"
                        />
                    </div>
                    <div className="hb-info-divider" />
                    <div>
                        <div className="hb-info-label">Location</div>
                        <div className="hb-info-val">{data.location}</div>
                    </div>
                    <div className="hb-info-divider" />
                    <div>
                        <div className="hb-info-label">Email</div>
                        <div className="hb-info-val">
                            <a href="#">{data.email}</a>
                        </div>
                    </div>
                    <div className="hb-info-divider" />
                    <div>
                        <div className="hb-info-label">Focus</div>
                        <div className="hb-info-val">{data.aboutText}</div>
                    </div>
                    <div className="hb-info-divider" />
                    <div className="hb-stats-row">
                        <div className="hb-stat">
                            <span className="hb-stat-num">{data.skills?.length || 0}</span>
                            <span className="hb-stat-lbl">Skills</span>
                        </div>
                        <div className="hb-stat">
                            <span className="hb-stat-num">{data.roles?.length || 0}</span>
                            <span className="hb-stat-lbl">Roles</span>
                        </div>
                    </div>
                </div>

                {/* ── Cell C — Socials bar ── */}
                <div className="hb-socials">
                    <span className="hb-soc-label">Find me on</span>
                    <div className="hb-soc-links">
                        <a href="#" className="hb-soc-link">
                            <FaGithub /> <span>GitHub</span>
                        </a>
                        <a href="#" className="hb-soc-link">
                            <FaLinkedin /> <span>LinkedIn</span>
                        </a>
                        <a href="#" className="hb-soc-link">
                            <FaEnvelope /> <span>Email</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
