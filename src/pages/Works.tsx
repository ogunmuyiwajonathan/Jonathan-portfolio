import { useEffect, useState } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, ExternalLink, X, Calendar, Tag } from 'lucide-react';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import SplitText from '../components/react-bits/SplitText';
import Skeleton from '../components/Skeleton';

interface Project {
    title: string;
    category: string;
    description: string;
    fullDescription: string;
    highlights: string[];
    image: string;
    link: string;
    gradient: string;
    accentColor: string;
    year: string;
}

const projects: Project[] = [
    {
        title: "Solibu Stories",
        category: "React / Three.js / Convex",
        description: "A digital story-reading platform for discovering, browsing, and reading books.",
        fullDescription: "Solibu Stories is a full-stack digital reading platform built with React, TypeScript, and Convex. It features a curated library with search and filtering, an in-browser reading experience with page navigation, immersive 3D book animations powered by Three.js and React Three Fiber, dark and sepia reading themes, an admin panel for managing books and users, and a favorites and reviews system.",
        highlights: [
            "3D book animations with Three.js and React Three Fiber",
            "Full-stack architecture with Convex backend and Clerk auth",
            "Dark and sepia reading themes for comfortable browsing",
            "Admin panel, favorites, and reviews system"
        ],
        image: "/images/solibu-full.webp",
        link: "https://solibu-stories.vercel.app/",
        gradient: "from-[#0d0d10] to-[#b1862f]",
        accentColor: "#b1862f",
        year: "2026"
    },
    {
        title: "LifeOS",
        category: "React / Productivity App",
        description: "A comprehensive AI-powered life operating system and productivity dashboard.",
        fullDescription: "LifeOS is an advanced productivity platform and dashboard. It includes various features like a Decision Engine powered by AI, comprehensive habit tracking, task management, journaling, and customizable widgets. Built with modern web technologies, it offers a beautifully designed, responsive, and intuitive interface to help users optimize their daily routines.",
        highlights: ["AI-powered Decision Engine integration", "Advanced habit and task tracking system", "Beautifully designed responsive dashboard", "Supabase authentication and data syncing"],
        image: "/images/lifeos-full.webp",
        link: "https://life-o-system.vercel.app/",
        gradient: "from-[#081a14] to-[#081a14]",
        accentColor: "#10b981",
        year: "2026"
    },
    {
        title: "Belleville Dental Care",
        category: "React / TypeScript",
        description: "A modern platform for a dental clinic featuring appointment scheduling and patient resources.",
        fullDescription: "Belleville Dental Care is a modern, highly-performant healthcare web application built with React and TypeScript. It features a complete appointment scheduling system, detailed service descriptions, a patient resources section, and a clean professional look that instills confidence in patients. TypeScript was used throughout for type safety and scalability.",
        highlights: ["Built with React and TypeScript for type-safe development", "Appointment scheduling and service description pages", "Patient resources and information hub", "Clean healthcare-grade UI design"],
        image: "/images/belleville-full.webp",
        link: "https://project-belleville-dental.vercel.app/",
        gradient: "from-[#2b5876] to-[#4e4376]",
        accentColor: "#4e4376",
        year: "2026"
    },
    {
        title: "Tasty Crust",
        category: "Tailwind CSS / UI / UX",
        description: "An appetizing and responsive restaurant web application with fluid visual styling.",
        fullDescription: "Tasty Crust is a fully responsive web application for a bakery and restaurant, designed with a strong focus on UI/UX quality. I used Tailwind CSS to build a pixel-perfect, appetizing interface that draws the user in. The project included menus, booking sections, and a cart experience — all styled for maximum visual appeal and ease of use.",
        highlights: ["Styled with Tailwind CSS for rapid, clean design", "Dedicated menu, booking & cart sections", "Strong UX focus with accessible color contrast", "Mobile-first, fully responsive layout"],
        image: "/images/crust-full.webp",
        link: "https://tasty-crust.vercel.app/",
        gradient: "from-[#f12711] to-[#f5af19]",
        accentColor: "#f12711",
        year: "2025"
    },
    {
        title: "Stalworld Tech",
        category: "React.js / Web Design",
        description: "A professional landing page and marketing site designed for Stalworld Tech.",
        fullDescription: "Stalworld Tech is a professional landing page and marketing site I designed and built from the ground up. The goal was to create a clean, modern experience that communicates the company's brand credibility and highlights their services. I focused on optimized conversion flows, responsive design, and smooth visual transitions using React.js.",
        highlights: ["Built with React.js for a dynamic experience", "Custom responsive UI with smooth transitions", "Optimized for conversions and visual branding", "Deployed live on Vercel"],
        image: "/images/graphic-full.webp",
        link: "https://stalworldtech.vercel.app/",
        gradient: "from-[#07424e] to-[#05706d]",
        accentColor: "#05706d",
        year: "2025"
    },
    {
        title: "Portfolio Website",
        category: "HTML / CSS / JS",
        description: "My very first website — a personal portfolio built to kickstart my journey as a developer.",
        fullDescription: "This was my very first website, marking the beginning of my journey as a developer. I built it from scratch using pure HTML, CSS, and JavaScript — no frameworks, no shortcuts. It taught me the fundamentals of web structure, responsive design, and user experience. This project holds a special place as the foundation of everything I've built since.",
        highlights: ["First-ever website built from scratch", "Pure HTML, CSS & JavaScript — no frameworks", "Responsive layout for all screen sizes", "Deployed and live on Vercel"],
        image: "/images/port-full.webp",
        link: "https://port-murex-tau.vercel.app/",
        gradient: "from-[#1e1e1e] to-[#333333]",
        accentColor: "#6b7280",
        year: "2025"
    },
];

