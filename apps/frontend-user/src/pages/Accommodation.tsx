

export const Accommodation = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-foreground">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Accommodation</h1>
            <p className="mb-12 text-lg text-muted-foreground">
                Luxurious stays in the heart of nature.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hotel Cards */}
                <div className="bg-card h-64 rounded-xl border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Hotel Listings Loading...</span>
                </div>
            </div>
        </div>
    );
};
