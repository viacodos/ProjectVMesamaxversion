

export const Explore = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-foreground">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Explore Sri Lanka</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-12">
                Discover the pearl of the Indian Ocean. From misty mountains to pristine beaches.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Destination Cards will go here */}
                <div className="bg-card h-64 rounded-xl border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Destination Grid Loading...</span>
                </div>
            </div>
        </div>
    );
};
