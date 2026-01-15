export const GallerySection = () => {
    // Placeholder images - will be replaced with actual Sri Lanka images
    const images = [
        { id: 1, alt: 'Sigiriya Rock', span: 'md:col-span-2 md:row-span-2' },
        { id: 2, alt: 'Tea Plantations', span: '' },
        { id: 3, alt: 'Wildlife Safari', span: '' },
        { id: 4, alt: 'Buddhist Temple', span: '' },
        { id: 5, alt: 'Beach Sunset', span: 'md:col-span-2' },
    ];

    return (
        <section className="py-20 px-6 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                        Moments Captured
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A glimpse into the beauty of Sri Lanka
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {/* Quote Card */}
                    <div className="md:col-span-2 bg-gradient-to-br from-ochre to-ochre-dark rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                        <p className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight">
                            "The Pearl of the Indian Ocean"
                        </p>
                        <p className="text-white/80 text-sm">
                            Discover ancient wonders and natural beauty
                        </p>
                    </div>

                    {images.map((image) => (
                        <div
                            key={image.id}
                            className={`relative overflow-hidden rounded-2xl bg-muted group ${image.span}`}
                        >
                            {/* Placeholder gradient - replace with actual images */}
                            <div className="absolute inset-0 bg-gradient-to-br from-ochre/20 via-ochre/10 to-transparent group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-muted-foreground text-sm">{image.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        📸 Images coming soon - Showcase the beauty of Sri Lanka
                    </p>
                </div>
            </div>
        </section>
    );
};
