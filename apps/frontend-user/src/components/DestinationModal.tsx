import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Camera, Calendar } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

interface DestinationModalProps {
    isOpen: boolean;
    onClose: () => void;
    destination: {
        title: string;
        category: string;
        description: string;
        image: string;
        location: string;
        activities: string[];
        gallery: string[];
    } | null;
}

export const DestinationModal = ({ isOpen, onClose, destination }: DestinationModalProps) => {
    if (!destination) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-0 z-[51] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                    >
                        <div className="bg-background w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl pointer-events-auto border border-border/10 custom-scrollbar">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-md"
                            >
                                <X size={24} />
                            </button>

                            {/* Hero Image */}
                            <div className="relative h-[40vh] sm:h-[50vh] w-full">
                                <img
                                    src={destination.image}
                                    alt={destination.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="px-3 py-1 bg-ochre/90 text-white text-xs font-medium rounded-full uppercase tracking-wider mb-3 inline-block">
                                        {destination.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mt-2">{destination.title}</h2>
                                    <div className="flex items-center text-muted-foreground mt-2">
                                        <MapPin size={16} className="mr-1 text-ochre" />
                                        <span>{destination.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Main Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div>
                                        <h3 className="text-xl font-medium mb-4 text-foreground">About the Destination</h3>
                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                            {destination.description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-medium mb-4 text-foreground">Why Visit?</h3>
                                        <ul className="space-y-3">
                                            {destination.activities.map((activity, index) => (
                                                <li key={index} className="flex items-start text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-ochre mt-2 mr-3 flex-shrink-0" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Sidebar / Gallery */}
                                <div className="space-y-8">
                                    <div className="bg-muted/30 p-6 rounded-xl border border-border/40">
                                        <h3 className="flex items-center text-lg font-medium mb-4">
                                            <Camera className="w-5 h-5 mr-2 text-ochre" />
                                            Photo Gallery
                                        </h3>
                                        <div className="grid grid-cols-2 gap-2">
                                            {destination.gallery.slice(0, 4).map((img, idx) => (
                                                <div key={idx} className="aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
                                                    <img
                                                        src={img}
                                                        alt={`Gallery ${idx + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-ochre/5 p-6 rounded-xl border border-ochre/10">
                                        <h3 className="flex items-center text-lg font-medium mb-3 text-ochre">
                                            <Calendar className="w-5 h-5 mr-2" />
                                            Best Time to Visit
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Year-round destination, but best enjoyed during the dry season for optimal sightseeing conditions.
                                        </p>
                                        <Button className="w-full mt-4 bg-ochre hover:bg-ochre/90 text-white">
                                            Add to Itinerary
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
