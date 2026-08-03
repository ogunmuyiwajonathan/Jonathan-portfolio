import { Link } from 'react-router-dom';
import {
    Sparkles,
    Bot,
    Briefcase,
    GraduationCap,
    Linkedin,
    Github,
    ArrowRight,
    ArrowUpRight,
    Code2,
    Palette,
    Lightbulb,
    Rocket,
    Target,
    Users,
    Zap,
    Award,
    BookOpen,
    Heart,
    X
} from 'lucide-react';
import { FaReact, FaJava, FaFigma, FaHtml5, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiTypescript, SiMongodb, SiJavascript, SiNextdotjs,SiPython, SiDart, SiFlutter } from 'react-icons/si';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import BlurText from '../components/react-bits/BlurText';
import Skeleton from '../components/Skeleton';
import { useState, useEffect, useRef } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';


export default function About() {
    const [isLoading, setIsLoading] = useState(true);
    usePageTitle('About');
    const [educationExpanded, setEducationExpanded] = useState(false);
    const [experienceExpanded, setExperienceExpanded] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
    const experienceScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!educationExpanded) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setEducationExpanded(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [educationExpanded]);

    useEffect(() => {
        if (!experienceExpanded) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setExperienceExpanded(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [experienceExpanded]);

    useEffect(() => {
        if (!experienceExpanded && experienceScrollRef.current) {
            experienceScrollRef.current.scrollTop = 0;
        }
    }, [experienceExpanded]);

    useEffect(() => {
        if (educationExpanded || experienceExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [educationExpanded, experienceExpanded]);

    const SKILLS_LIMIT = 15;

    const techSkills = [
        { icon: <FaHtml5 size={26} className="text-[#e34f26]" />, label: "HTML/CSS", title: "HTML5 & CSS3" },
        { icon: <SiTailwindcss size={26} className="text-[#38bdf8]" />, label: "Tailwind", title: "Tailwind CSS" },
        { icon: <SiJavascript size={28} className="text-[#f7df1e]" />, label: "JavaScript", title: "JavaScript ES6+" },
        { icon: <SiTypescript size={28} className="text-[#3178c6]" />, label: "TypeScript", title: "TypeScript" },
        { icon: <FaReact size={26} className="text-[#61dafb]" />, label: "React", title: "React.js" },
        { icon: <SiNextdotjs size={26} className="text-white" />, label: "Next.js", title: "Next.js" },
        { icon: <FaNodeJs size={26} className="text-[#339933]" />, label: "Node.js", title: "Node.js" },
        { icon: <FaJava size={26} className="text-[#f89820]" />, label: "Java", title: "Java" },
        { icon: <SiMysql size={26} className="text-[#00758f]" />, label: "MySQL", title: "MySQL" },
        { icon: <SiMongodb size={26} className="text-[#00ed64]" />, label: "MongoDB", title: "MongoDB" },
        { icon: <FaFigma size={26} className="text-[#f24e1e]" />, label: "Figma", title: "Figma" },
        { icon: <SiPython size={26} className="text-[#f05032]" />, label: "Python", title: "Python" },
        { icon: <SiDart size={26} className="text-[#0175C2]" />, label: "Dart", title: "Dart" },
        { icon: <SiFlutter size={26} className="text-[#55C6F8]" />, label: "Flutter", title: "Flutter" },
    ];

    const hiddenSkillsCount = techSkills.length - SKILLS_LIMIT;

    const toggleReadMore = (title: string) => {
        setExpandedServices(prev => {
            const next: Record<string, boolean> = {};
            for (const key of Object.keys(prev)) next[key] = false;
            next[title] = !prev[title];
            return next;
        });
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-6 mb-[60px] lg:grid-cols-4">
                <Skeleton className="lg:col-span-1 h-[400px] rounded-[30px]" />
                <Skeleton className="lg:col-span-3 h-[400px] rounded-[30px]" />
                <Skeleton className="lg:col-span-2 h-[300px] rounded-[30px]" />
                <Skeleton className="lg:col-span-2 h-[300px] rounded-[30px]" />
                <Skeleton className="lg:col-span-2 h-[400px] rounded-[30px]" />
                <Skeleton className="lg:col-span-2 h-[400px] rounded-[30px]" />
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-6 mb-[60px] lg:grid-cols-4">
                {/* Profile Image Card */}
                <SpotlightCard className="lg:col-span-1 !p-0 bg-gradient-to-br from-[#2ea9ff] to-[#0056b3] h-[320px] lg:h-auto overflow-hidden group border border-border-color rounded-[30px]" spotlightColor="rgba(46, 169, 255, 0.2)">
                    <img src="/images/profile.webp" alt="Jonathan Ogunmuyiwa - Full Stack Developer" width={400} height={500} loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover block transition-all duration-[800ms] group-hover:scale-110" />
                </SpotlightCard>

                {/* Self Summary Card */}
                <SpotlightCard className="card lg:col-span-3">
                    <div className="flex items-center gap-[10px] text-[0.75rem] font-[800] uppercase tracking-[2px] text-accent-blue mb-[5px]">
                        <Sparkles size={16} /> SELF-SUMMARY
                    </div>
                    <BlurText
                        text="Jonathan Ogunmuyiwa"
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-[clamp(1.6rem,5vw,2.2rem)] mt-[15px] font-bold leading-[1.2] text-white"
                    />
                    <p className="text-text-dim text-[1rem] max-w-[550px] mt-[12px] leading-relaxed">
                        I am a passionate software engineer and designer located in Nigeria. I focus on creating outstanding digital experiences that connect beauty and function. I have a sharp eye for detail and a strong grasp of modern web technologies. I specialize in building high-performance web applications that not only meet user expectations but also surpass them.
                    </p>
                    <p className="text-text-dim text-[1rem] max-w-[550px] mt-[12px] leading-relaxed">
                        My journey in tech started with a curiosity about how things work online. This quickly turned into a professional goal of achieving excellence in software development. Now, I combine my technical skills with creative problem-solving to provide solutions that support business growth and enhance user satisfaction.
                    </p>
                </SpotlightCard>

                {/* Experience Card - click to bring forward and scroll full content */}
                <div
                    className={`lg:col-span-2 ${experienceExpanded ? 'min-h-[min(88vh,680px)]' : ''}`}
                    id="specialize"
                >
                    {experienceExpanded && (
                        <button
                            type="button"
                            aria-label="Close experience details"
                            className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-[2px] cursor-default"
                            onClick={() => setExperienceExpanded(false)}
                        />
                    )}
                    <div
                        role={experienceExpanded ? undefined : 'button'}
                        tabIndex={experienceExpanded ? -1 : 0}
                        aria-expanded={experienceExpanded}
                        aria-label={experienceExpanded ? undefined : 'Expand experience section'}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!experienceExpanded) setExperienceExpanded(true);
                        }}
                        onKeyDown={(e) => {
                            if (!experienceExpanded && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                setExperienceExpanded(true);
                            }
                        }}
                        className={`rounded-[30px] outline-none transition-shadow ${
                            experienceExpanded ? 'cursor-default' : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-blue/50'
                        }`}
                    >
                        <SpotlightCard
                            className={`card flex min-h-0 flex-col transition-all duration-300 ease-out ${
                                experienceExpanded
                                    ? '!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-[100] w-[min(92vw,560px)] max-h-[min(88vh,680px)] !overflow-hidden shadow-2xl ring-1 ring-accent-blue/25'
                                    : 'hover:ring-1 hover:ring-white/10'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3 mb-[25px] shrink-0">
                                <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] flex items-center gap-[8px]">
                                    <Briefcase size={14} /> PROFESSIONAL EXPERIENCE
                                </div>
                                {experienceExpanded && (
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        className="shrink-0 rounded-lg p-1.5 text-text-dim hover:bg-white/10 hover:text-white transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExperienceExpanded(false);
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                            <div
                                ref={experienceScrollRef}
                                className={`space-y-6 min-h-0 ${
                                    experienceExpanded
                                        ? 'min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 -mr-1 [scrollbar-gutter:stable]'
                                        : 'max-h-[220px] overflow-hidden'
                                }`}
                            >
                                <div className="border-l-2 border-accent-blue pl-4">
                                    <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2026 - Present</div>
                                    <div className="font-semibold text-[1.1rem] text-white">Full Stack Developer (Part Time)</div>
                                    <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                        At Stalworld Tech I work part-time building and maintaining full stack web applications, handling both the frontend and the backend to ensure reliable and scalable features are delivered.
                                    </div>
                                </div>
                                <div className="border-l-2 border-border-color pl-4">
                                    <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2024 - Present</div>
                                    <div className="font-semibold text-[1.1rem] text-white">Freelance Full Stack Developer</div>
                                    <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                        We created modern digital products for clients all around the world. Our specialty lies in React-based applications, responsive design systems, and scalable backend solutions. Projects have been successfully completed with 100% client satisfaction.
                                    </div>
                                </div>
                                <div className="border-l-2 border-border-color pl-4">
                                    <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2023 - 2024</div>
                                    <div className="font-semibold text-[1.1rem] text-white">Junior Web Developer</div>
                                    <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                        Worked alongside multi-departmental teams to develop and maintain web applications, and acquired practical experience in using modern JavaScript frameworks, RESTful APIs, and database management systems.
                                    </div>
                                </div>
                            </div>
                            {!experienceExpanded && (
                                <p className="text-[0.7rem] text-accent-blue/90 mt-4 text-center font-medium tracking-wide shrink-0">
                                    Click to expand — scroll for full details
                                </p>
                            )}
                        </SpotlightCard>
                    </div>
                </div>

                {/* Education Card - click to bring forward and scroll full content */}
                <div
                    className={`lg:col-span-2 ${educationExpanded ? 'min-h-[min(88vh,680px)]' : ''}`}
                >
                    {educationExpanded && (
                        <button
                            type="button"
                            aria-label="Close education details"
                            className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-[2px] cursor-default"
                            onClick={() => setEducationExpanded(false)}
                        />
                    )}
                    <div
                        role={educationExpanded ? undefined : 'button'}
                        tabIndex={educationExpanded ? -1 : 0}
                        aria-expanded={educationExpanded}
                        aria-label={educationExpanded ? undefined : 'Expand education section'}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!educationExpanded) setEducationExpanded(true);
                        }}
                        onKeyDown={(e) => {
                            if (!educationExpanded && (e.key === 'Enter' || e.key === ' ')) {
                                e.preventDefault();
                                setEducationExpanded(true);
                            }
                        }}
                        className={`rounded-[30px] outline-none transition-shadow ${
                            educationExpanded ? 'cursor-default' : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-blue/50'
                        }`}
                    >
                    <SpotlightCard
                        className={`card flex min-h-0 flex-col transition-all duration-300 ease-out ${
                            educationExpanded
                                ? '!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 z-[100] w-[min(92vw,560px)] max-h-[min(88vh,680px)] !overflow-hidden shadow-2xl ring-1 ring-accent-blue/25'
                                : 'hover:ring-1 hover:ring-white/10'
                        }`}
                    >
                        <div className="flex items-start justify-between gap-3 mb-[20px] shrink-0">
                            <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] flex items-center gap-[8px]">
                                <GraduationCap size={14} /> EDUCATION & CERTIFICATIONS
                            </div>
                            {educationExpanded && (
                                <button
                                    type="button"
                                    aria-label="Close"
                                    className="shrink-0 rounded-lg p-1.5 text-text-dim hover:bg-white/10 hover:text-white transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEducationExpanded(false);
                                    }}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <div
                            className={`space-y-6 min-h-0 ${
                                educationExpanded
                                    ? 'min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 -mr-1 [scrollbar-gutter:stable]'
                                    : 'max-h-[220px] overflow-hidden'
                            }`}
                        >
                            <div className="border-l-2 border-accent-blue pl-4">
                                <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2024 - 2027</div>
                                <div className="font-semibold text-[1.1rem] text-white">ADSE, Advanced Software Engineering</div>
                                <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                    Currently pursuing a Diploma in Software Development and Artificial Intelligence at Aptech Computer Education.
                                </div>
                                <p className="text-text-dim text-[0.85rem] mt-3 leading-relaxed">
                                    Building practical skills in Web Development, Python, React, Java, TypeScript, JavaScript, Mobile Apps, Database Management, and AI Integration.
                                </p>
                                <p className="text-text-dim text-[0.85rem] mt-2 leading-relaxed">
                                    Gaining hands-on experience through projects in responsive web applications, Python automation scripts, mobile apps, and AI chatbots.
                                </p>
                            </div>
                            <div className="border-l-2 border-border-color pl-4">
                                <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2022 - 2023</div>
                                <div className="font-semibold text-[1.1rem] text-white">Web Development Fundamentals</div>
                                <div className="text-text-dim text-[0.9rem] mt-[2px]">Self-Directed Learning and Online Bootcamps</div>
                                <p className="text-text-dim text-[0.85rem] mt-2 leading-relaxed">
                                    Mastered HTML, CSS, JavaScript, and React through intensive online courses, studying documentation, and building hands-on projects.
                                </p>
                            </div>
                        </div>
                        {!educationExpanded && (
                            <p className="text-[0.7rem] text-accent-blue/90 mt-4 text-center font-medium tracking-wide shrink-0">
                                Click to expand � scroll for full details
                            </p>
                        )}
                    </SpotlightCard>
                    </div>
                </div>

                {/* Skills Card */}
                <SpotlightCard className="card lg:col-span-2 flex flex-col h-full">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                        <Code2 size={14} /> TECHNICAL EXPERTISE
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {techSkills.map((skill, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 ${!showAllSkills && i >= SKILLS_LIMIT ? 'hidden' : ''}`}
                                title={skill.title}
                            >
                                {skill.icon}
                                <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">{skill.label}</span>
                            </div>
                        ))}
                    </div>
                    {hiddenSkillsCount > 0 && (
                        <button
                            onClick={() => setShowAllSkills(!showAllSkills)}
                            className="mt-3 text-[0.75rem] text-accent-blue hover:underline transition-colors w-full text-center"
                        >
                            {showAllSkills ? 'Show less' : `View all (${techSkills.length})`}
                        </button>
                    )}
                </SpotlightCard>

                {/* Services Card */}
                <SpotlightCard className="card lg:col-span-2 flex flex-col h-full">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                        <Palette size={14} /> SERVICES I OFFER
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Code2 size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white group-hover:text-accent-blue transition-colors">Full Stack Development</h4>
                                <p className={`text-text-dim text-[0.85rem] leading-relaxed ${!expandedServices['fullstack'] ? 'line-clamp-2' : ''}`}>I create scalable and high-performance web and mobile applications, progressing from initial concept through to deployment, by making use of modern technologies such as React, Next.js, Node.js, Express, TypeScript, and SQL/NoSQL databases. This involves developing responsive frontends, robust backend APIs, mobile apps, authentication systems, database architectures, integrating with third-party services, carrying out cloud deployment, optimising performance, and providing continuous maintenance in order to deliver secure and user-oriented digital experiences.</p>
                                <button onClick={() => toggleReadMore('fullstack')} className="text-accent-blue text-[0.75rem] mt-1 hover:underline transition-colors">
                                    {expandedServices['fullstack'] ? 'Show less' : 'Read more \u2192'}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Palette size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white group-hover:text-accent-blue transition-colors">UI/UX Design</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">Designing in Figma interfaces that are both intuitive and beautiful, with a focus on user experience and accessibility.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Rocket size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white group-hover:text-accent-blue transition-colors">Performance Optimization</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">Optimising speed, making SEO improvements, and putting into practice the best practices in order to achieve better rankings.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Zap size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white group-hover:text-accent-blue transition-colors">API Development</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">Design and integration of RESTful and GraphQL APIs to ensure a smooth flow of data between different systems.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                                <Bot size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white group-hover:text-accent-blue transition-colors">AI Agent Automation</h4>
                                <p className={`text-text-dim text-[0.85rem] leading-relaxed ${!expandedServices['aiautomation'] ? 'line-clamp-2' : ''}`}>I design and deploy intelligent AI agents which automate routine tasks, simplify workflows, and enhance business efficiency; I create custom agents that are able to reason, use tools, integrate with APIs, manage workflows, process documents, and connect with platforms including Slack, Discord, Gmail, Notion, GitHub, CRMs, and databases.</p>
                                <button onClick={() => toggleReadMore('aiautomation')} className="text-accent-blue text-[0.75rem] mt-1 hover:underline transition-colors">
                                    {expandedServices['aiautomation'] ? 'Show less' : 'Read more \u2192'}
                                </button>
                            </div>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Social Card */}
                <SpotlightCard className="card lg:col-span-1 flex flex-col">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[20px] flex items-center gap-[8px]">
                        <Users size={14} /> CONNECT
                    </div>
                    <div className="flex gap-[12px] mb-[20px]">
                        <a href="https://wa.me/2349157384644" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-[#25d366] hover:text-white hover:border-[#25d366] hover:scale-110">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/jonathan-ogunmuyiwa" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-white hover:text-black hover:border-white hover:scale-110">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://github.com/ogunmuyiwajonathan" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-white hover:text-black hover:border-white hover:scale-110">
                            <Github size={20} />
                        </a>
                    </div>
                    <Link to="/contact#connect" className="flex justify-between items-center mt-auto pt-[20px] group hover:text-white border-t border-border-color">
                        <div>
                            <span className="text-[0.65rem] text-text-dim uppercase tracking-[1px]">View All</span>
                            <p className="font-semibold text-[0.9rem]">Social Profiles</p>
                        </div>
                        <ArrowRight className="text-text-dim transition-all duration-300 group-hover:scale-110" />
                    </Link>
                </SpotlightCard>

                {/* Resume Card */}
                <SpotlightCard className="card lg:col-span-1">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[20px] flex items-center gap-[8px]">
                        <BookOpen size={14} /> DOCUMENTS
                    </div>
                    <div className="text-center opacity-20 text-[1.4rem] italic mt-[10px] font-bold">
                        Jonathan. OG
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-[20px] border-t border-border-color cursor-pointer group">
                        <div>
                            <span className="text-[0.65rem] text-text-dim uppercase tracking-[1px]">Download</span>
                            <p className="font-semibold text-[0.9rem] group-hover:text-accent-blue transition-colors">Detailed CV</p>
                        </div>
                        <ArrowRight className="text-text-dim transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                </SpotlightCard>

                {/* Philosophy Card */}
                <SpotlightCard className="card lg:col-span-2">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[20px] flex items-center gap-[8px]">
                        <Lightbulb size={14} /> MY APPROACH
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <Target size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">User-Centric Design</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Every pixel has a purpose. I focus on intuitive navigation and accessibility in every project.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <Zap size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Performance First</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Fast load times and smooth interactions are essential. I optimize for Core Web Vitals.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <Heart size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Clean Code</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">I create maintainable, well-documented code that scales. I follow industry best practices and standards.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 hover:-translate-y-1 hover:bg-white/10 transition-all duration-300">
                            <Award size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Continuous Learning</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Technology changes quickly. I keep up with new technologies and modern development patterns.</p>
                        </div>
                    </div>
                </SpotlightCard>

                {/* CTA Card */}
                <SpotlightCard className="glass-card lg:col-span-2 flex justify-end min-h-[220px] group relative overflow-hidden">
                    <Link to="/contact">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h2 className="leading-[1.1] text-[2rem] font-bold relative z-10">
                            Let's <br />
                            work <span className="text-text-dim">together.</span>
                        </h2>
                        <div className="absolute right-[35px] bottom-[35px] text-text-dim transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                            <ArrowUpRight size={32} />
                        </div>
                    </Link>
                </SpotlightCard>

            </div>

            {/* Bottom CTA Section */}
            <SpotlightCard className="my-[40px] mb-[60px] py-[60px] px-[20px] text-center border border-border-color bg-[radial-gradient(circle_at_center,#111_0%,#0f0f0f_100%)] rounded-[30px] flex flex-col items-center gap-[20px]">
                <h2 className="text-[clamp(1.8rem,6vw,3.5rem)] font-bold tracking-[-1px]">Ready to start your project?</h2>
                <p className="text-text-dim max-w-[500px] leading-relaxed">
                    I'm currently available for freelance work and open to new opportunities. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
                </p>
                <Link to="/contact" className="bg-white text-black py-[16px] px-[40px] rounded-[100px] font-bold no-underline transition-all ease-custom duration-500 hover:scale-105 mt-4">
                    Start a Conversation
                </Link>
            </SpotlightCard>
        </>
    );
}
