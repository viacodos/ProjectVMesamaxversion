

export const BuildTour = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-background text-foreground">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Build Your Tour</h1>
            <p className="mb-12 text-lg text-muted-foreground">
                Tell us your preferences and our AI will craft the perfect itinerary for you.
            </p>
            <div className="max-w-3xl mx-auto bg-card p-8 rounded-2xl border border-border">
                {/* Wizard Form Placeholder */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">When do you plan to travel?</label>
                        <input type="date" className="w-full bg-background border border-border rounded-lg p-3 text-foreground" />
                    </div>
                    <button className="bg-ochre text-white px-8 py-3 rounded-lg font-medium hover:bg-ochre/80 transition text-lg">
                        Start Planning
                    </button>
                </div>
            </div>
        </div>
    );
};
