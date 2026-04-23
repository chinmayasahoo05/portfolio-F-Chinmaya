import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = ({ data }) => {
    const [vis, setVis] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVis(true); },
            { threshold: 0.2 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => { if (ref.current) obs.unobserve(ref.current); };
    }, []);

    if (!data?.skills?.length) return null;

    const getLevel = pct => pct >= 75 ? 'high' : pct >= 45 ? '' : 'coral-chip';

    return (
        <section className="section" id="skills" ref={ref}>
            <div className="container">
                <span className="sec-eyebrow">Skills</span>
                <h2 className="sec-title">Tech <em>Stack</em></h2>
                <div className="sec-bar" />
                <p className="sec-sub">Tools I use to build and ship. Percentages represent hands-on confidence.</p>

                <div className="skills-bento">
                    {/* Left — chip cloud */}
                    <div className="sk-chip-panel">
                        <div className="sk-panel-label">All Technologies</div>
                        <div className="sk-chips">
                            {data.skills.map((sk, i) => {
                                const pct = Math.min(parseInt(sk.expertise) || 50, 100);
                                return (
                                    <div key={i} className={`sk-chip ${getLevel(pct)}`} title={`${sk.expertise} proficiency`}>
                                        {sk.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right — bar list */}
                    <div className="sk-bar-panel">
                        <div className="sk-panel-label">Proficiency</div>
                        {data.skills.map((sk, i) => {
                            const pct = Math.min(parseInt(sk.expertise) || 50, 100);
                            return (
                                <div key={i} className="sk-row">
                                    <span className="sk-row-name">{sk.name}</span>
                                    <div className="sk-track">
                                        <div className="sk-fill" style={{ width: vis ? `${pct}%` : '0%' }} />
                                    </div>
                                    <span className="sk-pct">{pct}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
