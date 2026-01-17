import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Plus, Search, Edit2, Trash2, Eye, AlertTriangle, Check, ArrowRight, MapPin } from 'lucide-react';
import { Button, Input, Label, Textarea, Card, CardContent, Badge, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@project-v-redone/ui';
import { DestinationModal } from '../components/DestinationModal';


const MONTHS = [
    { value: 'any', label: 'Any Month' },
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'February' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'jun', label: 'June' },
    { value: 'jul', label: 'July' },
    { value: 'aug', label: 'August' },
    { value: 'sep', label: 'September' },
    { value: 'oct', label: 'October' },
    { value: 'nov', label: 'November' },
    { value: 'dec', label: 'December' },
];

const CATEGORIES = [
    'cultural', 'beach', 'adventure', 'wildlife', 'city', 'hill_country', 'historical'
];

interface Destination {
    destination_id?: string;
    destination_name: string;
    tagline: string;
    type: string;
    description: string;
    latitude: string;
    longitude: string;
    best_visit_start: string;
    best_visit_end: string;
    image_url: string;
    gallery: string[];
    activities: string | string[]; // String from textarea, array from DB
    is_active?: boolean;
}

const INITIAL_FORM: Destination = {
    destination_name: '',
    tagline: '',
    type: 'cultural',
    description: '',
    latitude: '',
    longitude: '',
    best_visit_start: 'any',
    best_visit_end: 'any',
    image_url: '',
    gallery: ['', '', '', ''],
    activities: '',
};

// Recreated Card Component for Preview (High Fidelity)
const DestinationCardPreview = ({ destination, onClick }: { destination: Destination, onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`card-${destination.destination_name || 'preview'}`}
            className="group cursor-pointer h-[400px] w-full max-w-sm mx-auto bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col relative"
            onClick={onClick}
            whileHover={{ y: -5 }}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden shrink-0">
                <img
                    src={destination.image_url || 'https://images.unsplash.com/photo-1566370460384-3b246a4da904?q=80&w=2070'}
                    alt={destination.destination_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                    <div className="flex items-center text-xs font-medium mb-2 opacity-90">
                        <MapPin size={12} className="mr-1 text-ochre" />
                        {destination.latitude && destination.longitude ? 'Located on Map' : 'Location not set'}
                    </div>
                    <h3 className="text-2xl font-serif font-bold tracking-wide">{destination.destination_name || 'Destination Name'}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-medium text-white transition-opacity z-10">
                    {destination.type || 'Category'}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow bg-card">
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow text-sm leading-relaxed">
                    {destination.tagline || 'Your tagline short description will appear here...'}
                </p>
                <div className="flex items-center text-ochre font-medium text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform mt-auto">
                    View Details <ArrowRight size={14} className="ml-1" />
                </div>
            </div>
        </motion.div>
    );
};

