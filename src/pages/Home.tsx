import { Link } from 'react-router-dom';
import {
    ShieldCheck, FolderKanban, ArrowUpRight, Sparkle,
    Code2, Palette, Zap, Globe, Database, Smartphone
} from 'lucide-react';
import { FaHtml5, FaJava, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiJavascript } from 'react-icons/si';
import { Linkedin, Github } from 'lucide-react';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import SplitText from '@/components/react-bits/SplitText';
import BlurText from '@/components/react-bits/BlurText';
import Skeleton from '@/components/Skeleton';
import { useState, useEffect } from 'react';

const techStack = [
    { icon: <FaHtml5 size={30} />, label: 'HTML/CSS', color: 'text-[#e34f26]' },
    { icon: <SiTailwindcss size={30} />, label: 'Tailwind', color: 'text-[#38bdf8]' },
    { icon: <SiJavascript size={30} />, label: 'JavaScript', color: 'text-[#f7df1e]' },
    { icon: <SiTypescript size={30} />, label: 'TypeScript', color: 'text-[#3178c6]' },
    { icon: <FaReact size={30} />, label: 'React', color: 'text-[#61dafb]' },
    { icon: <FaJava size={30} />, label: 'Java', color: 'text-foreground' },
];

const services = [
    { icon: <Globe size={24} />, title: 'Full Stack Web', desc: 'React, Node, Scale' },
    { icon: <Palette size={24} />, title: 'UX Strategy', desc: 'Interface, Figma' },
    { icon: <Database size={24} />, title: 'Data Design', desc: 'SQL, NoSQL Hub' },
    { icon: <Smartphone size={24} />, title: 'App Precision', desc: 'Mobile-Optimized' },
];

const skills = [
    { label: 'Frontend Architecture', level: '95%' },
    { label: 'Backend Systems', level: '85%' },
    { label: 'Database & Cloud', level: '80%' },
    { label: 'UI/UX Design Strategy', level: '90%' },
];

const marqueeItems = [
    "Full Stack Development", "UI/UX Design", "React",
    "Database Architecture", "API Development", "Performance Optimization"
];

