import { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import './Contact.css';

const Contact = ({ data }) => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setStatus('loading');
        setErrMsg('');
        try {
            const res = await axios.post('/api/contact', form);
            setStatus(res.data.success ? 'ok' : 'err');
            if (res.data.success) {
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 7000);
            } else {
                setErrMsg(res.data.message || 'Something went wrong.');
            }
        } catch (err) {
            setStatus('err');
            setErrMsg(err.response?.data?.message || 'Failed to send. Please try again.');
        }
    };

    return (
        <section className="section" id="contact">
            <div className="container">
                <span className="sec-eyebrow">Contact</span>
                <h2 className="sec-title">Let's <em>Connect</em></h2>
                <div className="sec-bar" />

                <div className="contact-layout">
                    {/* Left */}
                    <div className="contact-left">
                        <h3 className="contact-cta-head">Have a project or idea? Let's talk!</h3>
                        <p className="contact-cta-sub">
                            I'm open to new projects, collaborations, and conversations.
                            Drop me a message and I'll respond within 24 hours.
                        </p>

                        <div className="contact-detail">
                            <div className="contact-d-icon c"><FaEnvelope /></div>
                            <div>
                                <div className="contact-d-key">Email</div>
                                <div className="contact-d-val"><a href="#">{data?.email}</a></div>
                            </div>
                        </div>
                        <div className="contact-detail">
                            <div className="contact-d-icon or"><FaMapMarkerAlt /></div>
                            <div>
                                <div className="contact-d-key">Location</div>
                                <div className="contact-d-val">{data?.location}</div>
                            </div>
                        </div>

                        <div className="c-socials">
                            <a href="#" className="c-soc"><FaGithub /> GitHub</a>
                            <a href="#" className="c-soc"><FaLinkedin /> LinkedIn</a>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="contact-form-card">
                        <div className="cfc-head">
                            <h4>Send a Message</h4>
                            <p>I'll reply soon — promise!</p>
                        </div>
                        <div className="cfc-body">
                            <form onSubmit={onSubmit}>
                                <div className="cf-row">
                                    <div className="cf-field">
                                        <label>Your Name</label>
                                        <input type="text" name="name" value={form.name}
                                            onChange={onChange} placeholder="e.g. Rahul" required />
                                    </div>
                                    <div className="cf-field">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={form.email}
                                            onChange={onChange} placeholder="you@example.com" required />
                                    </div>
                                </div>
                                <div className="cf-field">
                                    <label>Your Message</label>
                                    <textarea name="message" value={form.message}
                                        onChange={onChange} rows="7"
                                        placeholder="Tell me about your project or idea..." required />
                                </div>
                                <button type="submit" className="btn btn-primary cf-submit"
                                    disabled={status === 'loading'}>
                                    <FiSend />
                                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                                </button>
                                {status === 'ok' && (
                                    <div className="cf-msg ok">✓ Message sent! I'll get back to you soon.</div>
                                )}
                                {status === 'err' && (
                                    <div className="cf-msg err">✗ {errMsg || 'Failed to send. Please try again.'}</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
