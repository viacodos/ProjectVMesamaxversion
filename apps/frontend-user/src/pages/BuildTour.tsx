import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Users, DollarSign, Map, Coffee, Compass, Check, ChevronRight, ChevronLeft,
    MapPin, Download, Share2, Phone, Mail, Loader2,
    Landmark, Mountain, Palmtree, Binoculars, Tent, Utensils, Activity,
    Hotel, BedDouble, Star, Crown, Zap
} from 'lucide-react';
import { Button } from '@project-v-redone/ui';

// Types for the form state
interface TourPreferences {
    planningType: 'destination' | 'experience';
    duration: string;
    adults: number;
    children: number;
    budget: string;
    interests: string[];
    pace: 'Relaxed' | 'Moderate' | 'Fast';
    accommodation: 'Standard' | 'Comfort' | 'Superior' | 'Luxury';
    mealPlan: 'Room Only' | 'Bed & Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive';
    activities: string[];
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

const INITIAL_STATE: TourPreferences = {
    planningType: 'experience',
    duration: '7 Days',
    adults: 2,
    children: 0,
    budget: '$1500-3000',
    interests: [],
    pace: 'Moderate',
    accommodation: 'Superior',
    mealPlan: 'Half Board',
    activities: [],
    user: { name: '', email: '', phone: '' }
};

// Informative Options with Lucide Icons
const INTEREST_OPTIONS = [
    {
        id: 'Cultural & Heritage',
        icon: Landmark,
        label: 'Cultural & Heritage',
        desc: 'Ancient cities, temples & UNESCO World Heritage sites'
    },
    {
        id: 'Nature & Scenery',
        icon: Mountain,
        label: 'Nature & Scenery',
        desc: 'Misty tea plantations, waterfalls & scenic trains'
    },
    {
        id: 'Wildlife & Nature',
        icon: Binoculars,
        label: 'Wildlife & Safari',
        desc: 'Jeep safaris, elephant gatherings & leopard spotting'
    },
    {
        id: 'Beaches & Relaxation',
        icon: Palmtree,
        label: 'Beach & Relaxation',
        desc: 'Golden sands, turquoise waters & coastal bliss'
    },
    {
        id: 'Adventure & Sports',
        icon: Compass,
        label: 'Adventure & Sports',
        desc: 'Hiking, surfing, rafting & outdoor thrills'
    },
    {
        id: 'Food & Local Experiences',
        icon: Utensils,
        label: 'Food & Culinary',
        desc: 'Authentic flavors, cooking classes & food tours'
    }
];

const PACE_OPTIONS = [
    { id: 'Relaxed', icon: Coffee, desc: 'Leisurely start, 1 major activity per day, ample downtime.' },
    { id: 'Moderate', icon: Activity, desc: 'Balanced itinerary, spread out sightseeing & relaxation.' },
    { id: 'Fast', icon: Zap, desc: 'Packed days, maximize sightseeing, early starts.' }
];

const ACCOMMODATION_OPTIONS = [
    { id: 'Standard', icon: Hotel, desc: 'Clean, comfortable 3-star equivalent hotels.' },
    { id: 'Comfort', icon: BedDouble, desc: 'Charming 3-4 star hotels with good amenities.' },
    { id: 'Superior', icon: Star, desc: 'Premium 4-5 star hotels and boutique stays.' },
    { id: 'Luxury', icon: Crown, desc: 'Top-tier 5-star luxury resorts and iconic hotels.' }
];

const ACTIVITY_OPTIONS = [
    'Whale Watching', 'Yala Safari', 'Tea Factory Tour', 'Sigiriya Climb',
    'Kandy Temple', 'Train Ride', 'Cooking Class', 'Ayurveda Spa'
];

export const BuildTour = () => {
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState<TourPreferences>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const updatePref = (field: keyof TourPreferences, value: any) => {
        setPreferences(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const generateItinerary = async () => {
        setLoading(true);
        try {
            // Infer traveler type for backend
            let travelerType = 'Solo traveler';
            if (preferences.adults === 2 && preferences.children === 0) travelerType = 'Couple';
            else if (preferences.children > 0) travelerType = 'Family with kids';
            else if (preferences.adults > 2) travelerType = 'Group of friends';

            const payload = {
                interests: preferences.interests[0] || 'Cultural & Heritage', // Primary interest
                duration: preferences.duration,
                travelerType,
                budget: preferences.budget,
                ...preferences
            };

            const response = await fetch('http://localhost:5000/api/expert-system/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (data.success) {
                setResult(data);
                nextStep(); // Move to result view
            }
        } catch (error) {
            console.error('Failed to generate tour:', error);
        } finally {
            setLoading(false);
        }
    };

    // --- Render Steps ---

    const renderStep1_Basics = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-ochre">Let's start with the basics</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="label-text block text-sm font-medium mb-1 text-foreground">Duration</label>
                    <select
                        className="w-full p-4 rounded-xl bg-background border border-input focus:border-ochre outline-none transition-colors text-foreground"
                        value={preferences.duration}
                        onChange={(e) => updatePref('duration', e.target.value)}
                    >
                        {['3-5 Days', '5-7 Days', '7-10 Days', '10-14 Days', 'More than 14 Days'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3">
                    <label className="label-text block text-sm font-medium mb-1 text-foreground">Budget (Per Person)</label>
                    <select
                        className="w-full p-4 rounded-xl bg-background border border-input focus:border-ochre outline-none transition-colors text-foreground"
                        value={preferences.budget}
                        onChange={(e) => updatePref('budget', e.target.value)}
                    >
                        {['Under $1,000', '$1,000 - $2,000', '$2,000 - $3,500', '$3,500 - $5,000', 'Above $5,000'].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-3 md:col-span-2">
                    <label className="label-text block text-sm font-medium mb-1 text-foreground">Travelers</label>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <span className="text-xs text-muted-foreground block mb-2">Adults</span>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="number" min="1"
                                    className="w-full p-4 pl-12 rounded-xl bg-background border border-input focus:border-ochre outline-none text-foreground"
                                    value={preferences.adults}
                                    onChange={(e) => updatePref('adults', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <span className="text-xs text-muted-foreground block mb-2">Children</span>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="number" min="0"
                                    className="w-full p-4 pl-12 rounded-xl bg-background border border-input focus:border-ochre outline-none text-foreground"
                                    value={preferences.children}
                                    onChange={(e) => updatePref('children', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep2_Interests = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-ochre">What interests you most?</h2>
            <p className="text-muted-foreground">Select all that apply</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTEREST_OPTIONS.map((interest) => (
                    <button
                        key={interest.id}
                        onClick={() => {
                            const newInterests = preferences.interests.includes(interest.id)
                                ? preferences.interests.filter(i => i !== interest.id)
                                : [...preferences.interests, interest.id];
                            updatePref('interests', newInterests);
                        }}
                        className={`p-6 rounded-xl border text-left transition-all duration-300 flex items-start gap-4 hover:shadow-lg ${preferences.interests.includes(interest.id)
                                ? 'border-ochre bg-ochre/10 shadow-[0_0_15px_rgba(217,119,6,0.2)]'
                                : 'border-border bg-card hover:bg-muted'
                            }`}
                    >
                        <div className={`p-3 rounded-full shrink-0 ${preferences.interests.includes(interest.id) ? 'bg-ochre text-white' : 'bg-muted text-ochre'}`}>
                            <interest.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="font-medium text-foreground block text-lg mb-1">{interest.label}</span>
                            <span className="text-sm text-muted-foreground leading-relaxed">{interest.desc}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStep3_Style = () => (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-ochre">Your Travel Style</h2>

            <div className="space-y-6">
                <div>
                    <label className="label-text mb-4 block text-sm font-medium text-foreground">Pace of Travel</label>
                    <div className="grid md:grid-cols-3 gap-4">
                        {PACE_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => updatePref('pace', opt.id as any)}
                                className={`p-5 rounded-xl border text-left transition-all h-full flex flex-col hover:shadow-md ${preferences.pace === opt.id
                                        ? 'border-ochre bg-ochre/10'
                                        : 'border-border bg-card hover:bg-muted'
                                    }`}
                            >
                                <div className={`mb-3 ${preferences.pace === opt.id ? 'text-ochre' : 'text-muted-foreground'}`}>
                                    <opt.icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium text-foreground block mb-2">{opt.id}</span>
                                <span className="text-xs text-muted-foreground">{opt.desc}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="label-text mb-4 block text-sm font-medium text-foreground">Accommodation Preference</label>
                    <div className="grid md:grid-cols-2 gap-4">
                        {ACCOMMODATION_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => updatePref('accommodation', opt.id as any)}
                                className={`p-5 rounded-xl border text-left transition-all flex items-center gap-4 hover:shadow-md ${preferences.accommodation === opt.id
                                        ? 'border-ochre bg-ochre/10'
                                        : 'border-border bg-card hover:bg-muted'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${preferences.accommodation === opt.id ? 'bg-ochre text-white' : 'bg-muted text-muted-foreground'}`}>
                                    <opt.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="font-medium text-foreground block">{opt.id}</span>
                                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4_Details = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-ochre">Almost there...</h2>

            <div className="space-y-6">
                <div>
                    <label className="label-text mb-4 block text-sm font-medium text-foreground">Meal Plan</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Room Only', 'Bed & Breakfast', 'Half Board', 'Full Board', 'All Inclusive'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => updatePref('mealPlan', opt as any)}
                                className={`p-4 rounded-xl border text-sm font-medium transition-all ${preferences.mealPlan === opt
                                        ? 'border-ochre bg-ochre text-white'
                                        : 'border-border bg-card text-foreground hover:bg-muted'
                                    }`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="label-text mb-4 block text-sm font-medium text-foreground">Special Excursions (Optional)</label>
                    <div className="flex flex-wrap gap-3">
                        {ACTIVITY_OPTIONS.map((act) => (
                            <button
                                key={act}
                                onClick={() => {
                                    const newActs = preferences.activities.includes(act)
                                        ? preferences.activities.filter(a => a !== act)
                                        : [...preferences.activities, act];
                                    updatePref('activities', newActs);
                                }}
                                className={`px-4 py-2 rounded-full border text-sm transition-all ${preferences.activities.includes(act)
                                        ? 'border-ochre bg-ochre text-white'
                                        : 'border-border bg-card hover:bg-muted text-muted-foreground'
                                    }`}
                            >
                                {act}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep5_Contact = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-serif text-ochre">Where should we send your itinerary?</h2>

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="text" placeholder="Your Name"
                        className="w-full p-4 rounded-xl bg-background border border-input focus:border-ochre outline-none text-foreground pl-4"
                        value={preferences.user.name}
                        onChange={(e) => setPreferences(prev => ({ ...prev, user: { ...prev.user, name: e.target.value } }))}
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="email" placeholder="Email Address"
                        className="w-full p-4 rounded-xl bg-background border border-input focus:border-ochre outline-none text-foreground pl-4"
                        value={preferences.user.email}
                        onChange={(e) => setPreferences(prev => ({ ...prev, user: { ...prev.user, email: e.target.value } }))}
                    />
                </div>
                <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="tel" placeholder="Phone Number"
                        className="w-full p-4 rounded-xl bg-background border border-input focus:border-ochre outline-none text-foreground pl-4"
                        value={preferences.user.phone}
                        onChange={(e) => setPreferences(prev => ({ ...prev, user: { ...prev.user, phone: e.target.value } }))}
                    />
                </div>
            </div>

            <div className="pt-4">
                <Button
                    onClick={generateItinerary}
                    disabled={loading}
                    className="w-full py-6 text-lg bg-ochre hover:bg-ochre-dark text-white font-semibold"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin" /> Generating Experience...
                        </span>
                    ) : 'Generate My Itinerary'}
                </Button>
            </div>
        </div>
    );

    const renderItinerary = () => {
        if (!result) return null;
        const mainPackage = result.matching_packages[0];

        // Ensure we handle the case where no package matches
        if (!mainPackage) {
            return (
                <div className="text-center py-20 animate-in fade-in">
                    <h2 className="text-3xl font-serif text-foreground mb-4">We're crafting something unique</h2>
                    <p className="text-muted-foreground mb-8">Our expert system needs a bit more detail to find the perfect match. Please get in touch with our travel specialists.</p>
                    <Button className="bg-ochre text-white font-bold">Contact Us</Button>
                </div>
            )
        }

        return (
            <div className="animate-in fade-in zoom-in-95 duration-700 space-y-8">
                {/* Header */}
                <div className="text-center border-b border-border pb-8">
                    <span className="text-ochre text-sm uppercase tracking-widest mb-2 block">Your Personalized Journey</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-6">{mainPackage.package_name}</h1>

                    <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-foreground">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                            <Calendar className="w-4 h-4 text-ochre" />
                            <span>{preferences.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                            <Users className="w-4 h-4 text-ochre" />
                            <span>{preferences.adults} Adults, {preferences.children} Kids</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                            <DollarSign className="w-4 h-4 text-ochre" />
                            <span>${Math.round(mainPackage.price_per_person_usd)} / person</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map Placeholder */}
                        <div className="aspect-video bg-muted rounded-2xl border border-border flex items-center justify-center relative overflow-hidden group">
                            {/* Static map fallback or interactive map */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80')] bg-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                            <Button variant="outline" className="relative z-10 bg-background/50 backdrop-blur border-border text-foreground gap-2">
                                <Map className="w-4 h-4" /> View Interactive Map
                            </Button>
                        </div>

                        {/* Itinerary Highlights */}
                        <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                            <h3 className="text-2xl font-serif text-foreground mb-6">Trip Highlights</h3>
                            <div className="space-y-6">
                                {result.recommended_cities.map((city: any, i: number) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="w-10 h-10 rounded-full bg-ochre/20 border border-ochre/30 flex items-center justify-center shrink-0 mt-1 pb-1 group-hover:bg-ochre group-hover:text-white transition-colors">
                                            <span className="text-ochre font-serif text-lg group-hover:text-white">{i + 1}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-foreground text-xl mb-1">{city.destination_name}</h4>
                                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                                                {city.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Included Services */}
                        <div className="grid md:grid-cols-2 gap-6 text-foreground/80">
                            <div className="bg-card p-6 rounded-xl border border-border">
                                <h4 className="flex items-center gap-2 font-serif text-lg text-foreground mb-4">
                                    <Check className="text-green-500 w-5 h-5" /> What's Included
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> Luxury Accommodation</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> Private AC Transport</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> English Speaking Chauffeur</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> Daily Breakfast & Dinner</li>
                                </ul>
                            </div>
                            <div className="bg-card p-6 rounded-xl border border-border">
                                <h4 className="flex items-center gap-2 font-serif text-lg text-foreground mb-4">
                                    <Compass className="text-ochre w-5 h-5" /> Travel Notes
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> Visa Assistance Included</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> 24/7 Concierge Support</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-ochre shrink-0" /> Flexible Cancellation</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-card p-8 rounded-2xl border border-border sticky top-24 shadow-lg">
                            <div className="mb-6">
                                <span className="text-sm text-muted-foreground uppercase tracking-wider">Total Estimate</span>
                                <div className="text-5xl font-serif text-ochre mt-2">
                                    ${Math.round(mainPackage.price_per_person_usd * (preferences.adults + preferences.children))}
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
                                    *Based on {preferences.adults + preferences.children} travelers. Final price may vary based on seasonal availability.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full py-6 text-lg bg-ochre hover:bg-ochre-dark text-white border-0 shadow-lg shadow-ochre/20">
                                    Book This Trip
                                </Button>
                                <Button variant="outline" className="w-full py-6 border-input hover:bg-accent text-foreground">
                                    Enquire Now
                                </Button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border flex justify-between">
                                <button className="flex flex-col items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition group">
                                    <div className="p-3 rounded-full bg-mutated group-hover:bg-ochre/20 transition-colors"><Download className="w-4 h-4 group-hover:text-ochre" /></div>
                                    Download
                                </button>
                                <button className="flex flex-col items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition group">
                                    <div className="p-3 rounded-full bg-mutated group-hover:bg-ochre/20 transition-colors"><Share2 className="w-4 h-4 group-hover:text-ochre" /></div>
                                    Share
                                </button>
                                <button className="flex flex-col items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition group">
                                    <div className="p-3 rounded-full bg-mutated group-hover:bg-ochre/20 transition-colors"><Phone className="w-4 h-4 group-hover:text-ochre" /></div>
                                    Call Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-20 bg-background text-foreground relative transition-colors duration-300">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>

            <div className="relative z-10">
                {!result ? (
                    <div className="max-w-4xl mx-auto">
                        {/* Progress Bar */}
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-center text-foreground">Design Your Journey</h1>
                            <div className="h-1 bg-muted rounded-full overflow-hidden max-w-md mx-auto">
                                <motion.div
                                    className="h-full bg-ochre"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 5) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <div className="flex justify-between max-w-md mx-auto mt-3 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                                <span>Start Journey</span>
                                <span>Final Review</span>
                            </div>
                        </div>

                        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-ochre/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <div className="relative z-10">
                                {step === 1 && renderStep1_Basics()}
                                {step === 2 && renderStep2_Interests()}
                                {step === 3 && renderStep3_Style()}
                                {step === 4 && renderStep4_Details()}
                                {step === 5 && renderStep5_Contact()}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-12 pt-8 border-t border-border relative z-10">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                    className={`text-muted-foreground hover:text-foreground ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                                </Button>

                                {step < 5 && (
                                    <Button
                                        onClick={nextStep}
                                        className="bg-ochre hover:bg-ochre-dark px-8 text-white font-semibold border-0"
                                    >
                                        Continue <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        <Button
                            variant="ghost"
                            onClick={() => setResult(null)}
                            className="mb-8 text-muted-foreground hover:text-foreground"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Design Another Trip
                        </Button>
                        {renderItinerary()}
                    </div>
                )}
            </div>
        </div>
    );
};
