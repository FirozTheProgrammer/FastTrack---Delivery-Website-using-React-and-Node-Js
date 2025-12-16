import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Johnson",
            role: "Small Business Owner",
            content: "Fast Track has completely transformed how I handle my business deliveries. Their tracking is spot on!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        {
            name: "Michael Chen",
            role: "E-commerce Manager",
            content: "Reliable, fast, and professional. The best courier service we've partnered with so far.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        },
        {
            name: "Emily Davis",
            role: "Freelancer",
            content: "I love the real-time updates. I never have to guess where my package is anymore.",
            rating: 4,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
        }
    ];

    return (
        <section className="relative pt-20 pb-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Wave Separator Top */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[99%] pointer-events-none">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,50 Q600,-10 1200,50 V120 H0 Z" className="fill-slate-50 opacity-20 dark:opacity-5"></path>
                    <path d="M0,60 Q600,0 1200,60 V120 H0 Z" className="fill-slate-50 dark:fill-slate-950"></path>
                </svg>
            </div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
                    >
                        Trusted by Thousands
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        See what our customers have to say about their experience with Fast Track.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="testimonial-card bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >    <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-900"
                                />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300 dark:text-slate-600'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">"{review.content}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
