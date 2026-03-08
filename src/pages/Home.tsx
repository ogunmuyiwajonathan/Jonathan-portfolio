import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    FolderKanban,
    Figma,
    Code2,
    Layers,
    Monitor,
    Twitter,
    Linkedin,
    ArrowUpRight,
    Sparkle
} from 'lucide-react';
import './Home.css';

export default function Home() {
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
        <div className="bento-grid">
            {/* Hero Card */}
            <div className="card item-hero">
                <div className="profile-img-box">
                    <img src="/image.png" alt="Jonathan" />
                </div>
                <div className="hero-text">
                    <span className="subtitle">A full stack Developer</span>
                    <h1>Jonathan Ogunmuyiwa.</h1>
                    <p>Building high-end digital products with focus on user experience and visual design.</p>
                </div>
            </div>

            {/* Credentials */}
            <Link to="/about" className="card item-credentials">
                <div style={{ padding: '10px 0 20px 0', color: '#fff', opacity: 0.9 }}>
                    <ShieldCheck size={48} strokeWidth={1} />
                </div>
                <span className="card-label">MORE ABOUT ME</span>
                <div className="card-title">
                    Credentials <ArrowUpRight className="arrow-btn" size={18} />
                </div>
            </Link>

            {/* Projects */}
            <Link to="/works" className="card item-projects">
                <div style={{ padding: '10px 0 20px 0', color: '#fff', opacity: 0.9 }}>
                    <FolderKanban size={48} strokeWidth={1} />
                </div>
                <span className="card-label">SHOWCASE</span>
                <div className="card-title">
                    Projects <ArrowUpRight className="arrow-btn" size={18} />
                </div>
            </Link>

            {/* Marquee Row */}
            <div className="card item-marquee">
                <div className="marquee-inner">
                    <div className="marquee-content">
                        <span>LATEST WORK AND FEATURED ✦</span>
                        <span>LATEST WORK AND FEATURED ✦</span>
                        <span>LATEST WORK AND FEATURED ✦</span>
                        <span>LATEST WORK AND FEATURED ✦</span>
                        <span>LATEST WORK AND FEATURED ✦</span>
                        <span>LATEST WORK AND FEATURED ✦</span>
                    </div>
                </div>
            </div>

            {/* Services */}
            <Link to="/about#specialize" className="card item-services">
                <div className="icons-row">
                    <Figma size={32} />
                    <Code2 size={32} />
                    <Layers size={32} />
                    <Monitor size={32} />
                </div>
                <span className="card-label">SPECIALIZATION</span>
                <div className="card-title">
                    Services Offering <ArrowUpRight className="arrow-btn" size={18} />
                </div>
            </Link>

            {/* Socials */}
            <Link to="/contact" className="card item-socials">
                <div className="social-circles">
                    <div className="social-circle">
                        <Twitter size={18} />
                    </div>
                    <div className="social-circle">
                        <Linkedin size={18} />
                    </div>
                </div>
                <span className="card-label">STAY CONNECTED</span>
                <div className="card-title">
                    Profiles <ArrowUpRight className="arrow-btn" size={18} />
                </div>
            </Link>

            {/* Stats/Extra */}
            <div className="card item-stats">
                <div style={{ marginBottom: '10px' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 700 }}>04+</h1>
                    <span className="card-label" style={{ margin: 0 }}>
                        Years Experience
                    </span>
                </div>
                <div style={{ marginTop: '15px' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 700 }}>20+</h1>
                    <span className="card-label" style={{ margin: 0 }}>
                        Projects Done
                    </span>
                </div>
            </div>

            {/* CTA Section */}
            <Link to="/contact" className="card item-cta">
                <Sparkle className="sparkle-icon" size={60} />
                <h2>
                    Let's work <br /> <span className="accent">together.</span>
                </h2>
                <div className="cta-footer">
                    <span className="card-label" style={{ margin: 0 }}>
                        Contact Me
                    </span>
                    <ArrowUpRight className="arrow-btn" size={32} />
                </div>
            </Link>
        </div>
    );
}