const socials = [
    { href: "https://linkedin.com/in/ogunmuyiwajonathan", icon: <Linkedin size={22} />, label: "LinkedIn" },
    { href: "https://github.com/ogunmuyiwajonathan", icon: <Github size={22} />, label: "GitHub" },
    {
        href: "https://wa.me/2349157384644",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        label: "WhatsApp"
    }
];

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 gap-6 mb-24 lg:grid-cols-4">
                        <Skeleton className="lg:col-span-3 lg:row-span-2 h-[450px] rounded-[50px]" />
                        <Skeleton className="h-[250px] rounded-[30px]" />
                        <Skeleton className="h-[250px] rounded-[30px]" />
                        <Skeleton className="lg:col-span-full h-[60px] rounded-full mt-4" />
                        <Skeleton className="lg:col-span-2 h-[200px] rounded-[30px]" />
                        <Skeleton className="lg:col-span-1 h-[200px] rounded-[30px]" />
                        <Skeleton className="lg:col-span-1 h-[200px] rounded-[30px]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 gap-6 mb-24 lg:grid-cols-4">

                    {/* ── ROW 1 ─────────────────────────────────────────────────────
               [  Hero (col-span-2, row-span-2)  ] [ About ] [ Works ]
               [  Hero (continued)               ] [ Marquee (col-span-2) ]
          ─────────────────────────────────────────────────────────────── */}

                    {/* Hero Card — fixed padding & layout so nothing is muffled */}
                    <SpotlightCard className="lg:col-span-3 lg:row-span-2 p-10 md:p-14 flex items-center group relative overflow-hidden">
                        {/* Ambient glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-transparent pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:text-left text-center w-full">

                            {/* Avatar */}
                            <div className="shrink-0 w-[190px] h-[190px]
                bg-gradient-to-br from-accent-blue to-accent-blue-light
                rounded-[50px_0_50px_0] overflow-hidden
                shadow-[0_20px_60px_hsl(var(--accent-blue)/0.35)]
                transition-transform duration-700 group-hover:scale-[1.04]
                mx-auto md:mx-0">
                                <img
                                    src="/image.png"
                                    alt="Jonathan Ogunmuyiwa"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text block */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <BlurText
                                    text="Full Stack Developer & UI Designer"
                                    delay={150}
                                    animateBy="words"
                                    direction="top"
                                    className="text-[0.68rem] uppercase tracking-[3px] text-accent-blue font-bold mb-4 leading-relaxed"
                                />

                                <SplitText
                                    text="Jonathan."
                                    className="text-[clamp(2.4rem,5vw,3.4rem)] leading-[1.05] mb-5 font-bold text-foreground"
                                    delay={300}
                                    animationFrom={{ opacity: 0, y: 40 }}
                                    animationTo={{ opacity: 1, y: 0 }}
                                    stagger={0.03}
                                />

                                <p className="text-muted-foreground text-[0.95rem] leading-[1.75] max-w-[420px]">
                                    I craft high-performance digital experiences that bridge
                                    the gap between technical excellence and intuitive design.
                                </p>

                                <div className="flex flex-wrap gap-3 mt-7 justify-center md:justify-start">
                                    <span className="px-4 py-1.5 bg-accent-blue/10 text-accent-blue
                    border border-accent-blue/20 rounded-full text-[0.7rem] font-bold whitespace-nowrap">
                                        ● Available Now
                                    </span>
                                    <span className="px-4 py-1.5 bg-secondary text-muted-foreground
                    border border-border rounded-full text-[0.7rem] font-bold whitespace-nowrap">
                                        🌍 Remote Worldwide
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* About Card */}
                    <Link to="/about" className="group h-full">
                        <SpotlightCard className="h-full flex flex-col p-8 transition-all duration-500 hover:-translate-y-1.5">
                            <div className="mb-8 text-foreground/80 transition-transform duration-500 group-hover:scale-110 w-fit">
                                <ShieldCheck size={48} strokeWidth={1} />
                            </div>
                            <span className="text-[0.65rem] text-muted-foreground uppercase tracking-[2px] mb-2 font-bold">
                                DISCOVER MORE
                            </span>
                            <div className="text-xl font-bold mt-auto flex justify-between items-center text-foreground">
                                About Me
                            </div>
                            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                                Technical expertise & professional journey.
                            </p>
                        </SpotlightCard>
                    </Link>

                    {/* Works Card */}
                    <Link to="/works" className="group h-full">
                        <SpotlightCard className="h-full flex flex-col p-8 transition-all duration-500 hover:-translate-y-1.5">
                            <div className="mb-8 text-foreground/80 transition-transform duration-500 group-hover:scale-110 w-fit">
                                <FolderKanban size={48} strokeWidth={1} />
                            </div>
                            <span className="text-[0.65rem] text-muted-foreground uppercase tracking-[2px] mb-2 font-bold">
                                PORTFOLIO
                            </span>
                            <div className="text-xl font-bold mt-auto flex justify-between items-center text-foreground">
                                My Works
                            </div>
                            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                                A collection of precision-built applications.
                            </p>
                        </SpotlightCard>
                    </Link>

                    {/* Marquee — col-span-2 sits beside the hero's second row */}
                    <SpotlightCard className="card lg:col-span-full py-4 px-8 rounded-full overflow-hidden self-center">
                        <div className="flex animate-scroll whitespace-nowrap gap-10">
                            {[...marqueeItems, ...marqueeItems].map((text, i) => (
                                <span
                                    key={i}
                                    className="text-[0.7rem] uppercase tracking-[2px] text-muted-foreground flex items-center gap-3 font-bold"
                                >
                                    ✦ {text}
                                </span>
                            ))}
                        </div>
                    </SpotlightCard>

                    {/* ── ROW 3 ─────────────────────────────────────────────────────
               [ Tech Stack (col-span-2) ] [ Socials ] [ Stats ]
          ─────────────────────────────────────────────────────────────── */}

                    {/* Tech Stack */}
                    <SpotlightCard className="card lg:col-span-2 p-8 hover:bg-secondary transition-all duration-500 group">
                        <Link to="/about#specialize">
                            <div className="grid grid-cols-6 gap-5 mb-8">
                                {techStack.map(({ icon, label, color }) => (
                                    <div
                                        key={label}
                                        className={`flex justify-center transition-all duration-300 group-hover:scale-110 ${color}`}
                                        title={label}
                                    >
                                        {icon}
                                    </div>
                                ))}
                            </div>
                            <div className="text-xl font-bold flex justify-between items-center text-foreground">
                                Core Arsenal
                            </div>
                            <span className="flex group-hover:text-accent-blue justify-between items-center">
                                <p className="text-muted-foreground text-sm mt-2">
                                    Specialized in modern, highly efficient technology stacks.
                                </p>
                                <ArrowUpRight
                                    size={20}
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </span>
                        </Link>
                    </SpotlightCard>

                    {/* Socials */}
                    <SpotlightCard className="lg:col-span-1 p-8 flex flex-col justify-between group h-full">
                        <div className="flex gap-3 flex-wrap">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.label}
                                    className="w-11 h-11 border border-border rounded-full flex items-center justify-center
                    text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-110"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <div className="mt-6 ">
                            <span className="text-[0.65rem] text-muted-foreground uppercase tracking-[2px] mb-2 block font-bold">
                                CONNECT
                            </span>
                            <Link
                                to="/contact"
                                className="text-xl font-bold flex justify-between items-center
                  text-foreground group-hover:text-accent-blue transition-colors"
                            >
                                Profiles
                                <ArrowUpRight
                                    size={20}
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </Link>
                        </div>
                    </SpotlightCard>

                    {/* Stats */}
                    <SpotlightCard className="lg:col-span-1 p-8 flex flex-col justify-center gap-7 h-full">
                        {[
                            { value: '04+', label: 'Years of Impact' },
                            { value: '05+', label: 'Live Deployments' },
                        ].map(({ value, label }) => (
                            <div key={label}>
                                <h3 className="text-4xl font-bold text-foreground leading-none tracking-tight">
                                    {value}
                                </h3>
                                <span className="text-[0.65rem] text-muted-foreground uppercase tracking-[2px] font-bold block mt-1.5">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </SpotlightCard>

                    {/* ── ROW 4 ─────────────────────────────────────────────────────
               [ Services (col-span-2) ] [ Skills (col-span-2) ]
          ─────────────────────────────────────────────────────────────── */}

                    {/* Services */}
                    <SpotlightCard className="card lg:col-span-2 p-8">
                        <div className="text-[0.7rem] font-bold text-muted-foreground tracking-[2px] mb-8 flex items-center gap-2">
                            <Zap size={14} className="text-accent-blue" /> SYSTEM ARCHITECTURE
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {services.map((service) => (
                                <div key={service.title} className="flex flex-col gap-2">
                                    <div className="text-accent-blue">{service.icon}</div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground">{service.title}</h4>
                                        <p className="text-muted-foreground text-xs mt-1">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>

                    {/* Skills */}
                    <SpotlightCard className="card lg:col-span-2 p-8">
                        <div className="text-[0.7rem] font-bold text-muted-foreground tracking-[2px] mb-8 flex items-center gap-2">
                            <Code2 size={14} className="text-accent-blue" /> MASTERY LEVELS
                        </div>
                        <div className="space-y-5">
                            {skills.map((skill) => (
                                <div key={skill.label}>
                                    <div className="flex justify-between text-sm mb-1.5 font-bold">
                                        <span className="text-foreground">{skill.label}</span>
                                        <span className="text-accent-blue tabular-nums">{skill.level}</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent-blue to-accent-blue-light
                        rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: skill.level }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>

                    {/* ── ROW 5 ─────────────────────────────────────────────────────
               [ CTA (col-span-4) ]
          ─────────────────────────────────────────────────────────────── */}

                    {/* CTA */}
                    <SpotlightCard
                        className="glass-card lg:col-span-4 p-10 md:p-16 group relative
              overflow-hidden transition-all duration-700 hover:scale-[1.005]"
                    >
                        <Link to="/contact">
                            <Sparkle className="absolute top-8 left-8 opacity-10 text-foreground" size={80} />
                            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-blue/5 rounded-full
              blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row justify-between
              items-center gap-10 text-center md:text-left">
                                <div className="flex-1">
                                    <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05]
                  tracking-tight text-foreground m-0">
                                        Partnering for <br />
                                        the <span className="text-muted-foreground">Extraordinary.</span>
                                    </h2>
                                    <p className="text-muted-foreground text-base mt-5 max-w-[500px] leading-relaxed">
                                        I'm currently accepting select freelance partnerships and collaborative ventures.
                                        Let's build something that matters.
                                    </p>
                                </div>
                                <div className="w-20 h-20 rounded-full border border-border text-foreground flex items-center
  justify-center transition-all duration-500 shrink-0
  group-hover:scale-110 group-hover:bg-foreground group-hover:text-background shadow-2xl">
                                    <ArrowUpRight size={36} strokeWidth={2} />
                                </div>
                            </div>
                        </Link>
                    </SpotlightCard>

                </div>
            </div>
        </div>
    );
}