export default function Works() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    usePageTitle('Works');
    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const cards = document.querySelectorAll('.animate-on-load');
            cards.forEach((card, index) => {
                (card as HTMLElement).style.opacity = '0';
                (card as HTMLElement).style.transform = 'translateY(20px)';
                setTimeout(() => {
                    (card as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    (card as HTMLElement).style.opacity = '1';
                    (card as HTMLElement).style.transform = 'translateY(0)';
                }, 100 * (index + 1));
            });
        }
    }, [isLoading]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    return (
        <div className="pt-10 mb-[60px]">
            <header className="mb-10">
                {/* <BlurText
                    text="Portfolio"
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="text-accent-blue font-semibold text-[0.8rem] uppercase tracking-[2px] mb-2"
                /> */}
                <SplitText
                    text="Check out my featured projects."
                    className="text-[clamp(2.2rem,5vw,4rem)] font-bold tracking-tight leading-[1.1] text-foreground"
                    delay={200}
                    animationFrom={{ opacity: 0, y: 40 }}
                    animationTo={{ opacity: 1, y: 0 }}
                    stagger={0.03}
                />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    // Skeleton Grid
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={`skeleton-${i}`} className="p-6 flex flex-col h-[500px] border border-white/5 rounded-[30px] bg-white/5">
                            <Skeleton className="w-full h-[260px] rounded-[20px] mb-6" />
                            <Skeleton className="w-1/4 h-3 mb-4 rounded-full" />
                            <Skeleton className="w-3/4 h-8 mb-4 rounded-lg" />
                            <Skeleton className="w-full h-20 mb-6 rounded-lg" />
                            <div className="flex gap-3 mt-auto">
                                <Skeleton className="w-32 h-10 rounded-full" />
                                <Skeleton className="w-32 h-10 rounded-full" />
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        {projects.map((project, i) => (
                        <div key={i} className="group flex flex-col h-full animate-on-load">
                            <SpotlightCard className="p-6 flex flex-col h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-[#1f1f1f]/80 sm:p-8">
                                {/* Image */}
                                <div className={`w-full h-[220px] sm:h-[260px] rounded-[20px] overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-tr ${project.gradient}`}>
                                    <img
                                        src={project.image}
                                        srcSet={`${project.image.replace('-full.', '-300w.')} 300w, ${project.image.replace('-full.', '-600w.')} 600w, ${project.image} 1024w`}
                                        sizes="(max-width: 768px) calc(100vw - 48px), calc((1140px - 48px) / 2)"
                                        alt={project.title}
                                        width={400}
                                        height={260}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Category & Title */}
                                <span className="text-[0.7rem] text-text-dim uppercase tracking-[1px] font-bold mb-1">
                                    {project.category}
                                </span>
                                <h3 className="text-[1.4rem] font-bold text-foreground mb-3">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-text-dim text-[0.9rem] leading-relaxed mb-6">
                                    {project.description}
                                </p>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex items-center gap-2 px-5 py-2.5 text-white rounded-full text-[0.8rem] font-bold transition-all duration-300 hover:scale-105 overflow-hidden group/btn shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30" style={{ backgroundColor: project.accentColor }}
                                    >
                                        <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                                            <ExternalLink size={14} className="transition-transform duration-300 group-hover/btn:rotate-[-12deg] group-hover/btn:scale-110" />
                                            View Website
                                        </span>
                                        <span
                                            className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                                            style={{
                                                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)"
                                            }}
                                        />
                                    </a>
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="relative flex items-center gap-2 px-5 py-2.5 border border-white/10 text-text-dim rounded-full text-[0.8rem] font-bold transition-all duration-300 hover:border-white/30 hover:text-foreground hover:scale-105 cursor-pointer overflow-hidden group/btn"
                                    >
                                        <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                                            Read More
                                            <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                                        </span>
                                        <span
                                            className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                                            style={{
                                                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)"
                                            }}
                                        />
                                    </button>
                                </div>
                            </SpotlightCard>
                        </div>
                        ))}
                        
                        {/* Coming Soon Card */}
                        <div className="group flex flex-col h-full animate-on-load">
                            <SpotlightCard className="p-6 flex flex-col h-full transition-all duration-500 sm:p-8 items-center justify-center min-h-[350px] border-dashed border-2 border-white/10 bg-transparent opacity-60 hover:opacity-100 hover:border-white/30">
                                <div className="text-center space-y-4">
                                    <div className="text-5xl mb-4">??</div>
                                    <h3 className="text-[1.4rem] font-bold text-foreground">More Projects Coming Soon</h3>
                                    <p className="text-text-dim text-[0.9rem] max-w-[250px] mx-auto">
                                        I'm constantly working on new ideas and experiments. Check back later!
                                    </p>
                                </div>
                            </SpotlightCard>
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[28px] overflow-y-auto shadow-2xl max-h-[85vh]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Image - compact strip */}
                        <div className={`w-full h-[100px] bg-gradient-to-tr ${selectedProject.gradient} flex items-center justify-center overflow-hidden`}>
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                width={400}
                                height={100}
                                loading="lazy"
                                decoding="async"
                                className="h-full object-contain"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10"
                        >
                            <X size={18} />
                        </button>

                        {/* Modal Content */}
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[0.7rem] text-accent-blue font-bold tracking-[2px] uppercase">
                                    {selectedProject.category}
                                </span>
                                <span className="w-1 h-1 bg-text-dim rounded-full" />
                                <span className="text-[0.7rem] text-text-dim flex items-center gap-1">
                                    <Calendar size={11} /> {selectedProject.year}
                                </span>
                            </div>

                            <h2 className="text-[1.4rem] font-bold text-white mb-3">
                                {selectedProject.title}
                            </h2>

                            <p className="text-text-dim leading-relaxed mb-4 text-[0.85rem]">
                                {selectedProject.fullDescription}
                            </p>

                            {/* Highlights */}
                            <div className="mb-4">
                                <p className="text-[0.7rem] text-text-dim font-bold uppercase tracking-[2px] mb-3 flex items-center gap-2">
                                    <Tag size={11} /> Project Highlights
                                </p>
                                <ul className="space-y-2">
                                    {selectedProject.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[0.9rem] text-white/80">
                                            <span className="text-accent-blue mt-1.5 shrink-0">?</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative flex items-center justify-center gap-2 w-full py-3 text-white rounded-full font-bold text-[0.9rem] transition-all hover:scale-[1.02] overflow-hidden group/btn shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30" style={{ backgroundColor: selectedProject.accentColor }}
                            >
                                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                                    <ExternalLink size={16} className="transition-transform duration-300 group-hover/btn:rotate-[-12deg] group-hover/btn:scale-110" />
                                    Visit {selectedProject.title}
                                </span>
                                <span
                                    className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"
                                    style={{
                                        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)"
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
