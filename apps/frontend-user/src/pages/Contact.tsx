import { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Users, DollarSign, Send } from 'lucide-react';
import { Input, Label, Button } from '@project-v-redone/ui';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Connect to backend API
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitSuccess(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => setSubmitSuccess(false), 5000);
    };

    const trustBadges = [
        {
            icon: Shield,
            title: '24/7 Support',
            description: 'Round-the-clock assistance'
        },
        {
            icon: Users,
            title: 'Expert Guides',
            description: 'Local knowledge and expertise'
        },
        {
            icon: DollarSign,
            title: 'Best Prices',
            description: 'Competitive rates guaranteed'
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-background">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-serif mb-4 text-ochre">Get in Touch</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions about your Sri Lankan adventure? We're here to help plan your perfect journey.
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {trustBadges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <div
                                key={index}
                                className="bg-card/50 border border-border rounded-xl p-6 text-center hover:border-ochre transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                                    <Icon className="text-ochre" size={24} />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
                                <p className="text-sm text-muted-foreground">{badge.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-serif text-foreground mb-6">Send us a Message</h2>

                        {submitSuccess && (
                            <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                                <Shield className="text-green-600" size={20} />
                                <p className="text-green-600 dark:text-green-400 text-sm">
                                    Thank you! We'll get back to you within 24 hours.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols2 gap-6">
                                <div>
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="mt-1"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="mt-1"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="mt-1"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                        className="mt-1"
                                        placeholder="Tour Inquiry"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="message">Message *</Label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={6}
                                    className="mt-1 w-full bg-background border border-input rounded-lg p-3 text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ochre"
                                    placeholder="Tell us about your travel plans, preferences, and any questions you have..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-ochre hover:bg-ochre-dark text-white h-12 text-lg font-medium rounded-xl flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6">
                            <h3 className="text-xl font-serif text-foreground mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-ochre/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-ochre" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground mb-1">Email</p>
                                        <a href="mailto:info@lankavacations.com" className="text-muted-foreground hover:text-ochre transition-colors">
                                            info@lankavacations.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-ochre/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-ochre" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground mb-1">Phone</p>
                                        <a href="tel:+94112345678" className="text-muted-foreground hover:text-ochre transition-colors">
                                            +94 11 234 5678
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-ochre/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-ochre" size={20} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground mb-1">Visit Us</p>
                                        <p className="text-muted-foreground">
                                            123 Galle Road<br />
                                            Colombo 03, Sri Lanka
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-ochre/10 to-ochre/5 border border-ochre/20 rounded-2xl p-6">
                            <h4 className="font-semibold text-foreground mb-2">Office Hours</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                                Monday - Saturday<br />
                                9:00 AM - 6:00 PM (GMT+5:30)
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Emergency support available 24/7
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
