import { FaEnvelope, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import './About.css';

const About = ({ data }) => {
    if (!data) return null;
    return (
        <section className="section" id="about">
            <div className="container">
                <span className="sec-eyebrow">About Me</span>
                <h2 className="sec-title">Who Am <em>I?</em></h2>
                <div className="sec-bar" />

                <div className="about-grid">
                    <div className="about-text">
                        <p>
                            Hi — I'm <strong>{data.name}</strong>, a B.Tech student who builds things for the web
                            and is currently diving deep into the world of AI & Machine Learning.
                            I'm a <strong>{data.aboutText}</strong> — sitting at the intersection of scalable backends,
                            reactive UIs, and intelligent systems.
                        </p>
                        <p>
                            I love the process of taking an idea from zero to a live product.
                            Whether it's architecting a Node API, crafting pixel-perfect React UIs,
                            or experimenting with ML models — I show up with curiosity and ship with care.
                        </p>
                        <p>
                            My goal: build solutions that are useful, fast, and meaningful.
                            Every project is a new lesson, every bug is a new teacher.
                        </p>
                        <div className="about-chips">
                            {['🔧 Builder', '🧠 AI/ML', '⚡ React', '🌐 Full-Stack', '🎯 Detail-Oriented'].map(t => (
                                <span key={t} className="chip">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="about-card">
                        <div className="about-card-head">
                            <span className="about-card-dot r" />
                            <span className="about-card-dot a" />
                            <span className="about-card-dot g" />
                            <span className="about-card-title">profile.json</span>
                        </div>
                        <div className="about-field">
                            <div className="af-icon c"><FaEnvelope /></div>
                            <div>
                                <div className="af-key">Email</div>
                                <div className="af-val"><a href="#">{data.email}</a></div>
                            </div>
                        </div>
                        <div className="about-field">
                            <div className="af-icon or"><FaMapMarkerAlt /></div>
                            <div>
                                <div className="af-key">Location</div>
                                <div className="af-val">{data.location}</div>
                            </div>
                        </div>
                        <div className="about-field">
                            <div className="af-icon mn"><FaCode /></div>
                            <div>
                                <div className="af-key">Focus</div>
                                <div className="af-val">{data.aboutText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
