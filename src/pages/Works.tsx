import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import './Works.css';

export default function Works() {
    useEffect(() => {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => card.classList.add('animate-in'));
    }, []);

    return (
        <>
            <header className="page-header">
                <p
                    style={{
                        color: 'var(--accent-blue)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                >
                    Portfolio
                </p>
                <h1>
                    Check out my <br />
                    featured projects.
                </h1>
            </header>

            <div className="works-grid">
                <a
                    href="https://port-murex-tau.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                    style={{ animationDelay: '0.1s' }}
                >
                    <div className="img-box p1">
                        <img src="/port.png" alt="Portfolio Website" />
                    </div>
                    <div className="project-info">
                        <div className="project-meta">
                            <span>HTML / CSS / JS</span>
                            <h3>Portfolio Website</h3>
                        </div>
                        <div className="visit-btn">
                            <ArrowRight />
                        </div>
                    </div>
                </a>

                <a
                    href="https://stalworldtech.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                    style={{ animationDelay: '0.2s' }}
                >
                    <div className="img-box p2">
                        <img src="/graphic.png" alt="Stalworld Tech" />
                    </div>
                    <div className="project-info">
                        <div className="project-meta">
                            <span>React.js / Web Design</span>
                            <h3>Stalworld Tech</h3>
                        </div>
                        <div className="visit-btn">
                            <ArrowRight />
                        </div>
                    </div>
                </a>

                <a
                    href="https://tasty-crust.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                    style={{ animationDelay: '0.3s' }}
                >
                    <div className="img-box p3">
                        <img src="/crust.png" alt="Tasty Crust" />
                    </div>
                    <div className="project-info">
                        <div className="project-meta">
                            <span>Tailwind CSS / UI / UX</span>
                            <h3>Tasty Crust</h3>
                        </div>
                        <div className="visit-btn">
                            <ArrowRight />
                        </div>
                    </div>
                </a>

                <div
                    className="project-card"
                    style={{
                        animationDelay: '0.4s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderStyle: 'dashed',
                        minHeight: '200px'
                    }}
                >
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Upcoming Project...</p>
                </div>
            </div>
        </>
    );
}