export const ManageDestinations = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'manage'>('manage');
    const [formData, setFormData] = useState<Destination>(INITIAL_FORM);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Auth token retrieval
    const getToken = () => localStorage.getItem('adminToken');

    // Fetch Destinations
    const fetchDestinations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/destinations');
            const data = await res.json();
            if (data.success) {
                setDestinations(data.destinations);
            }
        } catch (error) {
            console.error('Failed to fetch destinations', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'manage') {
            fetchDestinations();
        }
    }, [activeTab]);

    // Validation
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.destination_name.trim()) newErrors.destination_name = 'Name is required';
        if (!formData.image_url.trim()) newErrors.image_url = 'Main image is required';
        if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.latitude) newErrors.latitude = 'Latitude is required';
        if (!formData.longitude) newErrors.longitude = 'Longitude is required';

        setErrors(newErrors);
        const valid = Object.keys(newErrors).length === 0;
        setIsFormValid(valid);
        return valid;
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    // Handlers
    const handleInputChange = (field: keyof Destination, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGalleryChange = (index: number, value: string) => {
        const newGallery = [...formData.gallery];
        newGallery[index] = value;
        setFormData(prev => ({ ...prev, gallery: newGallery }));
    };

    const handleSubmitClick = () => {
        if (validateForm()) {
            setShowConfirmation(true);
        }
    };

    const confirmUpload = async () => {
        setShowConfirmation(false);
        setIsLoading(true);
        try {
            const token = getToken();
            const method = formData.destination_id ? 'PUT' : 'POST';
            const url = formData.destination_id
                ? `http://localhost:5000/api/destinations/${formData.destination_id}`
                : 'http://localhost:5000/api/destinations';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success) {
                setFormData(INITIAL_FORM);
                setActiveTab('manage');
                fetchDestinations();
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch (error) {
            console.error('Error saving:', error);
            alert('Error saving destination');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (dest: any) => {
        try {
            const res = await fetch(`http://localhost:5000/api/destinations/${dest.destination_id}`);
            const data = await res.json();
            if (data.success) {
                const d = data.destination;
                setFormData({
                    destination_id: d.destination_id,
                    destination_name: d.destination_name,
                    tagline: d.tagline || '',
                    type: d.type,
                    description: d.description || '',
                    latitude: d.latitude || '',
                    longitude: d.longitude || '',
                    best_visit_start: d.best_visit_start || 'any',
                    best_visit_end: d.best_visit_end || 'any',
                    image_url: d.image_url,
                    gallery: d.gallery && d.gallery.length > 0 ? [...d.gallery, '', '', '', ''].slice(0, 4) : ['', '', '', ''],
                    activities: d.activities ? (Array.isArray(d.activities) ? d.activities.join('\n') : d.activities) : '',
                });
                setActiveTab('add');
            }
        } catch (e) {
            console.error("Fetch details error", e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this destination?")) return;
        try {
            const token = getToken();
            const res = await fetch(`http://localhost:5000/api/destinations/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchDestinations();
            }
        } catch (e) {
            console.error("Delete error", e);
        }
    };

    // Prepare preview data for Modal
    const previewDestinationForModal = {
        title: formData.destination_name,
        category: formData.type,
        location: `${formData.latitude || 'Lat'}, ${formData.longitude || 'Lng'}`,
        description: formData.description,
        image: formData.image_url,
        activities: typeof formData.activities === 'string'
            ? formData.activities.split('\n').filter(a => a.trim())
            : formData.activities,
        gallery: formData.gallery.filter(g => g.trim())
    };

    return (
        <div className="space-y-8 relative min-h-screen pb-20">
            {/* Floating Tab Menu */}
            <div className="sticky top-4 z-40 flex justify-center w-full pointer-events-none">
                <div className="bg-background/80 backdrop-blur-lg border border-border/50 shadow-lg rounded-full p-1 pointer-events-auto flex items-center gap-1">
                    <button
                        onClick={() => { setActiveTab('manage'); setFormData(INITIAL_FORM); }}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'manage' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {activeTab === 'manage' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-ochre rounded-full shadow-lg shadow-ochre/25"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Map size={16} /> Manage Destinations
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'add' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        {activeTab === 'add' && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-ochre rounded-full shadow-lg shadow-ochre/25"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Plus size={16} /> {formData.destination_id ? 'Edit Destination' : 'Add Destination'}
                        </span>
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <AnimatePresence mode="wait">
                {activeTab === 'manage' ? (
                    <motion.div
                        key="manage"
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6 pt-4"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold">All Destinations</h2>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search destinations..."
                                    className="pl-9 bg-card border-border/60 focus:border-ochre/50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-muted/50">
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Season</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                                    <div className="flex justify-center items-center gap-2">
                                                        <div className="w-2 h-2 bg-ochre rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                        <div className="w-2 h-2 bg-ochre rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                        <div className="w-2 h-2 bg-ochre rounded-full animate-bounce"></div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : destinations.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No destinations found. Add your first one!</TableCell>
                                            </TableRow>
                                        ) : (
                                            destinations
                                                .filter(d => d.destination_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map((dest, i) => (
                                                    <motion.tr
                                                        key={dest.destination_id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="border-b transition-colors hover:bg-muted/50"
                                                    >
                                                        <TableCell className="p-4">
                                                            <img
                                                                src={dest.image_url}
                                                                alt={dest.destination_name}
                                                                className="w-12 h-12 rounded-lg object-cover shadow-sm"
                                                            />
                                                        </TableCell>
                                                        <TableCell className="font-medium text-base">{dest.destination_name}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className="uppercase text-[10px] tracking-wider border-ochre/30 text-ochre bg-ochre/5">
                                                                {dest.type}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-muted-foreground capitalize text-sm">
                                                            {dest.best_visit_start} - {dest.best_visit_end}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button variant="ghost" size="icon" className="hover:bg-ochre/10 hover:text-ochre" onClick={() => handleEdit(dest)}>
                                                                    <Edit2 size={16} />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => dest.destination_id && handleDelete(dest.destination_id)}>
                                                                    <Trash2 size={16} />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </motion.tr>
                                                ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4"
                    >
                        {/* FORM SIDE */}
                        <div className="space-y-6">
                            {/* Warning */}
                            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg flex items-start gap-3 text-sm">
                                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                                <div>
                                    <span className="font-bold">Important:</span> Make sure to use reliable, trustworthy image links (e.g., Unsplash, or your own hosted bucket). Broken links will affect the user experience.
                                </div>
                            </div>

                            <Card className="border border-border/60 shadow-md">
                                <CardContent className="p-8 space-y-8">
                                    {/* 1. Main Image & 2. Name */}
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground/80">1. Main Image URL</Label>
                                            <Input
                                                value={formData.image_url}
                                                onChange={(e) => handleInputChange('image_url', e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className={`bg-muted/30 focus:bg-background transition-colors ${errors.image_url ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-ochre"}`}
                                            />
                                            {errors.image_url && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle size={10} /> {errors.image_url}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground/80">2. Destination Name</Label>
                                            <Input
                                                value={formData.destination_name}
                                                onChange={(e) => handleInputChange('destination_name', e.target.value)}
                                                placeholder="e.g. Ella Rock"
                                                className={`bg-muted/30 focus:bg-background transition-colors font-serif text-lg ${errors.destination_name ? "border-destructive" : "focus-visible:ring-ochre"}`}
                                            />
                                            {errors.destination_name && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle size={10} /> {errors.destination_name}</p>}
                                        </div>
                                    </div>

                                    {/* 3. Tagline & 4. Type */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 order-2 md:order-1">
                                            <Label className="text-sm font-medium text-foreground/80">3. Tagline</Label>
                                            <Input
                                                value={formData.tagline}
                                                onChange={(e) => handleInputChange('tagline', e.target.value)}
                                                placeholder="Short catchy phrase..."
                                                className={`bg-muted/30 focus:bg-background transition-colors ${errors.tagline ? "border-destructive" : "focus-visible:ring-ochre"}`}
                                            />
                                            {errors.tagline && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle size={10} /> {errors.tagline}</p>}
                                        </div>
                                        <div className="space-y-2 order-1 md:order-2">
                                            <Label className="text-sm font-medium text-foreground/80">4. Destination Type</Label>
                                            <div className="relative">
                                                <select
                                                    className="w-full h-10 rounded-md border border-input bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ochre/50 focus:bg-background transition-colors appearance-none cursor-pointer"
                                                    value={formData.type}
                                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                                >
                                                    {CATEGORIES.map(c => (
                                                        <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5. Description */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground/80">5. Description</Label>
                                        <Textarea
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Detailed paragraph about the destination..."
                                            rows={5}
                                            className={`bg-muted/30 focus:bg-background transition-colors resize-none ${errors.description ? "border-destructive" : "focus-visible:ring-ochre"}`}
                                        />
                                        {errors.description && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle size={10} /> {errors.description}</p>}
                                    </div>

                                    {/* 6. Lat & 7. Lng */}
                                    <div className="grid grid-cols-2 gap-6 bg-muted/20 p-4 rounded-lg border border-border/30">
                                        <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Location Coordinates</div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground/80">6. Latitude</Label>
                                            <Input
                                                value={formData.latitude}
                                                onChange={(e) => handleInputChange('latitude', e.target.value)}
                                                placeholder="7.9570"
                                                className={`bg-white focus:bg-background ${errors.latitude ? "border-destructive" : "focus-visible:ring-ochre"}`}
                                            />
                                            {errors.latitude && <p className="text-xs text-destructive">{errors.latitude}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-foreground/80">7. Longitude</Label>
                                            <Input
                                                value={formData.longitude}
                                                onChange={(e) => handleInputChange('longitude', e.target.value)}
                                                placeholder="80.7603"
                                                className={`bg-white focus:bg-background ${errors.longitude ? "border-destructive" : "focus-visible:ring-ochre"}`}
                                            />
                                            {errors.longitude && <p className="text-xs text-destructive">{errors.longitude}</p>}
                                        </div>
                                    </div>

                                    {/* 8. Best Visit */}
                                    <div className="space-y-2 bg-muted/20 p-4 rounded-lg border border-border/30">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">8. Best Time to Visit</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs">From</Label>
                                                <select
                                                    className="w-full h-9 rounded-md border border-input bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ochre/50"
                                                    value={formData.best_visit_start}
                                                    onChange={(e) => handleInputChange('best_visit_start', e.target.value)}
                                                >
                                                    {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">To</Label>
                                                <select
                                                    className="w-full h-9 rounded-md border border-input bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ochre/50"
                                                    value={formData.best_visit_end}
                                                    onChange={(e) => handleInputChange('best_visit_end', e.target.value)}
                                                >
                                                    {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 9. Things to Do */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-foreground/80">9. Things to Do</Label>
                                        <Textarea
                                            value={typeof formData.activities === 'string' ? formData.activities : Array.isArray(formData.activities) ? formData.activities.join('\n') : ''}
                                            onChange={(e) => handleInputChange('activities', e.target.value)}
                                            placeholder="- Activity 1&#10;- Activity 2&#10;- Activity 3"
                                            rows={4}
                                            className="bg-muted/30 focus:bg-background font-mono text-sm focus-visible:ring-ochre"
                                        />
                                        <p className="text-[10px] text-muted-foreground text-right">Separate each activity with a new line for bullet points.</p>
                                    </div>

                                    {/* 10. Gallery */}
                                    <div className="space-y-4">
                                        <Label className="text-sm font-medium text-foreground/80">10. Photo Gallery</Label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {formData.gallery.map((url, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <span className="text-xs font-mono text-muted-foreground w-6 text-right">
                                                        {idx === 0 ? 'i.' : idx === 1 ? 'ii.' : idx === 2 ? 'iii.' : 'iv.'}
                                                    </span>
                                                    <Input
                                                        value={url}
                                                        onChange={(e) => handleGalleryChange(idx, e.target.value)}
                                                        placeholder={`Photo URL ${idx + 1}`}
                                                        className="text-sm bg-muted/30 focus:bg-background focus-visible:ring-ochre flex-1"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-6 flex gap-4 items-center">
                                        <Button
                                            variant="outline"
                                            onClick={() => { setActiveTab('manage'); setFormData(INITIAL_FORM); }}
                                            className="h-12 px-6 rounded-lg border-muted-foreground/20 hover:bg-muted/50"
                                        >
                                            Cancel
                                        </Button>

                                        <motion.div
                                            className="flex-1"
                                            animate={isFormValid ? { scale: [1, 1.02, 1] } : {}}
                                            transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                                        >
                                            <Button
                                                className={`w-full h-12 text-base font-medium rounded-lg transition-all duration-500 relative overflow-hidden group ${isFormValid
                                                    ? 'bg-ochre hover:bg-ochre-dark text-white shadow-lg shadow-ochre/30'
                                                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                                                    }`}
                                                onClick={handleSubmitClick}
                                                disabled={!isFormValid || isLoading}
                                            >
                                                {/* Glowing Background Effect */}
                                                {isFormValid && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                )}

                                                <span className="relative flex items-center justify-center gap-2">
                                                    {isLoading ? 'Processing...' : (formData.destination_id ? 'Update Destination' : 'Submit Destination')}
                                                    {!isLoading && isFormValid && <Check size={18} />}
                                                </span>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* PREVIEW SIDE */}
                        <div className="space-y-6">
                            <div className="sticky top-28 space-y-6">
                                <div className="flex items-center gap-2 text-ochre font-medium border-b border-ochre/20 pb-2">
                                    <Eye size={20} />
                                    <h3>Live Preview</h3>
                                </div>

                                {/* Card Preview */}
                                <div className="border border-border rounded-3xl p-8 bg-muted/10 backdrop-blur-sm flex items-center justify-center min-h-[500px] relative">
                                    <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl" />

                                    <div className="w-full relative z-10">
                                        <DestinationCardPreview
                                            destination={formData}
                                            onClick={() => setIsPreviewModalOpen(true)}
                                        />
                                        <p className="text-center text-xs text-muted-foreground mt-4 animate-pulse">
                                            Click the card to preview the full modal view
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence >

            {/* Modal Preview */}
            < DestinationModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                destination={previewDestinationForModal}
            />

            {/* Confirmation Dialog */}
            < Dialog open={showConfirmation} onOpenChange={setShowConfirmation} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-xl font-serif">
                            <AlertTriangle className="text-ochre" size={24} />
                            Confirm Submission
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-base">
                            Are you sure you want to {formData.destination_id ? 'update' : 'submit'} <span className="font-semibold text-foreground">"{formData.destination_name || 'this destination'}"</span>?
                            <br /><br />
                            This will immediately update the live website content.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setShowConfirmation(false)}>Cancel</Button>
                        <Button className="bg-ochre text-white hover:bg-ochre-dark" onClick={confirmUpload}>
                            Yes, {formData.destination_id ? 'Update' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    );
};
