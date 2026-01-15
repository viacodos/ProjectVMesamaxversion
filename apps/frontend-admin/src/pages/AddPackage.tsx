
import { Upload } from 'lucide-react';

export const AddPackage = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif text-ochre">Add New Package</h2>
            <p className="text-muted-foreground">Upload your travel package details via Excel (.xlsx) file.</p>

            <div className="border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:border-ochre/50 hover:bg-muted/30 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-ochre/20 rounded-full flex items-center justify-center mb-4">
                    <Upload className="text-ochre" size={32} />
                </div>
                <h3 className="text-xl font-medium mb-2 text-foreground">Drag & Drop Excel File</h3>
                <p className="text-muted-foreground text-sm">or click to browse</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border mt-8">
                <h3 className="text-lg font-medium mb-4 text-foreground">Template Guidelines</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                    <li>Sheet 1: Package Basics (Title, Duration, Price)</li>
                    <li>Sheet 2: Itinerary (Day-wise breakdown)</li>
                    <li>Sheet 3: Inclusions/Exclusions</li>
                </ul>
                <button className="mt-4 text-ochre text-sm hover:underline">Download Template</button>
            </div>
        </div>
    );
};
