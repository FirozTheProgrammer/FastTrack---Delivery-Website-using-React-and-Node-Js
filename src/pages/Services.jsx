import React from 'react';
import {
    Package,
    Zap,
    Clock,
    DollarSign,
    MapPin,
    Radar,
    FileText,
    ShoppingCart,
    Shield,
    Boxes,
    RefreshCw,
    Truck,
    CheckCircle2
} from 'lucide-react';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Express Delivery",
            description: "Lightning-fast delivery within 2-4 hours in major cities across Bangladesh including Dhaka, Chittagong, and Sylhet.",
            features: [
                "Same-day delivery guarantee",
                "Priority handling",
                "Real-time updates",
                "Dedicated support"
            ],
            color: "from-amber-500 to-orange-600"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Standard Delivery",
            description: "Reliable and affordable delivery service within 24-48 hours to any location in Bangladesh.",
            features: [
                "Economical pricing",
                "Nationwide coverage",
                "Scheduled pickup",
                "SMS notifications"
            ],
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Cash on Delivery (COD)",
            description: "Collect payments on behalf of businesses with secure cash handling and quick settlement.",
            features: [
                "Secure cash collection",
                "Fast settlement (24-48 hrs)",
                "Daily reports",
                "No hidden charges"
            ],
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "Nationwide Coverage",
            description: "Comprehensive delivery network covering all 64 districts of Bangladesh including remote areas.",
            features: [
                "All major cities covered",
                "Rural area delivery",
                "Island delivery available",
                "Local delivery partners"
            ],
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: <Radar className="w-8 h-8" />,
            title: "Real-Time Tracking",
            description: "Track your parcels in real-time with our advanced GPS tracking system and get instant updates.",
            features: [
                "Live GPS tracking",
                "SMS & email alerts",
                "Delivery proof photos",
                "Customer signature"
            ],
            color: "from-cyan-500 to-blue-600"
        },
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Document Delivery",
            description: "Specialized handling for important documents with enhanced security and priority processing.",
            features: [
                "Secure handling",
                "Express processing",
                "Proof of delivery",
                "Insurance available"
            ],
            color: "from-slate-500 to-gray-600"
        },
        {
            icon: <ShoppingCart className="w-8 h-8" />,
            title: "E-Commerce Integration",
            description: "Seamless integration with popular e-commerce platforms for automated order processing and fulfillment.",
            features: [
                "API integration",
                "Bulk order upload",
                "Automated tracking",
                "Dashboard analytics"
            ],
            color: "from-rose-500 to-red-600"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Fragile Item Handling",
            description: "Special care and packaging for delicate items including electronics, glassware, and perishables.",
            features: [
                "Extra protective packaging",
                "Careful handling",
                "Insurance coverage",
                "Temperature control"
            ],
            color: "from-teal-500 to-cyan-600"
        },
        {
            icon: <Boxes className="w-8 h-8" />,
            title: "Bulk Delivery",
            description: "Cost-effective solutions for businesses with high-volume shipping needs and dedicated account management.",
            features: [
                "Volume discounts",
                "Dedicated manager",
                "Customized solutions",
                "Priority pickup"
            ],
            color: "from-violet-500 to-purple-600"
        },
        {
            icon: <RefreshCw className="w-8 h-8" />,
            title: "Return & Exchange",
            description: "Hassle-free return and exchange services for e-commerce businesses and individual customers.",
            features: [
                "Easy return process",
                "Quality inspection",
                "Refund handling",
                "Exchange support"
            ],
            color: "from-indigo-500 to-blue-600"
        },
        {
            icon: <Truck className="w-8 h-8" />,
            title: "Next-Day Delivery",
            description: "Guaranteed next-day delivery for orders placed before 3 PM to major cities in Bangladesh.",
            features: [
                "Next-day guarantee",
                "Cutoff time 3 PM",
                "Weekend delivery",
                "Holiday service"
            ],
            color: "from-lime-500 to-green-600"
        },
        {
            icon: <Package className="w-8 h-8" />,
            title: "Parcel Packaging",
            description: "Professional packaging services to ensure your items reach safely with proper protection.",
            features: [
                "Free basic packaging",
                "Premium packaging available",
                "Custom box sizes",
                "Eco-friendly materials"
            ],
            color: "from-fuchsia-500 to-pink-600"
        }
    ];

    const whyChooseUs = [
        {
            title: "24/7 Customer Support",
            description: "Round-the-clock support team ready to assist you in Bengali and English"
        },
        {
            title: "Competitive Pricing",
            description: "Transparent pricing with no hidden fees and special discounts for regular customers"
        },
        {
            title: "Extensive Network",
            description: "Over 500+ delivery agents across Bangladesh ensuring quick delivery"
        },
        {
            title: "Secure & Reliable",
            description: "Insurance coverage available and proven track record of safe deliveries"
        }
    ];

    return (
        <>
            <Header />
            <div className="min-h-screen pt-24 pb-12 px-4 dark:bg-slate-900 transition-colors duration-300">
                {/* Hero Section */}
                <div className="container mx-auto max-w-7xl mb-16">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Delivery Services
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Comprehensive courier solutions tailored for businesses and individuals across Bangladesh
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6`}>
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    {service.description}
                                </p>

                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                            <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="bg-gradient-to-br from-primary-600 to-indigo-700 rounded-3xl p-12 text-white mb-16">
                        <h2 className="text-4xl font-bold text-center mb-12">Why Choose FastTrack?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {whyChooseUs.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-indigo-100">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm border border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied customers across Bangladesh. Start shipping with FastTrack today!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/request">
                                <Button variant="primary" className="px-8 py-3 text-lg">
                                    Request Delivery
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="secondary" className="px-8 py-3 text-lg">
                                    Contact Sales
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
