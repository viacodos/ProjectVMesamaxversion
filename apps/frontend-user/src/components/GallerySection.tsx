import { useState, useEffect, useRef } from 'react';
import { X, MapPin } from 'lucide-react';

interface GalleryImage {
    url: string;
    location: string;
    description: string;
}

export const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const images: GalleryImage[] = [
        {
            url: 'https://images.pexels.com/photos/32746347/pexels-photo-32746347.jpeg',
            location: 'Sigiriya Rock Fortress',
            description: 'Ancient rock fortress rising from the jungle'
        },
        {
            url: 'https://images.pexels.com/photos/32598848/pexels-photo-32598848.jpeg',
            location: 'Temple of the Tooth, Kandy',
            description: 'Sacred Buddhist temple in the last capital of ancient kings'
        },
        {
            url: 'https://images.pexels.com/photos/33130315/pexels-photo-33130315.jpeg',
            location: 'Colonial Architecture',
            description: 'Heritage buildings reflecting Sri Lanka\'s colonial past'
        },
        {
            url: 'https://images.pexels.com/photos/11718270/pexels-photo-11718270.jpeg',
            location: 'Tea Plantations, Nuwara Eliya',
            description: 'Rolling hills covered in lush tea gardens'
        },
        {
            url: 'https://images.pexels.com/photos/23506598/pexels-photo-23506598.jpeg',
            location: 'Southern Beaches',
            description: 'Pristine coastline with golden sands'
        },
        {
            url: 'https://images.pexels.com/photos/29644514/pexels-photo-29644514.jpeg',
            location: 'Wildlife Safari',
            description: 'Encounter majestic elephants in their natural habitat'
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 px-6 bg-background">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-serif text-ochre mb-4">
                        Moments Captured
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Experience the beauty of Sri Lanka through the lens of our travelers
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] bg-muted transition-all duration-700 ${isVisible
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                                }`}
                            style={{
                                transitionDelay: `${index * 100}ms`
                            }}
                        >
                            <img
                                src={image.url}
                                alt={image.location}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin className="w-4 h-4 text-ochre" />
                                        <p className="font-medium">{image.location}</p>
                                    </div>
                                    <p className="text-white/80 text-sm mt-2">{image.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
                        aria-label="Close image"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Image Container */}
                    <div
                        className="max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.location}
                            className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                        />

                        {/* Image Info */}
                        <div className="mt-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-white mb-2">
                                <MapPin className="w-5 h-5 text-ochre" />
                                <h3 className="text-2xl font-serif">{selectedImage.location}</h3>
                            </div>
                            <p className="text-white/80">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
