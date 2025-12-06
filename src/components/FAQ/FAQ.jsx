import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 last:border-0">
            <button
                className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-slate-900">{question}</span>
                <span className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-500'}`}>
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
                        <p className="pb-6 text-slate-600 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const faqs = [
        {
            question: "How do I track my parcel?",
            answer: "You can track your parcel by entering your unique tracking ID in the search bar on our homepage. You will get real-time updates on its location and status."
        },
        {
            question: "What are the delivery charges?",
            answer: "Delivery charges depend on the weight of the package and the destination. Inside Dhaka, it starts from 60 BDT, and nationwide delivery starts from 120 BDT."
        },
        {
            question: "Is there any insurance for valuable items?",
            answer: "Yes, we offer insurance for parcels with a declared value. Please contact our support or check the optional insurance box when booking a delivery for premium protection."
        },
        {
            question: "Can I schedule a pickup time?",
            answer: "Absolutely! When you create a booking via our app or website, you can select a preferred pickup window that works best for you.",
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600">Have questions? We're here to help.</p>
                </div>

                <div className="bg-white rounded-2xl p-2">
                    {faqs.map((faq, idx) => (
                        <FAQItem key={idx} {...faq} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
