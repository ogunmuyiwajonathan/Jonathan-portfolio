import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';

export interface Project {
    title: string;
    tags: string;
    description: string;
    image: string;
    url: string;
    gradient: string;
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [project]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        key="modal-card"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[#161616] border border-[rgba(255,255,255,0.08)] rounded-[28px] overflow-hidden max-w-[600px] w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className={`w-full h-[260px] flex items-center justify-center ${project.gradient} relative overflow-hidden`}>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-[0.7rem] text-[#5b78f6] uppercase tracking-[1.5px] font-semibold">{project.tags}</span>
                                    <h2 className="text-[1.8rem] font-bold mt-1 leading-tight">{project.title}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-[36px] h-[36px] rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#666] hover:bg-white hover:text-black transition-all duration-300 shrink-0 ml-4 mt-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                            <p className="text-[#919191] text-[0.95rem] leading-relaxed mb-8">{project.description}</p>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-[100px] text-[0.9rem] hover:scale-105 transition-transform duration-300 no-underline"
                            >
                                Visit Site <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
