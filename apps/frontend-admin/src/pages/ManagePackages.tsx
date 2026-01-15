
import { Edit, Trash2, Eye } from 'lucide-react';

export const ManagePackages = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif text-ochre">Manage Packages</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border text-muted-foreground text-sm">
                            <th className="py-4 px-4 font-medium">Package Name</th>
                            <th className="py-4 px-4 font-medium">Duration</th>
                            <th className="py-4 px-4 font-medium">Price</th>
                            <th className="py-4 px-4 font-medium">Status</th>
                            <th className="py-4 px-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                <td className="py-4 px-4">Sri Lanka Grand Tour {i}</td>
                                <td className="py-4 px-4">14 Days</td>
                                <td className="py-4 px-4">$2,450</td>
                                <td className="py-4 px-4"><span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs">Active</span></td>
                                <td className="py-4 px-4 flex justify-end gap-2">
                                    <button className="p-2 hover:bg-muted/50 rounded-lg text-muted-foreground hover:text-foreground"><Eye size={16} /></button>
                                    <button className="p-2 hover:bg-muted/50 rounded-lg text-muted-foreground hover:text-foreground"><Edit size={16} /></button>
                                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
