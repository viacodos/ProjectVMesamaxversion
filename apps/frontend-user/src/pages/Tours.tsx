

export const Tours = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-foreground">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Curated Tours</h1>
            <div className="grid grid-cols-1 gap-8">
                {/* Tour List Items */}
                <div className="bg-card h-48 rounded-xl border border-border p-6">
                    <h3 className="text-2xl font-serif mb-2">Classic Island Tour</h3>
                    <p className="text-muted-foreground">14 Days · Cultural Triangle & Beaches</p>
                </div>
            </div>
        </div>
    );
};
