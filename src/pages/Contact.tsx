import { useState, type FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin, Sparkles, Instagram, Linkedin, Github, Youtube,
    Clock, Calendar, Send, MessageSquare, CheckCircle2,
    Loader2, PartyPopper, Rocket, X, AlertCircle, WifiOff, RefreshCw
} from 'lucide-react';
import SpotlightCard from '../components/react-bits/SpotlightCard';
import BlurText from '../components/react-bits/BlurText';
import Skeleton from '../components/Skeleton';
import SlickDropdown from '../components/SlickDropdown';

const PROJECT_OPTIONS = [
    { value: "website", label: "Website Development" },
    { value: "webapp", label: "Web Application" },
    { value: "ecommerce", label: "E-commerce Platform" },
    { value: "redesign", label: "Website Redesign" },
    { value: "mobile", label: "Mobile App (Flutter)" },
    { value: "fullstack", label: "Full-Stack Development" },
    { value: "automation", label: "Python Automation & Scripting" },
    { value: "other", label: "Other" },
];


interface FormStatus {
    state: 'idle' | 'submitting' | 'success' | 'error';
    message?: string;
    errorType?: 'network' | 'server' | 'validation' | 'unknown';
}

export default function Contact() {
    const [formStatus, setFormStatus] = useState<FormStatus>({ state: 'idle' });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [projectType, setProjectType] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-[1100px] mx-auto my-[40px] lg:my-[60px] px-[20px] grid grid-cols-1 min-[900px]:grid-cols-[380px_1fr] gap-[40px] min-[900px]:gap-[60px]">
                <div className="space-y-6">
                    <Skeleton className="h-40 rounded-2xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                </div>
                <Skeleton className="h-[600px] rounded-[30px]" />
            </div>
        );
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus({ state: 'submitting' });

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Add project type to form data if selected
        if (projectType) {
            formData.append('project-type', projectType);
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch('https://formspree.io/f/xyznnzod', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                setFormStatus({ state: 'success' });
                setShowSuccessModal(true);
                setRetryCount(0);
                setProjectType('');
                form.reset();

                setTimeout(() => {
                    setShowSuccessModal(false);
                    setFormStatus({ state: 'idle' });
                }, 5000);
            } else {
                const data = await response.json().catch(() => ({}));
                let errorType: FormStatus['errorType'] = 'server';
                let message = data.error || 'Something went wrong on our end. Please try again.';

                if (response.status === 422) {
                    errorType = 'validation';
                    message = 'Please check your information and try again.';
                } else if (response.status >= 500) {
                    errorType = 'server';
                    message = 'Server error. Please try again in a few moments.';
                }

                setFormStatus({
                    state: 'error',
                    message,
                    errorType
                });
                setShowErrorModal(true);
            }
        } catch (error) {
            let errorType: FormStatus['errorType'] = 'unknown';
            let message = 'An unexpected error occurred. Please try again.';

            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorType = 'network';
                message = 'Network connection failed. Please check your internet connection.';
            } else if (error instanceof DOMException && error.name === 'AbortError') {
                errorType = 'network';
                message = 'Request timed out. Please check your connection and try again.';
            }

            setFormStatus({
                state: 'error',
                message,
                errorType
            });
            setShowErrorModal(true);
        }
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        setFormStatus({ state: 'idle' });
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
        if (formStatus.state === 'error') {
            setFormStatus({ state: 'idle' });
        }
    };

    const handleRetry = (e: React.MouseEvent) => {
        e.preventDefault();
        setRetryCount(prev => prev + 1);
        closeErrorModal();
        setTimeout(() => {
            const form = document.querySelector('form');
            if (form) {
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(submitEvent);
            }
        }, 300);
    };

    const getErrorIcon = () => {
        switch (formStatus.errorType) {
            case 'network':
                return <WifiOff size={48} className="text-red-500" />;
            case 'validation':
                return <AlertCircle size={48} className="text-orange-500" />;
            default:
                return <AlertCircle size={48} className="text-red-500" />;
        }
    };

    return (
        <div className="max-w-[1100px] mx-auto my-[40px] lg:my-[60px] px-[20px] grid grid-cols-1 min-[900px]:grid-cols-[380px_1fr] gap-[40px] min-[900px]:gap-[60px] relative">
            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={closeSuccessModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-[#1a1a1a] border border-green-500/30 rounded-[24px] p-8 max-w-[420px] w-full text-center relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated Background */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/20 rounded-full blur-3xl"
                                />
                            </div>

                            {/* Confetti Animation */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{
                                            opacity: 1,
                                            x: '50%',
                                            y: '50%',
                                            scale: 0
                                        }}
                                        animate={{
                                            opacity: 0,
                                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                                            scale: Math.random() * 1.5 + 0.5,
                                            rotate: Math.random() * 360
                                        }}
                                        transition={{ duration: 1.5, ease: 'easeOut' }}
                                        className="absolute w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: ['#22c55e', '#10b981', '#f59e0b', '#3b82f6', '#f472b6'][i % 5]
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6"
                                >
                                    <PartyPopper size={40} className="text-white" />
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold mb-3 text-white"
                                >
                                    Message Sent!
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-text-dim mb-6"
                                >
                                    Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center justify-center gap-2 text-green-400 text-sm mb-6"
                                >
                                    <Rocket size={16} />
                                    <span>Response incoming!</span>
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={closeSuccessModal}
                                    className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                                >
                                    Awesome!
                                </motion.button>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeSuccessModal}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-dim hover:text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error Modal - RED THEME */}
            <AnimatePresence>
                {showErrorModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={closeErrorModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-[#1a1a1a] border-2 border-red-500/50 rounded-[24px] p-8 max-w-[420px] w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Red Pulsing Background */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.2, 0.4, 0.2]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/30 rounded-full blur-3xl"
                                />
                                {/* Error Pattern */}
                                <div className="absolute inset-0 opacity-5" style={{
                                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(239, 68, 68, 0.1) 35px, rgba(239, 68, 68, 0.1) 70px)`
                                }} />
                            </div>

                            {/* Shake Animation Container */}
                            <motion.div
                                animate={{ x: [0, -10, 10, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.1, type: 'spring', damping: 12 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6 border-4 border-red-400/30"
                                >
                                    {getErrorIcon()}
                                </motion.div>
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-bold mb-3 text-red-400"
                            >
                                {formStatus.errorType === 'network' ? 'Connection Failed' :
                                    formStatus.errorType === 'validation' ? 'Validation Error' :
                                        'Something Went Wrong'}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-text-dim mb-2"
                            >
                                {formStatus.message}
                            </motion.p>

                            {retryCount > 0 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400/70 text-sm mb-4"
                                >
                                    Retry attempt {retryCount}
                                </motion.p>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex gap-3 mt-6"
                            >
                                <button
                                    onClick={handleRetry}
                                    className="flex-1 py-3 px-6 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    <RefreshCw size={18} className={`${formStatus.state === 'submitting' ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`} />
                                    Try Again
                                </button>
                                <button
                                    onClick={closeErrorModal}
                                    className="py-3 px-6 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                                >
                                    Close
                                </button>
                            </motion.div>

                            {/* Close Button */}
                            <button
                                onClick={closeErrorModal}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-500/40 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Column - Contact Info */}
            <div className="max-[900px]:order-2 max-[900px]:mt-[20px]">
                <div className="mb-8">
                    <h2 className="text-[0.8rem] tracking-[2px] text-white mb-[30px] uppercase font-bold flex items-center gap-2">
                        <MessageSquare size={16} /> Contact Information
                    </h2>

                    <p className="text-[0.95rem] leading-relaxed mb-6">
                        I'm currently available for freelance projects, full-time positions, and consulting opportunities.
                        Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
                    </p>
                </div>

                {/* Email */}
                <a href="mailto:ogunmuyiwajonathan@gmail.com" className="flex gap-[20px] mb-[30px] items-center no-underline group">
                    <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-border-color rounded-[14px] flex items-center justify-center shrink-0 text-accent-blue group-hover:border-accent-blue transition-colors">
                        <Mail size={22} />
                    </div>
                    <div>
                        <h3 className="text-[0.7rem] text-text-dim uppercase mb-[4px] tracking-[1px] font-semibold">Email Me</h3>
                        <p className="text-[0.95rem] text-white font-medium group-hover:text-accent-blue transition-colors">ogunmuyiwajonathan@gmail.com</p>
                        <p className="text-[0.75rem] text-text-dim mt-1">Best for detailed project inquiries</p>
                    </div>
                </a>

                {/* Phone */}
                <div className="flex gap-[20px] mb-[30px] items-center no-underline">
                    <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-border-color rounded-[14px] flex items-center justify-center shrink-0 text-accent-blue">
                        <Phone size={22} />
                    </div>
                    <div>
                        <h3 className="text-[0.7rem] text-text-dim uppercase mb-[4px] tracking-[1px] font-semibold">Call Me</h3>
                        <p className="text-[0.95rem] text-white font-medium">+234 814 872 3337</p>
                        <p className="text-[0.75rem] text-text-dim mt-1">Available 9 AM - 6 PM WAT</p>
                    </div>
                </div>

                {/* WhatsApp */}
                <a href="https://wa.me/2349157384644" target="_blank" rel="noopener noreferrer" className="flex gap-[20px] mb-[30px] items-center no-underline group">
                    <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-border-color rounded-[14px] flex items-center justify-center shrink-0 text-[#25d366] group-hover:border-[#25d366] transition-colors">
                        <svg className="w-[24px] h-[24px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-[0.7rem] text-text-dim uppercase mb-[4px] tracking-[1px] font-semibold">WhatsApp</h3>
                        <p className="text-[0.95rem] text-white font-medium group-hover:text-[#25d366] transition-colors">+234 915 738 4644</p>
                        <p className="text-[0.75rem] text-text-dim mt-1">Quick responses for urgent matters</p>
                    </div>
                </a>

                {/* Location */}
                <div className="flex gap-[20px] mb-[35px] items-center no-underline">
                    <div className="w-[54px] h-[54px] bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-border-color rounded-[14px] flex items-center justify-center shrink-0 text-accent-blue">
                        <MapPin size={22} />
                    </div>
                    <div>
                        <h3 className="text-[0.7rem] text-text-dim uppercase mb-[4px] tracking-[1px] font-semibold">Location</h3>
                        <p className="text-[0.95rem] text-white font-medium">Ogun State, Nigeria</p>
                        <p className="text-[0.75rem] text-text-dim mt-1">Open to remote work worldwide</p>
                    </div>
                </div>

                {/* Availability Status */}
                <div className="p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/20 mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[0.8rem] font-semibold text-white">Currently Available</span>
                    </div>
                    <p className="text-[0.8rem] text-text-dim">
                        I'm accepting new projects for Q2 2025. Typical response time: 24-48 hours.
                    </p>
                </div>

                {/* Social Profiles */}
                <div className="mt-[40px]">
                    <h2 className="text-[0.8rem] tracking-[2px] text-white mb-[20px] uppercase font-bold">Connect Online</h2>
                    <p className="text-text-dim text-[0.85rem] mb-4">
                        Follow my work and get insights into my development process across these platforms.
                    </p>
                    <div className="flex gap-[12px] mt-[20px]">
                        <a href="https://github.com/ogunmuyiwajonathan" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] border border-border-color rounded-full flex items-center justify-center transition-all duration-300 bg-[#161616] text-white no-underline hover:bg-white hover:text-black hover:-translate-y-[5px]" title="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/jonathan-ogunmuyiwa" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] border border-border-color rounded-full flex items-center justify-center transition-all duration-300 bg-[#161616] text-white no-underline hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:-translate-y-[5px]" title="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://wa.me/2349157384644" target="_blank" rel="noopener noreferrer" className="w-[48px] h-[48px] border border-border-color rounded-full flex items-center justify-center transition-all duration-300 bg-[#161616] text-white no-underline hover:bg-[#25d366] hover:text-white hover:border-[#25d366] hover:-translate-y-[5px]" title="WhatsApp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                        <a href="#" className="w-[48px] h-[48px] border border-border-color rounded-full flex items-center justify-center transition-all duration-300 bg-[#161616] text-white no-underline hover:bg-[#e4405f] hover:text-white hover:border-[#e4405f] hover:-translate-y-[5px]" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="w-[48px] h-[48px] border border-border-color rounded-full flex items-center justify-center transition-all duration-300 bg-[#161616] text-white no-underline hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000] hover:-translate-y-[5px]" title="YouTube">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="mt-8 p-4 rounded-xl bg-white/5 border border-border-color">
                    <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-accent-blue" />
                        <span className="text-[0.8rem] font-semibold text-white">Working Hours</span>
                    </div>
                    <div className="space-y-2 text-[0.8rem]">
                        <div className="flex justify-between">
                            <span className="text-text-dim">Monday - Friday</span>
                            <span className="text-white">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-dim">Saturday</span>
                            <span className="text-white">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-text-dim">Sunday</span>
                            <span className="text-text-dim">Closed</span>
                        </div>
                    </div>
                    <p className="text-[0.75rem] text-text-dim mt-3 pt-3 border-t border-border-color">
                        All times are in West Africa Time (WAT, UTC+1)
                    </p>
                </div>
            </div>

            {/* Right Column - Contact Form */}
            <SpotlightCard className="bg-card-bg border border-border-color rounded-[24px] min-[900px]:rounded-[30px] p-[30px_20px] min-[900px]:p-[45px] relative" spotlightColor="rgba(61, 90, 241, 0.1)">
                <div className="absolute top-[30px] right-[35px] text-text-dim opacity-30">
                    <Sparkles size={24} />
                </div>

                <div className="mb-8">
                    <BlurText
                        text="Let's work together."
                        delay={150}
                        animateBy="words"
                        direction="top"
                        className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold mb-3 leading-[1.1] text-white"
                    />
                    <p className="text-text-dim text-[0.9rem] leading-relaxed">
                        Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
                        I typically respond within 24-48 hours.
                    </p>
                </div>

                <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-semibold mb-2 block">Your Name *</label>
                            <input
                                className={`
                                    w-full bg-[#1d1d1d] border rounded-[12px] p-[16px_20px] text-white text-[0.95rem] transition-all duration-300 font-inherit focus:outline-none focus:bg-[#222]
                                    ${formStatus.state === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-[#444]'}
                                `}
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                disabled={formStatus.state === 'submitting'}
                            />
                        </div>
                        <div>
                            <label className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-semibold mb-2 block">Email Address *</label>
                            <input
                                className={`
                                    w-full bg-[#1d1d1d] border rounded-[12px] p-[16px_20px] text-white text-[0.95rem] transition-all duration-300 font-inherit focus:outline-none focus:bg-[#222]
                                    ${formStatus.state === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-[#444]'}
                                `}
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                required
                                disabled={formStatus.state === 'submitting'}
                            />
                        </div>
                    </div>

                    {/* Project Type Select */}
                    <div>
                        <label className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-semibold mb-2 block">Project Type</label>
                        <SlickDropdown 
                            options={PROJECT_OPTIONS}
                            value={projectType}
                            onChange={(val) => setProjectType(val)}
                            placeholder="Select a project type"
                            disabled={formStatus.state === 'submitting'}
                            hasError={formStatus.state === 'error'}
                        />
                    </div>

                    <div>
                        <label className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-semibold mb-2 block">Subject *</label>
                        <input
                            className={`
                                w-full bg-[#1d1d1d] border rounded-[12px] p-[16px_20px] text-white text-[0.95rem] transition-all duration-300 font-inherit focus:outline-none focus:bg-[#222]
                                ${formStatus.state === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-[#444]'}
                            `}
                            type="text"
                            name="subject"
                            placeholder="Project Inquiry: E-commerce Website"
                            required
                            disabled={formStatus.state === 'submitting'}
                        />
                    </div>

                    <div>
                        <label className="text-[0.75rem] text-text-dim uppercase tracking-[1px] font-semibold mb-2 block">Tell me about your project *</label>
                        <textarea
                            className={`
                                w-full bg-[#1d1d1d] border rounded-[12px] p-[16px_20px] text-white text-[0.95rem] transition-all duration-300 font-inherit focus:outline-none focus:bg-[#222] min-h-[160px] resize-none
                                ${formStatus.state === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-[#444]'}
                            `}
                            name="message"
                            placeholder="Describe your project, goals, timeline, and any specific requirements..."
                            required
                            disabled={formStatus.state === 'submitting'}
                        ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-border-color">
                        <input
                            type="checkbox"
                            id="newsletter"
                            name="newsletter"
                            className="mt-1 w-4 h-4 rounded border-border-color bg-[#1d1d1d] text-accent-blue focus:ring-accent-blue"
                            disabled={formStatus.state === 'submitting'}
                        />
                        <label htmlFor="newsletter" className="text-[0.85rem] text-text-dim cursor-pointer">
                            Keep me updated with occasional emails about new projects, articles, and industry insights.
                            Unsubscribe anytime.
                        </label>
                    </div>

                    {/* Submit Button with States */}
                    <button
                        type="submit"
                        disabled={formStatus.state === 'submitting'}
                        className={`
                            border-none p-[18px] rounded-[12px] font-semibold cursor-pointer transition-all duration-300 text-[1rem] 
                            flex items-center justify-center gap-2 group relative overflow-hidden
                            ${formStatus.state === 'submitting'
                                ? 'bg-text-dim text-white cursor-not-allowed'
                                : formStatus.state === 'error'
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-white text-black hover:bg-accent-blue hover:text-white'
                            }
                        `}
                    >
                        {/* Error shake animation */}
                        <motion.div
                            animate={formStatus.state === 'error' ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-2"
                        >
                            {formStatus.state === 'submitting' ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : formStatus.state === 'error' ? (
                                <>
                                    <AlertCircle size={18} />
                                    Failed to Send - Click to Retry
                                </>
                            ) : formStatus.state === 'success' ? (
                                <>
                                    <CheckCircle2 size={18} />
                                    Message Sent!
                                </>
                            ) : (
                                <>
                                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                                    Send Message
                                </>
                            )}
                        </motion.div>
                    </button>

                    {/* Inline Error Alert */}
                    <AnimatePresence>
                        {formStatus.state === 'error' && !showErrorModal && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="font-semibold mb-1">Message failed to send</p>
                                        <p className="text-red-300/80">{formStatus.message}</p>
                                        <button
                                            type="button"
                                            onClick={() => setShowErrorModal(true)}
                                            className="mt-2 text-red-400 underline hover:text-red-300 text-xs"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <p className="text-[0.75rem] text-text-dim text-center">
                        By submitting this form, you agree to my{' '}
                        <a href="#" className="text-accent-blue hover:underline">privacy policy</a>.
                    </p>
                </form>

                {/* Quick Response Promise */}
                <div className="mt-8 pt-6 border-t border-border-color">
                    <div className="flex items-center gap-3 text-[0.85rem]">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Calendar size={18} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-white font-medium">Fast Response Guaranteed</p>
                            <p className="text-text-dim">I typically reply to all inquiries within 24-48 hours during business days.</p>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
}