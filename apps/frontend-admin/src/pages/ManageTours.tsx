import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X, Eye, AlertTriangle, Check, ArrowRight, Palmtree, MapPin } from 'lucide-react';
import { Button, Input, Label, Textarea, Card, CardContent, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@project-v-redone/ui';



interface ItineraryDay {
    title: string;
    description: string; // Small description
    activities: string; // Bullet points
    meals: string;
}

interface TourPackage {
    package_id?: string;
    package_name: string;
    short_description: string;
    description: string; // Overview
    highlights: string; // Stored as newline separated string for editing, array for API
    map_url: string;
    duration_days: number;
    destinations: string[]; // Journey
    itinerary: ItineraryDay[];

    image_url: string;
    gallery: string[];

    package_type: string;
    price_per_person_usd: number;
    inclusions: string;
    exclusions: string;
    important_notes: string;
}

const INITIAL_DAY: ItineraryDay = { title: '', description: '', activities: '', meals: 'Breakfast' };

const INITIAL_FORM: TourPackage = {
    package_name: '',
    short_description: '',
    description: '',
    highlights: '',
    map_url: '',
    duration_days: 4,
    destinations: ['', '', '', ''],
    itinerary: [
        { ...INITIAL_DAY }, { ...INITIAL_DAY }, { ...INITIAL_DAY }, { ...INITIAL_DAY }
    ],
    image_url: '',
    gallery: ['', '', '', '', ''],
    package_type: 'Cultural',
    price_per_person_usd: 0,
    inclusions: '',
    exclusions: '',
    important_notes: '',
};

// --- PREVIEW COMPONENTS ---

const TourCardPreview = ({ tour, onClick }: { tour: TourPackage, onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`tour-${tour.package_name}`}
            className="group cursor-pointer relative h-[450px] w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            onClick={onClick}
        >
            <div className="h-2/3 relative overflow-hidden">
                <img
                    src={tour.image_url || 'https://images.unsplash.com/photo-1586617838634-93dd26b2302a'}
                    alt={tour.package_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold border border-white/30">
                    {tour.duration_days} Days
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-1">{tour.package_name || 'Tour Name'}</h3>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                        <MapPin size={12} />
                        {tour.destinations.filter(d => d).length > 0 ? tour.destinations.filter(d => d).join(' - ') : 'Sri Lanka Route'}
                    </div>
                </div>
            </div>
            <div className="h-1/3 p-6 flex flex-col justify-between">
                <p className="text-sm text-gray-600 line-clamp-3">
                    {tour.short_description || 'Experience the wonder of Sri Lanka with this curated journey...'}
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-ochre">${tour.price_per_person_usd || 0}</span>
                    <button className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-ochre transition-colors flex items-center gap-1">
                        View Details <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};


export const ManageTours = () => {
    const [activeTab, setActiveTab] = useState<'manage' | 'add'>('manage');
    const [formData, setFormData] = useState<TourPackage>(INITIAL_FORM);
    const [tours, setTours] = useState<any[]>([]); // simplified type for list
    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const getToken = () => localStorage.getItem('adminToken');

    const fetchTours = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/packages');
            const data = await res.json();
            if (data.success) setTours(data.packages);
        } catch (e) {
            console.error("Fetch failed", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'manage') fetchTours();
    }, [activeTab]);

    // -- FORM HANDLERS --

    const handleBasicChange = (field: keyof TourPackage, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleDurationChange = (days: number) => {
        const newItinerary = [...formData.itinerary];

        if (days > newItinerary.length) {
            // Add days
            for (let i = newItinerary.length; i < days; i++) {
                newItinerary.push({ ...INITIAL_DAY });
            }
        } else {
            // Remove days
            newItinerary.splice(days);
        }

        // Adjust destination inputs roughly (optional, just keeping array size manageable)
        // keeping destinations flexible size mostly

        setFormData(prev => ({ ...prev, duration_days: days, itinerary: newItinerary }));
    };

    const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: string) => {
        const newItinerary = [...formData.itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        setFormData(prev => ({ ...prev, itinerary: newItinerary }));
    };

    const handleDestinationChange = (index: number, value: string) => {
        const newDestinations = [...formData.destinations];
        newDestinations[index] = value;
        setFormData(prev => ({ ...prev, destinations: newDestinations }));
    };

    const addDestinationField = () => {
        setFormData(prev => ({ ...prev, destinations: [...prev.destinations, ''] }));
    };

    const removeDestinationField = (index: number) => {
        const newD = [...formData.destinations];
        newD.splice(index, 1);
        setFormData(prev => ({ ...prev, destinations: newD }));
    };

    // -- SUBMIT --
    const isFormValid = formData.package_name && formData.image_url && formData.description;

    const handleSubmit = async () => {
        setShowConfirmation(false);
        setIsLoading(true);
        try {
            const token = getToken();
            const payload = {
                ...formData,
                highlights: formData.highlights.split('\n').filter(h => h.trim()),
                destinations: formData.destinations.filter(d => d.trim()),
                // itinerary is already array
                gallery: formData.gallery.filter(g => g.trim()),
            };

            const res = await fetch('http://localhost:5000/api/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                setFormData(INITIAL_FORM);
                setActiveTab('manage');
                fetchTours();
            } else {
                alert(data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Submission failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* FLOATING TABS */}
            <div className="sticky top-4 z-40 flex justify-center w-full pointer-events-none">
                <div className="bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg rounded-full p-1 pointer-events-auto flex items-center gap-1">
                    <button
                        onClick={() => setActiveTab('manage')}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'manage' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {activeTab === 'manage' && (
                            <motion.div layoutId="activetourtab" className="absolute inset-0 bg-green-600 rounded-full shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                        )}
                        <span className="relative z-10 flex items-center gap-2"><Palmtree size={16} /> Manage Tours</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'add' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {activeTab === 'add' && (
                            <motion.div layoutId="activetourtab" className="absolute inset-0 bg-green-600 rounded-full shadow-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                        )}
                        <span className="relative z-10 flex items-center gap-2"><Plus size={16} /> Add Tour</span>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'manage' ? (
                    <motion.div
                        key="manage"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-border/50">
                            <h2 className="text-2xl font-serif font-bold">Tour Packages</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tours.map((t) => (
                                        <TableRow key={t.package_id}>
                                            <TableCell>
                                                <img src={t.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium whitespace-nowrap">{t.package_name}</TableCell>
                                            <TableCell>{t.duration_days} Days</TableCell>
                                            <TableCell>${t.price_per_person_usd}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"><Trash2 size={16} /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* FORM SIDE */}
                        <div className="space-y-8">
                            {/* Warning */}
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                <div>
                                    <span className="font-bold">Important:</span> Make sure to use reliable, trustworthy image links (e.g., Unsplash, or your own hosted bucket). Broken links will affect the user experience.
                                </div>
                            </div>

                            {/* 1. Main Info */}
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <h3 className="font-serif text-xl border-b pb-2 mb-4">1. General Information</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>1. Main Image URL</Label>
                                            <Input value={formData.image_url} onChange={(e) => handleBasicChange('image_url', e.target.value)} placeholder="https://..." />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>2. Tour Name</Label>
                                            <Input value={formData.package_name} onChange={(e) => handleBasicChange('package_name', e.target.value)} placeholder="e.g. Essence of Ceylon" className="font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>3. Short Description (Card)</Label>
                                            <Textarea value={formData.short_description} onChange={(e) => handleBasicChange('short_description', e.target.value)} placeholder="Brief summary..." rows={2} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>4. Tour Overview (Long)</Label>
                                            <Textarea value={formData.description} onChange={(e) => handleBasicChange('description', e.target.value)} placeholder="Full detailed overview..." rows={5} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 2. Highlights & Map */}
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <h3 className="font-serif text-xl border-b pb-2 mb-4">2. Highlights & Map</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>5. Tour Highlights</Label>
                                            <Textarea value={formData.highlights} onChange={(e) => handleBasicChange('highlights', e.target.value)} placeholder="Tip: Use a new line for each check-marked highlight." rows={6} className="font-mono text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>6. Google My Maps URL (Embed)</Label>
                                            <Input value={formData.map_url} onChange={(e) => handleBasicChange('map_url', e.target.value)} placeholder="https://www.google.com/maps/d/embed?..." />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 3. Journey & Duration */}
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <h3 className="font-serif text-xl border-b pb-2 mb-4">3. Journey Details</h3>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-1/3 space-y-2">
                                            <Label>7. Duration (Days)</Label>
                                            <Input
                                                type="number" min={1} max={30}
                                                value={formData.duration_days}
                                                onChange={(e) => handleDurationChange(parseInt(e.target.value) || 1)}
                                            />
                                        </div>
                                        <div className="w-1/3 space-y-2">
                                            <Label>Price ($)</Label>
                                            <Input
                                                type="number"
                                                value={formData.price_per_person_usd}
                                                onChange={(e) => handleBasicChange('price_per_person_usd', parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>8. Your Journey (Destinations)</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.destinations.map((dest, idx) => (
                                                <div key={idx} className="flex gap-1 items-center">
                                                    <Input
                                                        value={dest}
                                                        onChange={(e) => handleDestinationChange(idx, e.target.value)}
                                                        placeholder={`Stop ${idx + 1}`}
                                                        className="h-8 text-sm min-w-[120px]"
                                                    />
                                                    <button onClick={() => removeDestinationField(idx)} className="text-muted-foreground hover:text-destructive"><X size={14} /></button>
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" onClick={addDestinationField} className="h-8"><Plus size={14} /></Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 4. Itinerary */}
                            <div className="space-y-4">
                                <h3 className="font-serif text-xl pl-2">9. Day by Day Itinerary</h3>
                                {formData.itinerary.map((day, idx) => (
                                    <Card key={idx} className="border-l-4 border-l-green-500">
                                        <CardContent className="p-4 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <Badge variant="secondary">Day {idx + 1}</Badge>
                                            </div>
                                            <Input
                                                placeholder="Day Heading (e.g. Airport to Kandy)"
                                                value={day.title}
                                                onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                                                className="font-bold"
                                            />
                                            <Textarea
                                                placeholder="Small Description..."
                                                value={day.description}
                                                onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                                                rows={2}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label className="text-xs">Activities (Bullets)</Label>
                                                    <Textarea
                                                        value={day.activities}
                                                        onChange={(e) => handleItineraryChange(idx, 'activities', e.target.value)}
                                                        rows={3}
                                                        className="text-xs font-mono"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label className="text-xs">Meals Included</Label>
                                                    <Input
                                                        value={day.meals}
                                                        onChange={(e) => handleItineraryChange(idx, 'meals', e.target.value)}
                                                        className="text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Submit */}
                            <div className="pt-4 flex gap-4">
                                <Button className="w-full h-12 text-lg bg-green-600 hover:bg-green-700" onClick={() => setShowConfirmation(true)} disabled={!isFormValid}>
                                    {isLoading ? 'Saving...' : 'Submit Tour Package'}
                                </Button>
                            </div>
                        </div>

                        {/* PREVIEW SIDE */}
                        <div className="space-y-6">
                            <div className="sticky top-28">
                                <h3 className="font-serif text-xl border-b pb-2 mb-6 flex items-center gap-2"><Eye className="text-ochre" /> Live Preview</h3>
                                <div className="flex justify-center">
                                    <TourCardPreview tour={formData} onClick={() => setIsPreviewOpen(true)} />
                                </div>
                                <div className="mt-8 text-center">
                                    <p className="text-sm text-muted-foreground">Click card to see full details modal (Simulated)</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Submission</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to create this tour package? It will be live immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} className="bg-green-600 text-white">Yes, Create Tour</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Minimal Modal logic just to satisfy preview requirement - would normally be a real reusable component */}
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{formData.package_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                        <img src={formData.image_url} className="w-full h-64 object-cover rounded-xl" alt="Cover" />
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 space-y-4">
                                <h3 className="font-bold text-lg">Overview</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.description}</p>

                                <h3 className="font-bold text-lg">Itinerary</h3>
                                <div className="space-y-4">
                                    {formData.itinerary.map((d, i) => (
                                        <div key={i} className="border-l-2 border-green-500 pl-4">
                                            <div className="font-bold">Day {i + 1}: {d.title}</div>
                                            <p className="text-sm">{d.description}</p>
                                            <ul className="list-disc list-inside text-xs text-muted-foreground mt-2">
                                                {d.activities.split('\n').filter(Boolean).map((a, j) => <li key={j}>{a}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-muted p-4 rounded-xl">
                                    <h4 className="font-bold mb-2">Highlights</h4>
                                    <ul className="space-y-2">
                                        {formData.highlights.split('\n').filter(Boolean).map((h, i) => (
                                            <li key={i} className="flex gap-2 text-sm"><Check size={14} className="text-green-600 shrink-0" /> {h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};
