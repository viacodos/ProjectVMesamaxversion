import { MapPin, Phone, Mail, Award, Users, Star, Car } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

export const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Banner */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1588945849538-6e60a89d0ba2?auto=format&fit=crop&w=1920"
                    alt="Sri Lanka coastline"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
                    <span className="text-ochre text-sm uppercase tracking-[0.2em] mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">Since 1984</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">About Us</h1>
                    <p className="text-xl text-white/90 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed font-light">
                        40+ years of creating unforgettable Sri Lankan experiences
                    </p>
                </div>
            </div>

            {/* Our Story Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Our Story</h2>
                        <div className="w-16 h-1 bg-ochre mx-auto mb-8"></div>
                    </div>

                    <div className="space-y-8 text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
                        <p>
                            Established in <strong className="text-foreground">1984</strong>, Lanka Vacations has been at the forefront of Sri Lankan tourism for over four decades. What began as a small family business has grown into one of the island's most trusted Destination Management Companies, while maintaining our commitment to personalized service and authentic experiences.
                        </p>
                        <p>
                            We act in the capacity of a <strong className="text-foreground">Destination Management Company</strong> to meet our clients' every need. From day excursions to comprehensive cultural tours, nature and wildlife adventures, and special interest packages, we offer a diverse range of experiences. Our specialty lies in creating tailor-made itineraries and "Go as you please" tours, giving our guests complete flexibility to explore Sri Lanka at their own pace.
                        </p>
                        <p>
                            Since inception, Lanka Vacations has had the opportunity to work with many world-renowned tour operators, building a reputation for excellence, reliability, and deep local knowledge. Our success is built on the relationships we've fostered and the countless memorable experiences we've created for travelers from around the globe.
                        </p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-6 bg-muted/30 border-y border-border/50">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { number: '40+', label: 'Years of Experience' },
                            { number: '10,000+', label: 'Happy Travelers' },
                            { number: '50+', label: 'Tour Packages' },
                            { number: '100%', label: 'Customer Satisfaction' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-5xl md:text-6xl font-serif text-ochre mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Board of Directors Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Board of Directors</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Honoring our founders and celebrating our continued legacy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Late Mr. Irfan Farook */}
                        <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-ochre hover:shadow-2xl hover:shadow-ochre/5 transition-all duration-300 group">
                            <div className="w-24 h-24 rounded-full bg-ochre/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-ochre group-hover:text-white transition-colors">
                                <span className="text-4xl opacity-50">✦</span>
                            </div>
                            <h3 className="text-2xl font-serif text-foreground mb-1">Late Mr. Irfan Farook</h3>
                            <p className="text-xs uppercase tracking-widest text-ochre mb-6">Founder</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                In loving memory of our visionary founder who established Lanka Vacations in 1984 and laid the foundation for excellence in Sri Lankan tourism. His passion, dedication, and commitment to authentic travel experiences continue to inspire us every day.
                            </p>
                        </div>

                        {/* Late Mrs. Cherahzarde Farook */}
                        <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-ochre hover:shadow-2xl hover:shadow-ochre/5 transition-all duration-300 group">
                            <div className="w-24 h-24 rounded-full bg-ochre/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-ochre group-hover:text-white transition-colors">
                                <span className="text-4xl opacity-50">✦</span>
                            </div>
                            <h3 className="text-2xl font-serif text-foreground mb-1">Late Mrs. Cherahzarde Farook</h3>
                            <p className="text-xs uppercase tracking-widest text-ochre mb-6">Co-Founder / CEO</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                In loving memory of our co-founder and CEO, whose instrumental leadership shaped Lanka Vacations into a leading destination management company. Her vision, dedication, and unwavering commitment to excellence and customer satisfaction continue to guide our company's values and mission.
                            </p>
                        </div>

                        {/* Mr. Aman Farook */}
                        <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-ochre hover:shadow-2xl hover:shadow-ochre/5 transition-all duration-300 group">
                            <div className="w-24 h-24 rounded-full bg-ochre/10 mx-auto mb-6 flex items-center justify-center group-hover:bg-ochre group-hover:text-white transition-colors">
                                <span className="text-4xl opacity-50">✦</span>
                            </div>
                            <h3 className="text-2xl font-serif text-foreground mb-1">Mr. Aman Farook</h3>
                            <p className="text-xs uppercase tracking-widest text-ochre mb-6">Director Planning and Operations</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                As the successor to the founders, Mr. Aman Farook brings fresh perspectives while honoring the company's rich heritage. His expertise in planning and operations ensures that Lanka Vacations continues to deliver exceptional travel experiences to guests from around the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Set Us Apart */}
            <section className="py-24 px-6 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-ochre text-sm font-medium tracking-wider uppercase mb-2 block">Our Distinction</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8">What Sets Us Apart</h2>
                            <ul className="space-y-6">
                                {[
                                    "Four decades of expertise in Sri Lankan tourism, with deep knowledge of every corner of the island.",
                                    "Tourist Board licensed, multilingual chauffeurs and national guides with extensive local knowledge.",
                                    "Trusted by world-renowned tour operators and travel agencies across the globe.",
                                    "Tailor-made itineraries designed around your interests, preferences, and budget."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-ochre/20 flex items-center justify-center shrink-0 mt-1">
                                            <Star className="w-3 h-3 text-ochre" />
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-ochre/10 rounded-3xl transform rotate-3 z-0"></div>
                            <img
                                src="https://images.unsplash.com/photo-1546282216-3e0e7a783786?auto=format&fit=crop&w=1000"
                                alt="Sri Lankan Tea Picker"
                                className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Memberships & Location */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Memberships */}
                        <div>
                            <h3 className="text-2xl font-serif text-foreground mb-8">Memberships</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {[
                                    { name: 'Sri Lanka Tourism Development Authority', badge: 'SLTDA' },
                                    { name: 'Tour Operators Association of Sri Lanka', badge: 'TOASL' },
                                    { name: 'International Travel & Tourism Excellence', badge: 'ITTE' }
                                ].map((m, i) => (
                                    <div key={i} className="bg-card border border-border p-6 rounded-xl text-center hover:border-ochre transition-colors">
                                        <span className="text-3xl font-bold text-ochre/20 mb-2 block">{m.badge}</span>
                                        <p className="text-xs font-medium text-muted-foreground">{m.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-card border border-border p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-ochre/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-2xl font-serif text-foreground mb-6">Our Location</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                The office of Lanka Vacations since 1990 is centrally located in the heart of Colombo. All five star hotels of Colombo, major shopping districts, airlines, banks, The Tourist Board offices and embassies are all located within a radius of two kilometers.
                            </p>
                            <div className="flex flex-col gap-3 text-sm text-foreground/80">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-ochre shrink-0" />
                                    <span>Lanka Vacations (Pvt) Ltd, 43 St Anthony's Mawatha, Colombo 00300, Sri Lanka</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-ochre shrink-0" />
                                    <span>+94 777 325 515</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-ochre shrink-0" />
                                    <span>clientservice@lanka-vacations.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
