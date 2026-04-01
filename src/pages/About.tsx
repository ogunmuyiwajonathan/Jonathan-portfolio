import { Link } from 'react-router-dom';
import {
    Sparkles,
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
    Heart
} from 'lucide-react';
import { FaReact, FaJava, FaFigma, FaGitAlt, FaHtml5, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiTypescript, SiMongodb, SiJavascript, SiNextdotjs, SiRedux, SiExpress, SiPostgresql, SiGraphql, SiJest, SiWebpack } from 'react-icons/si';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import BlurText from '../components/react-bits/BlurText';
import Skeleton from '../components/Skeleton';
import { useState, useEffect } from 'react';


export default function About() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

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
                <SpotlightCard className="lg:col-span-1 p-0 bg-gradient-to-br from-[#2ea9ff] to-[#0056b3] h-[320px] lg:h-auto overflow-hidden group border border-border-color rounded-[30px]" spotlightColor="rgba(46, 169, 255, 0.2)">
                    <img src="/image.png" alt="Jonathan Ogunmuyiwa - Full Stack Developer" className="w-full h-full object-cover block transition-all duration-[800ms] group-hover:scale-110" />
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
                        I am a passionate software engineer and creative designer based in Nigeria, dedicated to crafting exceptional digital experiences that bridge the gap between aesthetics and functionality. With a keen eye for detail and a deep understanding of modern web technologies, I specialize in building high-performance web applications that not only meet but exceed user expectations.
                    </p>
                    <p className="text-text-dim text-[1rem] max-w-[550px] mt-[12px] leading-relaxed">
                        My journey in tech began with a curiosity about how things work on the internet, which quickly evolved into a professional pursuit of excellence in software development. Today, I combine technical expertise with creative problem-solving to deliver solutions that drive business growth and user satisfaction.
                    </p>
                </SpotlightCard>

                {/* Experience Card */}
                <div className="lg:col-span-2" id="specialize">
                    <SpotlightCard className="card h-full">
                        <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                            <Briefcase size={14} /> PROFESSIONAL EXPERIENCE
                        </div>
                        <div className="space-y-6">
                            <div className="border-l-2 border-accent-blue pl-4">
                                <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2024 - Present</div>
                                <div className="font-semibold text-[1.1rem] text-white">Freelance Full Stack Developer</div>
                                <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                    Crafting modern digital products for clients worldwide. Specializing in React-based applications, responsive design systems, and scalable backend solutions. Successfully delivered 5+ projects with 100% client satisfaction.
                                </div>
                            </div>
                            <div className="border-l-2 border-border-color pl-4">
                                <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2023 - 2024</div>
                                <div className="font-semibold text-[1.1rem] text-white">Junior Web Developer</div>
                                <div className="text-text-dim text-[0.9rem] mt-[2px] leading-relaxed">
                                    Collaborated with cross-functional teams to build and maintain web applications. Gained hands-on experience with modern JavaScript frameworks, RESTful APIs, and database management systems.
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>

                {/* Education Card */}
                <SpotlightCard className="card lg:col-span-2">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                        <GraduationCap size={14} /> EDUCATION & CERTIFICATIONS
                    </div>
                    <div className="space-y-6">
                        <div className="border-l-2 border-accent-blue pl-4">
                            <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2025 - 2027</div>
                            <div className="font-semibold text-[1.1rem] text-white">ADSE - Advanced Software Engineering</div>
                            <div className="text-text-dim text-[0.9rem] mt-[2px]">Aptech Computer Education</div>
                            <p className="text-text-dim text-[0.85rem] mt-2 leading-relaxed">
                                Comprehensive program covering advanced software engineering principles, system design, database architecture, and enterprise application development.
                            </p>
                        </div>
                        <div className="border-l-2 border-border-color pl-4">
                            <div className="text-text-dim text-[0.85rem] mb-[4px] font-medium">2022 - 2023</div>
                            <div className="font-semibold text-[1.1rem] text-white">Web Development Fundamentals</div>
                            <div className="text-text-dim text-[0.9rem] mt-[2px]">Self-Directed Learning & Online Bootcamps</div>
                            <p className="text-text-dim text-[0.85rem] mt-2 leading-relaxed">
                                Mastered HTML, CSS, JavaScript, and React through intensive online courses, documentation study, and hands-on project building.
                            </p>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Skills Card */}
                <SpotlightCard className="card lg:col-span-2">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                        <Code2 size={14} /> TECHNICAL EXPERTISE
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="HTML5 & CSS3">
                            <FaHtml5 size={26} className="text-[#e34f26]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">HTML/CSS</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Tailwind CSS">
                            <SiTailwindcss size={26} className="text-[#38bdf8]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Tailwind</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="JavaScript ES6+">
                            <SiJavascript size={28} className="text-[#f7df1e]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">JavaScript</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="TypeScript">
                            <SiTypescript size={28} className="text-[#3178c6]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">TypeScript</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="React.js">
                            <FaReact size={26} className="text-[#61dafb]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">React</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Next.js">
                            <SiNextdotjs size={26} className="text-white" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Next.js</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Node.js">
                            <FaNodeJs size={26} className="text-[#339933]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Node.js</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Java">
                            <FaJava size={26} className="text-[#f89820]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Java</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="MySQL">
                            <SiMysql size={26} className="text-[#00758f]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">MySQL</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="MongoDB">
                            <SiMongodb size={26} className="text-[#00ed64]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">MongoDB</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Figma">
                            <FaFigma size={26} className="text-[#f24e1e]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Figma</span>
                        </div>
                        <div className="flex flex-col items-center gap-[6px] p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300" title="Git">
                            <FaGitAlt size={26} className="text-[#f05032]" />
                            <span className="text-[0.6rem] text-text-dim uppercase tracking-[1px]">Git</span>
                        </div>
                    </div>
                </SpotlightCard>

                {/* Services Card */}
                <SpotlightCard className="card lg:col-span-2">
                    <div className="text-[0.75rem] font-semibold text-text-dim tracking-[1.5px] mb-[25px] flex items-center gap-[8px]">
                        <Palette size={14} /> SERVICES I OFFER
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
                                <Code2 size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white">Full Stack Web Development</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">End-to-end application development using React, Node.js, and modern databases. From concept to deployment.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
                                <Palette size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white">UI/UX Design</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">Creating intuitive, beautiful interfaces in Figma that prioritize user experience and accessibility.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
                                <Rocket size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white">Performance Optimization</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">Speed optimization, SEO improvements, and best practices implementation for better rankings.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center shrink-0">
                                <Zap size={16} className="text-accent-blue" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-[0.95rem] text-white">API Development</h4>
                                <p className="text-text-dim text-[0.85rem] leading-relaxed">RESTful and GraphQL API design and integration for seamless data flow between systems.</p>
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
                        <a href="https://twitter.com/ogunmuyiwajonathan" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-white hover:text-black hover:border-white hover:scale-110">
                            <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.6 318.1 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com/in/ogunmuyiwajonathan" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-white hover:text-black hover:border-white hover:scale-110">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://github.com/ogunmuyiwajonathan" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] border border-border-color rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.03)] transition-all duration-300 text-text-dim hover:bg-white hover:text-black hover:border-white hover:scale-110">
                            <Github size={20} />
                        </a>
                    </div>
                    <Link to="/contact" className="flex justify-between items-center mt-auto pt-[20px] group hover:text-white border-t border-border-color">
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
                        <div className="p-4 rounded-xl bg-white/5">
                            <Target size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">User-Centric Design</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Every pixel serves a purpose. I prioritize intuitive navigation and accessibility in every project.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <Zap size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Performance First</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Fast load times and smooth interactions are non-negotiable. I optimize for Core Web Vitals.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <Heart size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Clean Code</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Maintainable, well-documented code that scales. I follow industry best practices and standards.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5">
                            <Award size={20} className="text-accent-blue mb-2" />
                            <h4 className="font-semibold text-[0.9rem] mb-1">Continuous Learning</h4>
                            <p className="text-text-dim text-[0.8rem] leading-relaxed">Tech evolves rapidly. I stay current with emerging technologies and modern development patterns.</p>
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
