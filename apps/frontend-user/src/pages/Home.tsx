
import { HeroSection } from '../components/HeroSection';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { PackagesSection } from '../components/PackagesSection';
import { TourBuilderCTA } from '../components/TourBuilderCTA';
import { GallerySection } from '../components/GallerySection';
import { QuoteSection } from '../components/QuoteSection';
import { TestimonialsSection } from '../components/TestimonialsSection';

export const Home = () => {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />
            <FeaturesStrip />
            <PackagesSection />
            <TourBuilderCTA />
            <GallerySection />
            <QuoteSection />
            <TestimonialsSection />
        </div>
    );
};
