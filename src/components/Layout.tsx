import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CursorSpotlight from './CursorSpotlight';
import PageProgress from './PageProgress';
import Particles from './Particles';

const XIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="currentColor" className={className}>
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.6 318.1 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
);

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'auto';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    return (
        <div className="container relative min-h-screen">
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                {/* Realistic Earth — top-left corner, shiny and glowing */}
                <div 
                    className="absolute top-[-15vw] left-[-10vw] w-[45vw] -z-20 h-[45vw] overflow-hidden"
                    style={{
                        animation: 'earth-float 20s ease-in-out infinite alternate',
                    }}
                >
                    <img 
                        src="/70%.png" 
                        alt="Earth" 
                        className="w-full h-full object-contain opacity-90 transition-all"
                        style={{
                            filter: 'brightness(1.2) contrast(1.1)',
                        }}
                    />
                    {/* Shining Glow Overlay */}
                    {/* <div 
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
                        style={{
                            animation: 'earth-shimmer 8s linear infinite',
                        }}
                    /> */}
                </div>

                {/* Orbiting Moon Wrapper */}
                <div 
                    className="absolute"
                    style={{
                        top: '12.5vw',
                        left: '12.5vw',
                        width: '1px',
                        height: '1px',
                        animation: 'moon-orbit-container 45s linear infinite'
                    }}
                >
                    {/* The Moon Image */}
                    <div 
                        className="absolute rounded-full"
                        style={{
                            width: '4.5vw',
                            height: '4.5vw',
                            left: '26vw', // orbit radius
                            top: '-2.25vw', // center vertically on the orbit line
                            animation: 'moon-spin 20s linear infinite'
                        }}
                    >
                        <img 
                            src="/moon.png" 
                            alt="Moon" 
                            className="w-full h-full object-contain"
                            style={{
                                filter: 'brightness(1.5) drop-shadow(0 0 10px rgba(255,255,255,0.2))',
                            }}
                        />
                    </div>
                </div>


                <Particles
                    className="origin-center"
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleColors={["#ffffff", "#ffffff", "#ffffff"]}
                    moveParticlesOnHover={false}
                    particleHoverFactor={1}
                    alphaParticles={false}
                    particleBaseSize={150}
                    sizeRandomness={1}
                    cameraDistance={20}
                    disableRotation={false}
                />
            </div>
            <CursorSpotlight />
            <PageProgress />

            {/* Navbar */}
            <nav
                id="navbar"
                className="flex justify-between items-center mb-10 py-2.5 relative z-[1001] "
            >
                <NavLink
                    to="/"
                    className="font-bold text-2xl tracking-[-1.5px] text-white no-underline"
                >
                    Jonathan.
                </NavLink>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-10 list-none">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/about', label: 'About' },
                        { to: '/works', label: 'Works' },
                        { to: '/contact', label: 'Contact' },
                    ].map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-text-dim text-[0.85rem] font-medium transition-all ease-custom duration-500 
                                     hover:text-white ${isActive ? 'text-white' : ''}`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    <NavLink
                        to="/contact"
                        className="hidden md:block bg-[#1a1a1a] py-3 px-7 rounded-[14px] 
                                   text-white border border-border-color font-semibold text-[0.85rem] 
                                   transition-all ease-custom duration-500 
                                   hover:bg-white hover:text-black hover:-translate-y-[3px]"
                    >
                        Let's talk
                    </NavLink>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white p-1.5 z-[1002]"
                        onClick={() => {
                            const newState = !isMenuOpen;
                            setIsMenuOpen(newState);
                            document.body.style.overflow = newState ? 'hidden' : 'auto';
                        }}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center gap-10"
                    >
                        <button
                            className="absolute top-8 right-6 text-white p-2"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={32} />
                        </button>
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/about', label: 'About' },
                            { to: '/works', label: 'Works' },
                            { to: '/contact', label: 'Contact' },
                        ].map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `text-3xl font-bold tracking-widest transition-all duration-300 
                                     ${isActive ? 'text-white scale-110' : 'text-text-dim hover:text-white hover:scale-105'}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Glassmorphism Social Sidebar */}
            <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-6 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl z-[1000] shadow-[0_0_30px_rgba(0,100,255,0.15)]">
                {[
                    { icon: Github, href: "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                    { icon: XIcon, href: "https://twitter.com", label: "X (Twitter)" },
                    { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
                ].map((social, i) => {
                    const Icon = social.icon;
                    return (
                        <a
                            key={i}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            className="text-white/60 hover:text-white hover:scale-125 hover:-translate-x-1 transition-all duration-300"
                        >
                            <Icon size={22} strokeWidth={1.5} />
                        </a>
                    );
                })}
            </div>

            {/* Page Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>

            {/* Footer */}
            <footer className="mt-[100px] mb-[50px] pb-[50px] text-center">
                <NavLink
                    to="/"
                    className="font-bold text-[1.2rem] mb-[30px] block text-white no-underline"
                >
                    Jonathan.
                </NavLink>

                <ul className="flex justify-center gap-[30px] mb-[30px] list-none">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/about', label: 'About' },
                        { to: '/works', label: 'Works' },
                        { to: '/contact', label: 'Contact' },
                    ].map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                className="text-text-dim text-[0.75rem] uppercase tracking-[1px] 
                                           transition-all duration-300 hover:text-white"
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <p className="text-[0.75rem] text-[#444]">
                    © {new Date().getFullYear()} Jonathan Ogunmuyiwa. All rights reserved.
                </p>
            </footer>
        </div>
    );
}