import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Sparkles,
    Briefcase,
    GraduationCap,
    Twitter,
    Linkedin,
    Github,
    ArrowRight,
    ArrowUpRight
} from 'lucide-react';
import './About.css';

export default function About() {
    useEffect(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            (card as HTMLElement).style.opacity = '0';
            (card as HTMLElement).style.transform = 'translateY(30px)';
            setTimeout(() => {
                (card as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, []);

    return (
        <>
            <div className="bento-grid">
                <div className="card profile-card">
                    <img src="/image.png" alt="Jonathan" />
                </div>

                <div className="card summary-card">
                    <div className="section-title">
                        <Sparkles size={16} /> SELF-SUMMARY
                    </div>
                    <h2>Jonathan Ogunmuyiwa</h2>
                    <p>
                        I am a software engineer and designer based in Nigeria. I specialize in building high-performance web
                        applications with a focus on clean code and user-centric design.
                    </p>
                </div>

                <div className="card exp-card" id="specialize">
                    <div className="card-header">
                        <Briefcase size={14} /> EXPERIENCE
                    </div>
                    <div className="item">
                        <div className="date">2025 - Present</div>
                        <div className="title">Freelance Full Stack Developer</div>
                        <div className="sub">Crafting modern digital products.</div>
                    </div>
                </div>

                <div className="card exp-card">
                    <div className="card-header">
                        <GraduationCap size={14} /> EDUCATION
                    </div>
                    <div className="item">
                        <div className="date">2025 - 2027</div>
                        <div className="title">ADSE - Software Engineering</div>
                        <div className="sub">Aptech Computer Education</div>
                    </div>
                </div>

                <div className="card expo-card">
                    <div className="card-header">
                        <GraduationCap size={14} /> SERVICE OFFERING
                    </div>
                    <div className="item">
                        <div className="title">Frontend Development</div>
                    </div>
                </div>

                <div className="card small-card">
                    <div className="socials">
                        <div className="icon-circle">
                            <Twitter size={20} />
                        </div>
                        <div className="icon-circle">
                            <Linkedin size={20} />
                        </div>
                        <div className="icon-circle">
                            <Github size={20} />
                        </div>
                    </div>
                    <div className="footer-label">
                        <div>
                            <span>PROFILES</span>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Socials</p>
                        </div>
                        <ArrowRight className="arrow-icon" />
                    </div>
                </div>

                <Link to="/contact" className="card cta-card" style={{ justifyContent: 'flex-end', minHeight: '220px' }}>
                    <h2 style={{ lineHeight: 1.1 }}>
                        Let's <br />
                        work <span style={{ color: 'var(--text-dim)' }}>together.</span>
                    </h2>
                    <div style={{ position: 'absolute', right: '35px', bottom: '35px' }} className="arrow-icon">
                        <ArrowUpRight size={32} />
                    </div>
                </Link>

                <div className="card small-card">
                    <div style={{ textAlign: 'center', opacity: 0.2, fontSize: '1.4rem', fontStyle: 'italic', marginTop: '10px' }}>
                        Jonathan. OG
                    </div>
                    <div className="footer-label">
                        <div>
                            <span>CREDENTIALS</span>
                            <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Detailed CV</p>
                        </div>
                        <ArrowRight className="arrow-icon" />
                    </div>
                </div>
            </div>

            <section id="contact-banner">
                <h2>Want to work together?</h2>
                <p style={{ color: 'var(--text-dim)' }}>I'm currently looking for new opportunities.</p>
                <a href="mailto:ogunmuyiwajonathan@gmail.com" className="email-btn">
                    Send an Email
                </a>
            </section>
        </>
    );
}
