import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
    const testimonials = [
        {
            name: 'Sarah Jenkins',
            location: 'United Kingdom',
            date: 'November 2023',
            rating: 5,
            text: 'An absolutely magical experience! The attention to detail and personalized service made our Sri Lankan adventure unforgettable. Every moment was perfectly curated.',
            avatar: 'SJ'
        },
        {
            name: 'Michael Chen',
            location: 'Singapore',
            date: 'October 2023',
            rating: 5,
            text: 'From the stunning temples to the pristine beaches, every day was a new discovery. The local guides were knowledgeable and the accommodations were exceptional.',
            avatar: 'MC'
        },
        {
            name: 'Emma Williams',
            location: 'Australia',
            date: 'September 2023',
            rating: 5,
            text: 'Best travel decision we ever made! The custom itinerary was perfect for our family. The kids loved the wildlife safaris and we loved the cultural experiences.',
            avatar: 'EW'
        }
    ];

    return (
        <section className="py-20 px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
                        What Our Travelers Say
                    </h2>
                    <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="text-ochre fill-ochre" size={24} />
                        ))}
                    </div>
                    <p className="text-lg text-muted-foreground">
                        Based on 1,000+ verified reviews
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border rounded-2xl p-6 hover:border-ochre transition-all duration-300 hover:shadow-lg"
                        >
                            <Quote className="text-ochre/30 mb-4" size={32} />

                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="text-ochre fill-ochre" size={16} />
                                ))}
                            </div>

                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className="w-12 h-12 rounded-full bg-ochre/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-ochre font-semibold">{testimonial.avatar}</span>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.location} • {testimonial.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
