import { Sparkles, Leaf, HeadphonesIcon } from 'lucide-react';

export const FeaturesStrip = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'Custom Itineraries',
            description: 'Tailored to your pace and interests'
        },
        {
            icon: Leaf,
            title: 'Sustainable Travel',
            description: 'Eco-friendly partners and stays'
        },
        {
            icon: HeadphonesIcon,
            title: 'Local Experts',
            description: '24/7 support from Colombo'
        }
    ];

    return (
        <section className="py-12 px-6 bg-ochre/5 border-y border-ochre/20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left"
                            >
                                <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center flex-shrink-0">
                                    <Icon className="text-ochre" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
