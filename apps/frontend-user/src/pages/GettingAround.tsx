

export const GettingAround = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-foreground">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Getting Around</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                <div className="bg-card p-8 rounded-2xl border border-border">
                    <h2 className="text-3xl font-serif mb-4">Private Chauffeur</h2>
                    <p className="text-muted-foreground">Travel in comfort with our fleet of luxury vehicles and experienced drivers.</p>
                </div>
                <div className="bg-card p-8 rounded-2xl border border-border">
                    <h2 className="text-3xl font-serif mb-4">Domestic Flights</h2>
                    <p className="text-muted-foreground">Save time and enjoy aerial views with Cinnamon Air connections.</p>
                </div>
            </div>
        </div>
    );
};
