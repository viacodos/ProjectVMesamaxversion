import React from 'react';
import { AlertCircle, CheckCircle, Package } from 'lucide-react';

export const SystemTests = () => {
    return (
        <div className="space-y-6 text-white">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif text-ochre">System Health & Tests</h2>
                <button className="bg-ochre px-4 py-2 rounded-lg font-medium hover:bg-ochre/80 text-sm">Run Diagnostic</button>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-center gap-3 text-orange-400 mb-6">
                <AlertCircle size={24} />
                <span>Recommendation: Run system tests at least once a day to ensure stability.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-glass-light p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Package size={20} className="text-blue-400" />
                        Dependency Check
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white/80">react</span>
                            <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> Up to date</span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white/80">vite</span>
                            <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> Up to date</span>
                        </div>
                    </div>
                </div>

                <div className="bg-glass-light p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-400" />
                        API Status
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white/80">Google Analytics API</span>
                            <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded">Connected</span>
                        </div>
                        <div className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-white/80">Database Connection</span>
                            <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
