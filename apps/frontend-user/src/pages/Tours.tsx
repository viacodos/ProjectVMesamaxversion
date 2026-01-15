import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, ArrowRight, Filter, DollarSign } from 'lucide-react';
import { Button } from '@project-v-redone/ui';
// @ts-ignore - Vite will handle this asset
import toursHeroVideo from '@/../../../packages/ui/src/assets/286459_tiny.mp4';

// Mock Data for Tours - Curated from reference site research
// TODO: Fetch from /api/packages once admin features allow creating new tours
const tours = [
    {
        id: 'custom-tour',
        title: 'Custom Tour',
        duration: '1 Day',
        price: null, // "Get Quote"
        description: 'Create your perfect Sri Lankan adventure with our personalized tour planning service.',
        highlights: ['Personalized Itinerary', 'Flexible Schedule', 'Expert Guide'],
        image: 'https://images.unsplash.com/photo-1590602392766-38290e290822?q=80&w=2070&auto=format&fit=crop',
        category: 'Flexible'
    },
    {
        id: 'mini-tour',
        title: 'Mini Tour Sri Lanka',
        duration: '4 Days / 3 Nights',
        price: 350,
        description: 'A quick yet comprehensive glimpse into the cultural heart of Sri Lanka.',
        highlights: ['Temple of the Tooth', 'Peradeniya Gardens', 'Elephant Orphanage'],
        image: 'https://images.unsplash.com/photo-1578564969245-0d674640164c?q=80&w=2070&auto=format&fit=crop',
        category: 'Culture'
    },
    {
        id: 'culture-heritage',
        title: 'Culture & Heritage',
        duration: '6 Days / 5 Nights',
        price: 550,
        description: 'Immerse yourself in 2500 years of history with visits to ancient cities and sacred sites.',
        highlights: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Polonnaruwa ruins'],
        image: 'https://images.unsplash.com/photo-1544258833-2868175d7149?q=80&w=2070&auto=format&fit=crop',
        category: 'Heritage'
    },
    {
        id: 'tropical-sri-lanka',
        title: 'Tropical Sri Lanka',
        duration: '8 Days / 7 Nights',
        price: 690,
        description: 'The perfect blend of beach relaxation and wildlife adventure.',
        highlights: ['Minneriya Safari', 'Pristine Beaches', 'Hill Country Train'],
        image: 'https://images.unsplash.com/photo-1537249011553-925cb5110ebf?q=80&w=1974&auto=format&fit=crop',
        category: 'Wildlife'
    },
    {
        id: 'classic-sri-lanka',
        title: 'Classic Sri Lanka',
        duration: '11 Days / 10 Nights',
        price: 980,
        description: 'Our most popular tour covering all major attractions from culture to coast.',
        highlights: ['Comprehensive Island Tour', 'Tea Plantations', 'Coastal Forts'],
        image: 'https://images.unsplash.com/photo-1566370460384-3b246a4da904?q=80&w=2070&auto=format&fit=crop',
        category: 'Luxury'
    }
];

export const Tours = () => {
    const [filterCategory, setFilterCategory] = useState('All');

    const filteredTours = filterCategory === 'All'
        ? tours
        : tours.filter(tour => tour.category === filterCategory);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={toursHeroVideo} type="video/mp4" />
                    </video>
                    {/* Dark overlay for consistent text visibility */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-ochre font-medium tracking-[0.2em] uppercase mb-4 block"
                    >
                        Discover Our Packages
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Our Tours
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto"
                    >
                        Carefully crafted itineraries to showcase the best of Sri Lanka, from ancient ruins to golden shores.
                    </motion.p>
                </div>
            </div>

            {/* Filter/Search Bar */}
            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-card border border-border/10 shadow-xl rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto backdrop-blur-md bg-opacity-95">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search tours..."
                            className="w-full pl-10 pr-4 py-3 bg-muted/50 border-transparent focus:border-ochre/50 focus:ring-0 rounded-lg outline-none transition-all placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <select
                            className="appearance-none w-full md:w-48 px-4 py-3 bg-muted/50 border-transparent focus:border-ochre/50 focus:ring-0 rounded-lg outline-none transition-all text-muted-foreground cursor-pointer"
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Culture">Culture</option>
                            <option value="Heritage">Heritage</option>
                            <option value="Wildlife">Wildlife</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                        <Button className="bg-ochre hover:bg-ochre/90 text-white min-w-[100px]">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tours Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTours.map((tour, index) => (
                        <motion.div
                            key={tour.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group h-full"
                        >
                            <div className="bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                                        {tour.duration}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <div className="text-xs font-medium text-ochre uppercase tracking-wider mb-2">
                                            {tour.category}
                                        </div>
                                        <h3 className="text-2xl font-serif mb-2 group-hover:text-ochre transition-colors">{tour.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {tour.description}
                                        </p>
                                    </div>

                                    <div className="space-y-2 mb-6 flex-grow">
                                        {tour.highlights.map((highlight, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                                <div className="w-1.5 h-1.5 rounded-full bg-ochre/60 mr-2" />
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                                        <div>
                                            {tour.price ? (
                                                <>
                                                    <span className="text-xs text-muted-foreground block">From</span>
                                                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ochre to-orange-500">
                                                        ${tour.price}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground ml-1">/ person</span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-bold text-foreground">Get Quote</span>
                                            )}
                                        </div>
                                        <Button variant="outline" className="group-hover:bg-ochre group-hover:text-white border-ochre/20 hover:border-ochre transition-all">
                                            View Details <ArrowRight size={16} className="ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
