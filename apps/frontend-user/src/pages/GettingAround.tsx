import { motion } from 'framer-motion';
import { Car, Search, Bus, Train, Plane, MapPin, Gauge, Shield, Users, Wifi, Briefcase, Music, Clock, Info } from 'lucide-react';
import { Button } from '@project-v-redone/ui';
// @ts-ignore - Vite will handle this asset
import heroVideo from '@/../../../packages/ui/src/assets/132140-752588954_medium.mp4';

const vehicles = [
    {
        name: 'Luxury Sedan',
        capacity: '2-3 Passengers',
        luggage: '2 Large + 2 Small Suitcases',
        features: ['Air Conditioning', 'Leather Seating', 'Wi-Fi Onboard', 'English Speaking Chauffeur'],
        description: 'Perfect for couples or small families seeking comfort and privacy. travel in style with our modern fleet of sedans.',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
        icon: Car
    },
    {
        name: 'Luxury Micro Van',
        capacity: '4-7 Passengers',
        luggage: '4 Large + 3 Small Suitcases',
        features: ['Dual A/C', 'Adjustable Seats', 'Ample Legroom', 'Child Seat Available'],
        description: 'Ideal for families or small groups. Spacious interiors ensure a comfortable journey even on longer trips.',
        image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1974&auto=format&fit=crop',
        icon: Users
    },
    {
        name: 'Mini Coach',
        capacity: '8-15 Passengers',
        luggage: '10+ Large Suitcases',
        features: ['Mic & PA System', 'Reclining Seats', 'Overhead Racks', 'Cooler Box'],
        description: 'The ultimate choice for larger groups. Enjoy the camaraderie of group travel without compromising on personal space.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop',
        icon: Bus
    }
];

const otherTransport = [
    {
        name: 'Scenic Train Rides',
        description: 'Experience one of the world\'s most beautiful train journeys through misty tea plantations and rolling hills.',
        image: 'https://images.unsplash.com/photo-1566766096767-f5847fa2976d?q=80&w=2070&auto=format&fit=crop',
        icon: Train
    },
    {
        name: 'Domestic Flights',
        description: 'Save time and enjoy aerial views with Cinnamon Air or seaplane transfers to key destinations.',
        image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop',
        icon: Plane
    },
    {
        name: 'Tuk Tuk Safari',
        description: 'Immerse yourself in local culture with a fun and authentic three-wheeler ride through bustling towns.',
        image: 'https://images.unsplash.com/photo-1622312693766-411a36171804?q=80&w=2070&auto=format&fit=crop', // Replaced with a more generic travel image effectively
        icon: MapPin
    }
];

const features = [
    {
        title: 'Expert Chauffeur Guides',
        desc: 'Our drivers are not just licensed professionals but knowledgeable guides who share insights into our culture and history.',
        icon: Info
    },
    {
        title: 'Unlimited Flexibility',
        desc: 'Want to stop for a king coconut or a photo? We offer complete freedom to adjust your schedule as you travel.',
        icon: Clock
    },
    {
        title: 'Safety First',
        desc: 'Fully insured vehicles, regular maintenance checks, and defensive driving training ensure your complete peace of mind.',
        icon: Shield
    }
];

export const GettingAround = () => {
    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-ochre uppercase tracking-[0.2em] text-sm font-medium mb-4"
                    >
                        Journey in Comfort
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-6"
                    >
                        Getting Around Sri Lanka
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                    >
                        Comfortable, safe, and reliable transportation options tailored to your distinct travel needs.
                    </motion.p>
                </div>
            </section>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-background transition-colors duration-300">

                {/* Intro Text */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-serif mb-6 text-foreground">Our Private Fleet</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Travel across the island in our modern, air-conditioned vehicles. Each journey is accompanied by an experienced English-speaking chauffeur guide dedicated to your safety and comfort.
                    </p>
                </div>

                {/* Fleet Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-32">
                    {vehicles.map((vehicle, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-ochre/10 transition-all duration-500 flex flex-col"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={vehicle.image}
                                    alt={vehicle.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur p-2 rounded-full border border-border">
                                    <vehicle.icon className="w-5 h-5 text-ochre" />
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-serif mb-2 text-foreground">{vehicle.name}</h3>
                                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{vehicle.description}</p>

                                <div className="space-y-4 mb-8 flex-1">
                                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Users className="w-4 h-4 text-ochre" />
                                        <span>{vehicle.capacity}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                                        <Briefcase className="w-4 h-4 text-ochre" />
                                        <span>{vehicle.luggage}</span>
                                    </div>
                                    <div className="border-t border-border/50 my-4"></div>
                                    <ul className="grid grid-cols-1 gap-2">
                                        {vehicle.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <div className="w-1.5 h-1.5 rounded-full bg-ochre/50"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button variant="outline" className="w-full border-ochre/30 text-foreground hover:bg-ochre hover:text-white hover:border-ochre transition-all">
                                    Request Quote
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Other Transport Options */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="max-w-xl">
                            <span className="text-ochre text-sm font-medium tracking-wider uppercase mb-2 block">Beyond the Road</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-foreground">Unique Travel Experiences</h2>
                        </div>
                        <p className="text-muted-foreground max-w-sm mt-4 md:mt-0 text-sm md:text-right">
                            We arrange diverse modes of transport to add adventure and perspective to your Sri Lankan story.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {otherTransport.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <item.icon className="w-8 h-8 text-ochre mb-4" />
                                    <h3 className="text-2xl font-serif text-white mb-2">{item.name}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-card border border-border rounded-3xl p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-ochre/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10 text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">Why Travel With Us?</h2>
                        <p className="text-muted-foreground">Excellence in every mile of your journey</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-ochre/10 flex items-center justify-center mx-auto mb-6 text-ochre">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-serif text-foreground mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
