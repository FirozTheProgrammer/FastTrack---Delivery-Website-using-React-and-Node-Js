import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border-b border-slate-200 dark:border-slate-700 last:border-0"
        >
            <button
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-slate-900 dark:text-white">{question}</span>
                <span className={`p - 2 rounded - full transition - colors ${isOpen ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'} `}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "How do I track my shipment?",
            answer: "You can track your shipment by entering the tracking ID provided at the time of booking into the tracking field on our homepage."
        },
        {
            question: "What are your delivery hours?",
            answer: "We deliver from 8:00 AM to 8:00 PM, Monday through Saturday. Express deliveries may be available on Sundays and holidays in select areas."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to over 200 countries worldwide. Rates and delivery times vary by destination."
        },
        {
            question: "How is the shipping cost calculated?",
            answer: "Shipping costs are calculated based on the weight, dimensions, and destination of the package. You can use our online calculator for an estimate."
        }
    ];

    return (
        <section className="relative pt-20 pb-40 bg-white dark:bg-slate-900 transition-colors duration-300">
            {/* Wave Separator Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[99%] pointer-events-none">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,50 Q600,-10 1200,50 V120 H0 Z" className="fill-white opacity-20 dark:opacity-5"></path>
                    <path d="M0,60 Q600,0 1200,60 V120 H0 Z" className="fill-white dark:fill-slate-900"></path>
                </svg>
            </div>
            <div className="container mx-auto px-4 max-w-3xl relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600 dark:text-slate-400">Have questions? We're here to help.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sm:p-10">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} index={idx} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
