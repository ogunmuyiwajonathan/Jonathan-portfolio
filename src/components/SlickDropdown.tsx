import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface SlickDropdownProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
}

export default function SlickDropdown({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    hasError = false,
}: SlickDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-full flex items-center justify-between text-left
                    bg-[#1d1d1d] border rounded-[12px] p-[16px_20px] text-[0.95rem] 
                    transition-all duration-300 focus:outline-none focus:bg-[#222]
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    ${value ? 'text-white' : 'text-text-dim'}
                    ${hasError ? 'border-red-500/50 focus:border-red-500' : 'border-transparent focus:border-[#444]'}
                `}
            >
                <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown 
                    size={20} 
                    className={`text-text-dim transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-white' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && !disabled && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 origin-top overflow-hidden
                                   bg-[#1a1a1a] border border-white/10 rounded-[12px] 
                                   shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                    >
                        <div className="max-h-[250px] overflow-y-auto p-2">
                            {options.map((option, idx) => {
                                const isSelected = option.value === value;
                                return (
                                    <motion.button
                                        key={option.value}
                                        type="button"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={`
                                            w-full flex items-center justify-between p-[12px_16px] mb-1 last:mb-0
                                            rounded-[8px] text-[0.9rem] text-left transition-colors duration-200
                                            ${isSelected 
                                                ? 'bg-accent-blue/10 text-accent-blue font-semibold' 
                                                : 'text-text-dim hover:bg-white/5 hover:text-white'}
                                        `}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && <Check size={16} className="text-accent-blue" />}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
