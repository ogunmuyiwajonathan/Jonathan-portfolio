import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
                    className="fixed inset-0 z-[9999] bg-[#0f0f0f] flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-6"
                    >
                        <h1 className="text-[2.8rem] font-bold tracking-[-2px] text-white">
                            Jonathan.
                        </h1>
                        <div className="flex gap-[6px]">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-[6px] h-[6px] rounded-full bg-[#5b78f6]"
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
