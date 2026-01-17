import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Plus, Edit2, Trash2, Link as LinkIcon, Star, AlertTriangle, MapPin, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Button, Input, Label, Textarea, Card, CardContent, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Select } from '@project-v-redone/ui';

const CATEGORIES = [
    '3 Star Standard',
    '4 Star Superior',
    '5 Star Deluxe',
    'Boutique Villa',
    'Luxury Boutique Villa',
    'Economic'
];

interface HotelModel {
    hotel_id?: string;
    hotel_name: string;
    website_url: string;
    short_description: string;
    description: string;
    star_rating: string;
    type: string;
    image_url: string;
    amenities: string;
    gallery: string[];
    latitude: string;
    longitude: string;
    is_featured?: boolean;
}

const INITIAL_FORM: HotelModel = {
    hotel_name: '',
    website_url: '',
    short_description: '',
    description: '',
    star_rating: '3',
    type: CATEGORIES[0],
    image_url: '',
    amenities: '',
    gallery: ['', '', '', ''],
    latitude: '',
    longitude: ''
};

// --- Hotel Detail Modal (Big Card) ---
const HotelDetailModal = ({ hotel, isOpen, onClose }: { hotel: HotelModel | null, isOpen: boolean, onClose: () => void }) => {
    if (!hotel) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-card border-none">
                <div className="relative h-[400px]">
                    <img
                        src={hotel.image_url}
                        alt={hotel.hotel_name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full" onClick={onClose}>
                        <X size={24} />
                    </Button>
                    <div className="absolute bottom-8 left-8 text-white">
                        <Badge className="mb-2 bg-ochre text-white hover:bg-ochre border-none">{hotel.type}</Badge>
                        <h2 className="text-4xl font-serif font-bold mb-2">{hotel.hotel_name}</h2>
                        <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                            <span className="flex items-center gap-1"><Star size={16} className="fill-orange-400 text-orange-400" /> {hotel.star_rating} Star Hotel</span>
                            <span className="flex items-center gap-1"><MapPin size={16} /> {hotel.latitude}, {hotel.longitude}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg font-bold mb-2">Overview</h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{hotel.description || hotel.short_description}</p>
                        </div>

                        {hotel.amenities && (
                            <div>
                                <h3 className="text-lg font-bold mb-3">Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.split(',').map((item, i) => (
                                        <Badge key={i} variant="secondary" className="px-3 py-1 text-xs">{item.trim()}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {hotel.gallery && hotel.gallery.some(g => g) && (
                            <div>
                                <h3 className="text-lg font-bold mb-3">Gallery</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {hotel.gallery.filter(g => g).map((img, i) => (
                                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted">
                                            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-muted/30 border-border/50">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-bold text-lg">Interested?</h3>
                                <p className="text-sm text-muted-foreground">Visit their official website to book directly or learn more.</p>

                                {hotel.website_url ? (
                                    <a
                                        href={hotel.website_url.startsWith('http') ? hotel.website_url : `https://${hotel.website_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-ochre hover:bg-ochre-dark text-white font-medium py-3 rounded-lg transition-colors"
                                    >
                                        Visit Hotel Website <ExternalLink size={16} />
                                    </a>
                                ) : (
                                    <Button disabled className="w-full">No Website Available</Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const HotelCardPreview = ({ hotel, onClick }: { hotel: HotelModel, onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`card-${hotel.hotel_name || 'preview'}`}
            className="group cursor-pointer h-[400px] w-full max-w-sm mx-auto bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative"
            onClick={onClick}
            whileHover={{ y: -5 }}
        >
            <div className="relative h-60 overflow-hidden shrink-0">
                <img
                    src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070'}
                    alt={hotel.hotel_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image')}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star size={12} className="fill-orange-400 text-orange-400" /> {hotel.star_rating} Star
                </div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                    <h3 className="text-xl font-bold drop-shadow-md">{hotel.hotel_name || 'Hotel Name'}</h3>
                    <p className="text-xs font-light opacity-90 drop-shadow-md flex items-center gap-1"><MapPin size={10} /> {hotel.latitude && hotel.longitude ? 'Location Set' : 'No Location'}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            </div>

            <div className="p-6 flex flex-col flex-grow bg-card">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase border-ochre/30 text-ochre bg-ochre/5">{hotel.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {hotel.short_description || 'Short description will appear here...'}
                </p>

                <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center group/link">
                    <span className={`text-xs flex items-center gap-1 transition-colors ${hotel.website_url ? 'text-blue-500 group-hover/link:underline' : 'text-muted-foreground'}`}>
                        <LinkIcon size={12} /> {hotel.website_url ? 'Website Linked' : 'No Website'}
                    </span>
                    <span className="text-xs text-muted-foreground">Click to preview</span>
                </div>
            </div>
        </motion.div>
    );
};

export const ManageAccommodations = () => {
    const [activeTab, setActiveTab] = useState<'manage' | 'add' | 'featured'>('manage');
    const [formData, setFormData] = useState<HotelModel>(INITIAL_FORM);
    const [hotels, setHotels] = useState<HotelModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Featured Logic
    const [selectedForFeature, setSelectedForFeature] = useState<string>('');
    const [featureToRemove, setFeatureToRemove] = useState<string | null>(null);

    // Modal Logic
    const [selectedHotel, setSelectedHotel] = useState<HotelModel | null>(null);

    const getToken = () => localStorage.getItem('adminToken');

    const fetchHotels = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/hotels');
            const data = await res.json();
            if (data.success) {
                setHotels(data.hotels);
            }
        } catch (error) {
            console.error('Failed to fetch hotels', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    const addToFeatured = async () => {
        if (!selectedForFeature) return;
        setIsLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`http://localhost:5000/api/hotels/${selectedForFeature}/feature`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                // Fetch to refresh list
                fetchHotels();
                setSelectedForFeature('');
            }
        } catch (error) {
            console.error('Failed to feature hotel', error);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmRemoveFeatured = async () => {
        if (!featureToRemove) return;
        setIsLoading(true);
        try {
            const token = getToken();
            const res = await fetch(`http://localhost:5000/api/hotels/${featureToRemove}/feature`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchHotels();
                setFeatureToRemove(null);
            }
        } catch (error) {
            console.error('Failed to unfeature hotel', error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.hotel_name.trim()) newErrors.hotel_name = 'Name is required';
        if (!formData.image_url.trim()) newErrors.image_url = 'Main image is required';
        if (!formData.short_description.trim()) newErrors.short_description = 'Short description is required';
        if (!formData.website_url.trim()) newErrors.website_url = 'Website URL is required';

        const valid = Object.keys(newErrors).length === 0;
        setIsFormValid(valid);
        return valid;
    };

    useEffect(() => { validateForm(); }, [formData]);

    const handleInputChange = (field: keyof HotelModel, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGalleryChange = (index: number, value: string) => {
        const newGallery = [...formData.gallery];
        newGallery[index] = value;
        setFormData(prev => ({ ...prev, gallery: newGallery }));
    };

    const handleSubmitClick = () => {
        if (validateForm()) setShowConfirmation(true);
    };

    const confirmUpload = async () => {
        setShowConfirmation(false);
        setIsLoading(true);
        try {
            const token = getToken();
            const url = formData.hotel_id
                ? `http://localhost:5000/api/hotels/${formData.hotel_id}`
                : 'http://localhost:5000/api/hotels';

            const method = formData.hotel_id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setFormData(INITIAL_FORM);
                setActiveTab('manage');
                fetchHotels();
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error saving hotel');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (hotel: any) => {
        setIsLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/hotels/${hotel.hotel_id}`);
            const data = await res.json();
            if (data.success) {
                const h = data.hotel;
                setFormData({
                    hotel_id: h.hotel_id,
                    hotel_name: h.hotel_name,
                    website_url: h.website_url || '',
                    short_description: h.short_description || '',
                    description: h.description || '',
                    star_rating: String(h.star_rating || '3'),
                    type: h.type || CATEGORIES[0],
                    image_url: h.image_url || '',
                    amenities: h.amenities || '',
                    gallery: h.gallery && h.gallery.length ? [...h.gallery, '', '', '', ''].slice(0, 4) : ['', '', '', ''],
                    latitude: h.latitude || '',
                    longitude: h.longitude || ''
                });
                setActiveTab('add');
            }
        } catch (e) { console.error(e); } finally { setIsLoading(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const token = getToken();
        await fetch(`http://localhost:5000/api/hotels/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        fetchHotels();
    };

    return (
        <div className="space-y-8 relative min-h-screen pb-20">
            {/* Text Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Manage Accommodations</h1>
                <p className="text-muted-foreground mt-2">Manage hotels, set featured properties, and curate experiences.</p>
            </div>

            {/* Floating Tabs */}
            <div className="sticky top-4 z-40 flex justify-center w-full pointer-events-none">
                <div className="bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg rounded-full p-1 pointer-events-auto flex items-center gap-1">
                    <button onClick={() => setActiveTab('manage')} className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'manage' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                        {activeTab === 'manage' && <motion.div layoutId="activeTabH" className="absolute inset-0 bg-ochre rounded-full shadow-lg" />}
                        <span className="relative z-10 flex items-center gap-2"><Hotel size={16} /> All Hotels</span>
                    </button>
                    <button onClick={() => { setActiveTab('add'); setFormData(INITIAL_FORM); }} className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'add' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                        {activeTab === 'add' && <motion.div layoutId="activeTabH" className="absolute inset-0 bg-ochre rounded-full shadow-lg" />}
                        <span className="relative z-10 flex items-center gap-2"><Plus size={16} /> {formData.hotel_id ? 'Edit' : 'Add New'}</span>
                    </button>
                    <button onClick={() => setActiveTab('featured')} className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === 'featured' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                        {activeTab === 'featured' && <motion.div layoutId="activeTabH" className="absolute inset-0 bg-ochre rounded-full shadow-lg" />}
                        <span className="relative z-10 flex items-center gap-2"><CheckCircle2 size={16} /> Featured</span>
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'manage' ? (
                    <motion.div
                        key="manage"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Featured</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {hotels.map((h) => (
                                        <TableRow key={h.hotel_id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedHotel(h)}>
                                            <TableCell>
                                                <img src={h.image_url} alt={h.hotel_name} className="w-12 h-12 rounded object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium whitespace-nowrap">{h.hotel_name}</TableCell>
                                            <TableCell>{h.type}</TableCell>
                                            <TableCell><div className="flex items-center gap-1"><Star size={12} className="fill-ochre text-ochre" /> {h.star_rating}</div></TableCell>
                                            <TableCell>{(Boolean(h.is_featured)) && <Badge variant="secondary" className="bg-ochre/10 text-ochre-dark">Featured</Badge>}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1" onClick={e => e.stopPropagation()}>
                                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(h)}><Edit2 size={16} /></Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => h.hotel_id && handleDelete(h.hotel_id)}><Trash2 size={16} /></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {hotels.length === 0 && !isLoading && <TableRow><TableCell colSpan={6} className="text-center py-8">No hotels found.</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                ) : activeTab === 'add' ? (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        <div className="space-y-6">
                            {/* Warning */}
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                <div>
                                    <span className="font-bold">Important:</span> Use reliable image links. Broken images ruin the experience.
                                </div>
                            </div>

                            <Card className="border border-border/60">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div><Label>1. Hotel Name</Label><Input value={formData.hotel_name} onChange={e => handleInputChange('hotel_name', e.target.value)} placeholder="e.g. Grand Bell Hotel" /></div>
                                        <div><Label>2. Website URL</Label><Input value={formData.website_url} onChange={e => handleInputChange('website_url', e.target.value)} placeholder="https://hotel-website.com" /></div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>3. Star Rating</Label>
                                                <select className="w-full h-10 px-3 rounded-md border border-input bg-background" value={formData.star_rating} onChange={e => handleInputChange('star_rating', e.target.value)}>
                                                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Star</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <Label>4. Type</Label>
                                                <select className="w-full h-10 px-3 rounded-md border border-input bg-background" value={formData.type} onChange={e => handleInputChange('type', e.target.value)}>
                                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div><Label>5. Main Image URL</Label><Input value={formData.image_url} onChange={e => handleInputChange('image_url', e.target.value)} placeholder="https://..." /></div>

                                        <div><Label>6. Short Description (Card)</Label><Textarea value={formData.short_description} onChange={e => handleInputChange('short_description', e.target.value)} rows={2} placeholder="Brief summary..." /></div>

                                        <div><Label>7. Full Description (Modal)</Label><Textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={5} placeholder="Detailed overview..." /></div>

                                        <div><Label>8. Amenities</Label><Textarea value={formData.amenities} onChange={e => handleInputChange('amenities', e.target.value)} rows={3} placeholder="Pool, Spa, Wifi..." /></div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div><Label>Latitude</Label><Input value={formData.latitude} onChange={e => handleInputChange('latitude', e.target.value)} placeholder="7.5432" /></div>
                                            <div><Label>Longitude</Label><Input value={formData.longitude} onChange={e => handleInputChange('longitude', e.target.value)} placeholder="80.1234" /></div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>9. Gallery (4 Photos)</Label>
                                            {formData.gallery.map((url, i) => (
                                                <Input key={i} value={url} onChange={e => handleGalleryChange(i, e.target.value)} placeholder={`Photo URL ${i + 1}`} className="text-sm" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-3">
                                        <Button variant="outline" onClick={() => setActiveTab('manage')}>Cancel</Button>
                                        <Button className="flex-1 bg-ochre hover:bg-ochre-dark text-white" disabled={!isFormValid || isLoading} onClick={handleSubmitClick}>
                                            {isLoading ? 'Saving...' : 'Save Hotel'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview */}
                        <div className="space-y-6">
                            <div className="sticky top-24">
                                <Label className="text-muted-foreground mb-4 block">Live Card Preview</Label>
                                <HotelCardPreview hotel={formData} onClick={() => setSelectedHotel(formData)} />
                                <p className="text-xs text-muted-foreground text-center mt-2">Click card to check Modal Preview</p>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    // Featured Tab
                    <motion.div
                        key="featured"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        <Card className="border border-ochre/20 bg-ochre/5">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-4 text-ochre-dark">Add to Featured</h3>
                                <div className="flex gap-4 items-end">
                                    <div className="flex-grow max-w-md">
                                        <Label className="mb-2 block">Select Hotel</Label>
                                        <select
                                            className="w-full h-10 px-3 rounded-md border border-input bg-card"
                                            value={selectedForFeature}
                                            onChange={(e) => setSelectedForFeature(e.target.value)}
                                        >
                                            <option value="">Choose a property...</option>
                                            {hotels.filter(h => !h.is_featured).map(h => (
                                                <option key={h.hotel_id} value={h.hotel_id || ''}>{h.hotel_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button onClick={addToFeatured} disabled={!selectedForFeature || isLoading} className="bg-ochre hover:bg-ochre-dark text-white">
                                        Add to Featured
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-border">
                                <h3 className="font-serif font-bold text-xl">Current Featured Properties</h3>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {hotels.filter(h => h.is_featured).map((h) => (
                                        <TableRow key={h.hotel_id}>
                                            <TableCell>
                                                <img src={h.image_url} alt={h.hotel_name} className="w-16 h-12 rounded object-cover" />
                                            </TableCell>
                                            <TableCell className="font-medium">{h.hotel_name}</TableCell>
                                            <TableCell><div className="flex items-center gap-1"><Star size={12} className="fill-ochre text-ochre" /> {h.star_rating}</div></TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-destructive/30 text-destructive hover:bg-destructive/10"
                                                    onClick={() => setFeatureToRemove(h.hotel_id || null)}
                                                >
                                                    Remove from Featured
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {hotels.filter(h => h.is_featured).length === 0 && (
                                        <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No featured properties set.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cleanup: Confirmation Dialog is standard */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Submission</DialogTitle>
                        <DialogDescription>Submit this hotel definition?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                        <Button onClick={confirmUpload}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Remove Featured Confirmation */}
            <Dialog open={!!featureToRemove} onOpenChange={() => setFeatureToRemove(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove from Featured?</DialogTitle>
                        <DialogDescription>Are you sure you want to remove this property from the featured section? It will still remain in your hotel list.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setFeatureToRemove(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmRemoveFeatured}>Remove from Featured</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Detail Modal */}
            <HotelDetailModal
                hotel={selectedHotel}
                isOpen={!!selectedHotel}
                onClose={() => setSelectedHotel(null)}
            />
        </div>
    );
};
