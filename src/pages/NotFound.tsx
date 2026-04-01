import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import FuzzyText from '@/components/react-bits/FuzzyText';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-blue/3 blur-[80px] pointer-events-none" />

            {/* 404 FuzzyText */}
            <div className="relative z-10 flex flex-col items-center gap-8 mb-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
                <FuzzyText
                    fontSize="clamp(6rem, 20vw, 14rem)"
                    fontWeight={900}
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover
                    color="#ffffff"
                >
                    404
                </FuzzyText>
            </div>

            {/* Message */}
            <div className="relative z-10 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                <div className="flex items-center gap-3 mb-1">
                    <span className="h-px w-10 bg-border" />
                    <span className="text-[0.7rem] uppercase tracking-[3px] text-accent-blue font-bold">
                        Page Not Found
                    </span>
                    <span className="h-px w-10 bg-border" />
                </div>

                <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-foreground leading-tight max-w-[520px]">
                    Looks like you've wandered<br />
                    <span className="text-muted-foreground">off the map.</span>
                </h1>

                <p className="text-muted-foreground text-[0.95rem] max-w-[420px] leading-relaxed">
                    The page you're looking for doesn't exist, was moved, or never existed in the first place.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm
                            border border-border text-foreground transition-all duration-300
                            hover:bg-secondary hover:scale-105 hover:border-foreground/30"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm
                            border border-border text-foreground transition-all duration-300
                            hover:bg-secondary hover:scale-105 hover:border-foreground/30"
                    >
                        <Home size={16} />
                        Home Page
                    </Link>
                </div>
            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30">
                <span className="h-px w-16 bg-border" />
                <span className="text-[0.65rem] uppercase tracking-[3px] text-muted-foreground">Jonathan Ogunmuyiwa</span>
                <span className="h-px w-16 bg-border" />
            </div>
        </div>
    );
}
