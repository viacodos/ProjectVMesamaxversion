import { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface Package {
    package_id: number;
    package_name: string;
    package_type: string;
    description: string;
    duration_days: number;
    price_per_person_usd: number;
    per_person_cost: number;
    image_urls: string | null;
}

export const PackagesSection = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            setLoading(true);

            // Check cache first
            const cachedData = localStorage.getItem('packagesCache');
            const cacheTimestamp = localStorage.getItem('packagesCacheTimestamp');
            const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

            if (cachedData && cacheTimestamp) {
                const age = Date.now() - parseInt(cacheTimestamp);
                if (age < CACHE_DURATION) {
                    // Use cached data
                    setPackages(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
            }

            // Fetch from backend
            const response = await fetch('http://localhost:5000/api/packages');
            if (!response.ok) {
                throw new Error('Failed to fetch packages');
            }
            const data = await response.json();

            // Update cache
            localStorage.setItem('packagesCache', JSON.stringify(data));
            localStorage.setItem('packagesCacheTimestamp', Date.now().toString());

            setPackages(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load packages');
            console.error('Error fetching packages:', err);
        } finally {
            setLoading(false);
        }
    };

    const displayedPackages = packages.slice(currentIndex, currentIndex + 3);
    const canGoNext = currentIndex + 3 < packages.length;
    const canGoPrev = currentIndex > 0;

    const handleNext = () => {
        if (canGoNext) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (canGoPrev) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    if (loading) {
        return (
            <section className="py-20 px-6 container mx-auto">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ochre"></div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 px-6 container mx-auto">
                <div className="text-center text-muted-foreground">
                    <p>Unable to load packages. Please try again later.</p>
                </div>
            </section>
        );
    }

    if (packages.length === 0) {
        return (
            <section className="py-20 px-6 container mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-12 text-center">
                    Signature Experiences
                </h2>
                <div className="text-center text-muted-foreground">
                    <p>No packages available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-6 container mx-auto">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <p className="text-sm uppercase tracking-wider text-ochre mb-2">CURATED COLLECTIONS</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground">
                        Signature Experiences
                    </h2>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-3">
                    <button
                        onClick={handlePrev}
                        disabled={!canGoPrev}
                        className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all ${canGoPrev
                            ? 'hover:bg-ochre hover:border-ochre hover:text-white cursor-pointer'
                            : 'opacity-40 cursor-not-allowed'
                            }`}
                        aria-label="Previous packages"
                    >
                        <ArrowRight size={20} className="rotate-180" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!canGoNext}
                        className={`w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center transition-all ${canGoNext
                            ? 'hover:bg-ochre cursor-pointer'
                            : 'opacity-40 cursor-not-allowed'
                            }`}
                        aria-label="Next packages"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayedPackages.map((pkg) => {
                    const price = pkg.per_person_cost || pkg.price_per_person_usd;
                    const imageUrl = pkg.image_urls
                        ? (typeof pkg.image_urls === 'string' ? JSON.parse(pkg.image_urls)[0] : pkg.image_urls[0])
                        : null;

                    return (
                        <div
                            key={pkg.package_id}
                            className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-ochre transition-all duration-300 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative h-80 overflow-hidden bg-muted">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={pkg.package_name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ochre/20 to-ochre/5">
                                        <span className="text-muted-foreground">No Image</span>
                                    </div>
                                )}

                                {/* Duration Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                                    <Clock size={14} className="text-foreground" />
                                    <span className="text-sm font-medium text-foreground">
                                        {pkg.duration_days} Days
                                    </span>
                                </div>

                                {/* Price Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
                                    <p className="text-white/80 text-sm mb-1">Starting from</p>
                                    <p className="text-white text-3xl font-bold">
                                        ${price}
                                    </p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="mb-3">
                                    <span className="inline-block px-3 py-1 bg-ochre/10 text-ochre text-xs uppercase tracking-wider rounded-full">
                                        {pkg.package_type}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-serif text-foreground mb-4 group-hover:text-ochre transition-colors">
                                    {pkg.package_name}
                                </h3>

                                <button className="flex items-center gap-2 text-ochre hover:gap-3 transition-all group/btn">
                                    <span className="text-sm font-medium">View Itinerary</span>
                                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Indicator dots */}
            {packages.length > 3 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(packages.length / 3) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx * 3)}
                            className={`h-2 rounded-full transition-all ${Math.floor(currentIndex / 3) === idx
                                ? 'w-8 bg-ochre'
                                : 'w-2 bg-border hover:bg-ochre/50'
                                }`}
                            aria-label={`Go to page ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
