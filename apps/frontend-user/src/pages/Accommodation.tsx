import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

// Mock Data
const hotels = [
    {
        id: 'aliya-resort',
        name: 'Aliya Resort & Spa',
        location: 'Sigiriya',
        category: 'Deluxe',
        rating: 5,
        price: 'From $180/night',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
        description: 'Set amidst lush greenery with breathtaking views of Sigiriya Rock Fortress. Features an infinity pool, ayurvedic spa, and 4 dining options.',
        website: 'https://www.aliyaresort.com',
        featured: true,
        amenities: ['Infinity Pool', 'Spa', 'Free Wi-Fi', 'Multiple Dining']
    },
    {
        id: 'hotel-topaz',
        name: 'Hotel Topaz',
        location: 'Kandy',
        category: 'Standard',
        rating: 3,
        price: 'From $80/night',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop',
        description: 'Perched on a hill overlooking Kandy City, offering comfortable rooms and traditional hospitality.',
        website: '#',
        featured: false,
        amenities: ['City View', 'Pool', 'Restaurant']
    },
    {
        id: 'cinnamon-lodge',
        name: 'Cinnamon Lodge',
        location: 'Habarana',
        category: 'Superior',
        rating: 5,
        price: 'From $150/night',
        image: 'https://images.unsplash.com/photo-1571896349842-68c691079d00?q=80&w=2070&auto=format&fit=crop',
        description: 'A sanctuary for nature lovers, spread across 27 acres of wooded garden. Perfect base for exploring the Cultural Triangle.',
        website: '#',
        featured: false,
        amenities: ['Nature Trails', 'Large Pool', 'Organic Garden']
    },
    {
        id: 'grand-hotel',
        name: 'The Grand Hotel',
        location: 'Nuwara Eliya',
        category: 'Deluxe',
        rating: 5,
        price: 'From $220/night',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop',
        description: 'An iconic colonial masterpiece offering old-world charm, high tea on the lawn, and luxurious comfort in the cool hill country.',
        website: '#',
        featured: false,
        amenities: ['High Tea', 'Heated Pool', 'Billards Room']
    },
    {
        id: '98-acres',
        name: '98 Acres Resort',
        location: 'Ella',
        category: 'Boutique',
        rating: 4,
        price: 'From $250/night',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop',
        description: 'Elegant chalets nestled within a tea estate, offering stunning views of Little Adams Peak and the Ella Gap.',
        website: '#',
        featured: false,
        amenities: ['Panoramic Views', 'Tea Experience', 'Plunge Pools']
    },
    {
        id: 'jetwing-lighthouse',
        name: 'Jetwing Lighthouse',
        location: 'Galle',
        category: 'Deluxe',
        rating: 5,
        price: 'From $200/night',
        image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1974&auto=format&fit=crop',
        description: 'A Bawa masterpiece on the rocks of the southern coast. Defined by its unique architecture and dramatic ocean views.',
        website: '#',
        featured: false,
        amenities: ['Ocean View', 'Architectural Tour', 'Fine Dining']
    }
];

const categories = ['All', 'Standard', 'Superior', 'Deluxe', 'Boutique'];

export const Accommodation = () => {
    const [activeCategory, setActiveCategory] = useState('All');



    // Always include featured in All or if it matches category
    const displayHotels = activeCategory === 'All'
        ? hotels.filter(h => !h.featured)
        : hotels.filter(h => h.category === activeCategory);

    const featuredHotel = hotels.find(h => h.featured);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1571896349842-68c691079d00?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Accommodation"
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay for consistent text visibility */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-ochre font-medium tracking-[0.2em] uppercase mb-4 block"
                    >
                        Rest in Luxury
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Accommodation
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto"
                    >
                        From luxury resorts to charming boutique hotels, find your perfect stay.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Featured Hotel */}
                {featuredHotel && (activeCategory === 'All' || activeCategory === featuredHotel.category) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] bg-border flex-grow"></div>
                            <span className="text-ochre font-medium uppercase tracking-widest text-sm">Featured Property</span>
                            <div className="h-[1px] bg-border flex-grow"></div>
                        </div>

                        <div className="bg-card rounded-3xl overflow-hidden border border-border/50 shadow-xl grid md:grid-cols-2">
                            <div className="relative h-64 md:h-auto overflow-hidden group">
                                <img
                                    src={featuredHotel.image}
                                    alt={featuredHotel.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-ochre/10 text-ochre px-3 py-1 rounded-full text-xs font-medium border border-ochre/20">
                                        {featuredHotel.category}
                                    </span>
                                    <div className="flex text-yellow-500">
                                        {[...Array(featuredHotel.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">{featuredHotel.name}</h2>
                                <div className="flex items-center text-muted-foreground mb-6">
                                    <MapPin size={18} className="mr-2 text-ochre" />
                                    {featuredHotel.location}
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-8">
                                    {featuredHotel.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-8">
                                    {featuredHotel.amenities.map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-ochre"></div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Button className="bg-ochre hover:bg-ochre/90 text-white min-w-[140px]">
                                        Book Now
                                    </Button>
                                    <Button variant="outline" className="border-ochre/30 hover:border-ochre text-foreground group">
                                        Visit Website <ExternalLink size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-ochre text-white shadow-lg shadow-ochre/25 transform scale-105'
                                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {cat} Hotels
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {displayHotels.map((hotel) => (
                            <motion.div
                                layout
                                key={hotel.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-foreground shadow-sm">
                                        {hotel.price}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="text-xs font-medium text-ochre uppercase mb-1">{hotel.category}</div>
                                            <h3 className="text-xl font-serif text-foreground group-hover:text-ochre transition-colors">{hotel.name}</h3>
                                        </div>
                                        <div className="flex text-yellow-500 text-xs">
                                            {[...Array(hotel.rating)].map((_, i) => (
                                                <Star key={i} size={12} fill="currentColor" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                                        <MapPin size={14} className="mr-1" />
                                        {hotel.location}
                                    </div>

                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 h-10">
                                        {hotel.description}
                                    </p>

                                    <Button variant="outline" size="sm" className="w-full border-ochre/20 hover:border-ochre hover:bg-ochre/5 text-foreground">
                                        View Details
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {displayHotels.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No hotels found in this category.
                    </div>
                )}

            </div>
        </div>
    );
};
