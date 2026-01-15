import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Filter } from 'lucide-react';
import { DestinationModal } from '../components/DestinationModal';
import { Button } from '@project-v-redone/ui';
// @ts-ignore - Vite will handle this asset
import exploreVideo from '@/../../../packages/ui/src/assets/309435_tiny.mp4';

// Mock Data for Destinations
const destinations = [
    {
        id: 'sigiriya',
        title: 'Sigiriya',
        category: 'Heritage',
        location: 'Central Province',
        shortDesc: 'The Lion Rock Fortress in the sky',
        description: 'Sigiriya is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock around 180 meters high.',
        image: 'https://images.unsplash.com/photo-1566370460384-3b246a4da904?q=80&w=2070&auto=format&fit=crop',
        activities: ['Climb the Lion Rock', 'Explore the Royal Gardens', 'View the Ancient Frescoes', 'Visit the Mirror Wall'],
        gallery: [
            'https://images.unsplash.com/photo-1620619767323-b95a89183081?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588258524675-c61d35d28987?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590053955684-17c37603c629?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1625736300986-1bab49329156?q=80&w=1974&auto=format&fit=crop',
        ]
    },
    {
        id: 'ella',
        title: 'Ella',
        category: 'Nature',
        location: 'Uva Province',
        shortDesc: 'Scenic Hill Country Paradise',
        description: 'Ella is a small town in the Badulla District of Uva Province, Sri Lanka governed by an Urban Council. It is approximately 200 kilometres east of Colombo and is situated at an elevation of 1,041 metres above sea level. The area has a rich bio-diversity, dense with numerous varieties of flora and fauna.',
        image: 'https://images.unsplash.com/photo-1580910527373-c1f964a2c5a2?q=80&w=2070&auto=format&fit=crop',
        activities: ['Nine Arch Bridge', 'Little Adams Peak', 'Ella Rock Hike', 'Ravana Falls'],
        gallery: [
            'https://images.unsplash.com/photo-1588526363842-d610df667503?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1605626296336-c0c4c478440d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1620127508681-799ee5e46c75?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1622312675971-ce4882e334ae?q=80&w=2070&auto=format&fit=crop',
        ]
    },
    {
        id: 'galle',
        title: 'Galle',
        category: 'Coast & Culture',
        location: 'Southern Province',
        shortDesc: 'Colonial Charm by the Sea',
        description: 'Galle is a major city in Sri Lanka, situated on the southwestern tip, 119 km from Colombo. Galle is the administrative capital of Southern Province, Sri Lanka and is the district capital of Galle District. Detailed description of the fort and its history.',
        image: 'https://images.unsplash.com/photo-1548263594-a71ea65a857c?q=80&w=2071&auto=format&fit=crop',
        activities: ['Walk the Fort Ramparts', 'Visit the Lighthouse', 'Maritime Museum', 'Dutch Reformed Church'],
        gallery: [
            'https://images.unsplash.com/photo-1626008687258-a46ba3284f23?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1633454707168-b7a42168db7f?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1578335345704-566bc90a2a51?q=80&w=2070&auto=format&fit=crop',
        ]
    },
    {
        id: 'kandy',
        title: 'Kandy',
        category: 'Culture',
        location: 'Central Province',
        shortDesc: 'The Last Royal Capital',
        description: 'Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings\' era of Sri Lanka. The city lies in the midst of hills in the Kandy plateau, which crosses an area of tropical plantations, mainly tea.',
        image: 'https://images.unsplash.com/photo-1586076939943-469b6dc24696?q=80&w=2070&auto=format&fit=crop',
        activities: ['Temple of the Tooth', 'Peradeniya Botanical Gardens', 'Kandy Lake', 'Cultural Dance Show'],
        gallery: [
            'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1628097984850-25e62846879e?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540893072535-6433e24b480b?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615967657984-7b6139dc6282?q=80&w=2070&auto=format&fit=crop',
        ]
    },
    {
        id: 'mirissa',
        title: 'Mirissa',
        category: 'Beaches',
        location: 'Southern Province',
        shortDesc: 'Whales & Sunset Vibes',
        description: 'Mirissa is a small town on the south coast of Sri Lanka, located in the Matale District of the Southern Province. It is approximately 150 kilometres south of Colombo and is situated at an elevation of 4 metres above sea level. Mirissa\'s beach and night life make it a popular tourist destination.',
        image: 'https://images.unsplash.com/photo-1536040866296-5f65f058097d?q=80&w=1935&auto=format&fit=crop',
        activities: ['Whale Watching', 'Coconut Tree Hill', 'Surfing', 'Secret Beach'],
        gallery: [
            'https://images.unsplash.com/photo-1581440810488-8422312675971-ce4882e334ae?q=80&w=2070&auto=format&fit=crop', // Placeholder - using similar ID
            'https://images.unsplash.com/photo-1582260273763-718e8d8d77d1?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1586884618774-8b89416556e8?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1604313366367-93836d54da8e?q=80&w=2070&auto=format&fit=crop',
        ]
    },
    {
        id: 'yala',
        title: 'Yala',
        category: 'Wildlife',
        location: 'Southern/Uva Province',
        shortDesc: 'Leopards & Wilderness',
        description: 'Yala National Park is a huge area of forest, grassland and lagoons bordering the Indian Ocean, in southeast Sri Lanka. It’s home to wildlife such as leopards, elephants and crocodiles, as well as hundreds of bird species. Inland, Sithulpawwa is an ancient Buddhist monastery. Nearby caves contain centuries-old rock paintings.',
        image: 'https://images.unsplash.com/photo-1622543925562-q2070&auto=format&fit=crop', // Placeholder URL fix
        activities: ['Jeep Safari', 'Bird Watching', 'Sithulpawwa Temple', 'Beach Walks'],
        gallery: [
            'https://images.unsplash.com/photo-1563539040331-50da256b7cbe?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526723238053-066af4dcd295?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1623351375997-6a42a0333203?q=80&w=2066&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517173295842-834c89a03b60?q=80&w=2070&auto=format&fit=crop',
        ]
    }
];

