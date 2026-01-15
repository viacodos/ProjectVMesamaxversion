import { useNavigate } from 'react-router-dom';
import { Wand2, ArrowRight } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

export const TourBuilderCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-6 bg-gradient-to-br from-ochre/10 via-background to-background">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-ochre/10 text-ochre px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Wand2 size={16} />
                        <span>AI-Powered Planning</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                        Design Your Dream Tour in Minutes
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Answer a few simple questions and let our intelligent system craft a personalized itinerary tailored to your preferences, budget, and travel style.
                    </p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-ochre font-bold text-lg">1</span>
                            </div>
                            <h3 className="font-medium text-foreground mb-2">Share Preferences</h3>
                            <p className="text-sm text-muted-foreground">Tell us what you love</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-ochre font-bold text-lg">2</span>
                            </div>
                            <h3 className="font-medium text-foreground mb-2">AI Creates Plan</h3>
                            <p className="text-sm text-muted-foreground">Intelligent itinerary generation</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                                <span className="text-ochre font-bold text-lg">3</span>
                            </div>
                            <h3 className="font-medium text-foreground mb-2">Customize & Book</h3>
                            <p className="text-sm text-muted-foreground">Fine-tune and confirm</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate('/build-tour')}
                            className="bg-ochre hover:bg-ochre-dark text-white px-8 py-6 text-lg font-medium rounded-xl flex items-center justify-center gap-2 group"
                        >
                            Start Building Now
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            onClick={() => navigate('/tours')}
                            variant="outline"
                            className="border-border hover:border-ochre hover:bg-ochre/5 px-8 py-6 text-lg rounded-xl"
                        >
                            Browse Packages
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