// Fix Yala image URL manually as it was truncated
destinations[5].image = 'https://images.unsplash.com/photo-1623351375997-6a42a0333203?q=80&w=2066&auto=format&fit=crop';
destinations[4].gallery[0] = 'https://images.unsplash.com/photo-1582260273763-718e8d8d77d1?q=80&w=2070&auto=format&fit=crop'; // Fix Mirissa gallery

export const Explore = () => {
    const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
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
                        <source src={exploreVideo} type="video/mp4" />
                    </video>
                    {/* Dark overlay for consistent text visibility in both themes */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-ochre font-medium tracking-[0.2em] uppercase mb-4 block"
                    >
                        The Wonder of Asia
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white mb-6"
                    >
                        Explore Sri Lanka
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto"
                    >
                        From misty mountains to pristine beaches, discover the diverse landscapes and timeless culture of our island home.
                    </motion.p>
                </div>
            </div>

            {/* Filter/Search Bar (Visual Only for now) */}
            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-card border border-border/10 shadow-xl rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto backdrop-blur-md bg-opacity-95">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            className="w-full pl-10 pr-4 py-3 bg-muted/50 border-transparent focus:border-ochre/50 focus:ring-0 rounded-lg outline-none transition-all placeholder:text-muted-foreground"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-none">
                            <select className="appearance-none w-full md:w-48 pl-4 pr-10 py-3 bg-muted/50 border-transparent focus:border-ochre/50 focus:ring-0 rounded-lg outline-none transition-all text-muted-foreground cursor-pointer">
                                <option>All Categories</option>
                                <option>Beach</option>
                                <option>Heritage</option>
                                <option>Wildlife</option>
                                <option>Hill Country</option>
                            </select>
                            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                        </div>
                        <Button className="bg-ochre hover:bg-ochre/90 text-white min-w-[100px]">
                            Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Must-Visit Destinations</h2>
                    <div className="w-24 h-1 bg-ochre mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Handpicked locations that showcase the very best of Sri Lanka's heritage, nature, and coastal beauty.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group cursor-pointer h-full"
                            onClick={() => setSelectedDestination(dest)}
                        >
                            <div className="bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center text-xs font-medium mb-2 opacity-90">
                                            <MapPin size={12} className="mr-1 text-ochre" />
                                            {dest.location}
                                        </div>
                                        <h3 className="text-2xl font-serif">{dest.title}</h3>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-white transition-opacity">
                                        {dest.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                                        {dest.shortDesc}
                                    </p>
                                    <div className="flex items-center text-ochre font-medium text-sm group-hover:translate-x-1 transition-transform">
                                        View Details <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <DestinationModal
                isOpen={!!selectedDestination}
                onClose={() => setSelectedDestination(null)}
                destination={selectedDestination}
            />
        </div>
    );
};
