import { TrendingUp, Activity, Database, Package, FileCheck, AlertTriangle } from 'lucide-react';

export const Overview = () => {
    // Mock data - in production, this would come from API
    const stats = {
        siteVisits: 12450,
        applicationHealth: 85, // Score out of 100
        databaseConnected: true,
        totalPackages: 127,
        packagesToReview: 8
    };

    const needsUpdate = stats.applicationHealth < 70;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-serif text-ochre">Overview</h2>
                <p className="text-muted-foreground mt-1">System summary and key metrics</p>
            </div>

            {/* Alert if database is down */}
            {!stats.databaseConnected && (
                <div className="bg-destructive/10 border border-destructive p-4 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="text-destructive flex-shrink-0 mt-0.5" size={24} />
                    <div>
                        <h3 className="font-semibold text-destructive text-lg">Database Connection Failed</h3>
                        <p className="text-destructive/90 text-sm mt-1">
                            Contact developer support immediately. System functionality may be impaired.
                        </p>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Site Visits */}
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-ochre/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <TrendingUp className="text-blue-500" size={24} />
                        </div>
                        <span className="text-xs text-muted-foreground">This Month</span>
                    </div>
                    <h3 className="text-sm text-muted-foreground mb-1">Site Visits</h3>
                    <p className="text-3xl font-bold text-foreground">{stats.siteVisits.toLocaleString()}</p>
                </div>

                {/* Application Health */}
                <div className={`bg-card/50 backdrop-blur-sm p-6 rounded-xl border transition-all ${needsUpdate
                        ? 'border-destructive bg-destructive/5'
                        : 'border-border hover:border-ochre/50'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${needsUpdate ? 'bg-destructive/10' : 'bg-green-500/10'
                            }`}>
                            <Activity className={needsUpdate ? 'text-destructive' : 'text-green-500'} size={24} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${needsUpdate
                                ? 'bg-destructive/20 text-destructive'
                                : 'bg-green-500/20 text-green-500'
                            }`}>
                            {needsUpdate ? 'Needs Update' : 'Healthy'}
                        </span>
                    </div>
                    <h3 className="text-sm text-muted-foreground mb-1">Application Health</h3>
                    <p className={`text-3xl font-bold ${needsUpdate ? 'text-destructive' : 'text-foreground'}`}>
                        {stats.applicationHealth}%
                    </p>
                    {needsUpdate && (
                        <p className="text-xs text-destructive/80 mt-2">System requires updates</p>
                    )}
                </div>

                {/* Database Status */}
                <div className={`bg-card/50 backdrop-blur-sm p-6 rounded-xl border transition-all ${!stats.databaseConnected
                        ? 'border-destructive bg-destructive/5'
                        : 'border-border hover:border-ochre/50'
                    }`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${!stats.databaseConnected ? 'bg-destructive/10' : 'bg-green-500/10'
                            }`}>
                            <Database className={!stats.databaseConnected ? 'text-destructive' : 'text-green-500'} size={24} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${!stats.databaseConnected
                                ? 'bg-destructive/20 text-destructive'
                                : 'bg-green-500/20 text-green-500'
                            }`}>
                            {!stats.databaseConnected ? 'Offline' : 'Connected'}
                        </span>
                    </div>
                    <h3 className="text-sm text-muted-foreground mb-1">Database</h3>
                    <p className={`text-3xl font-bold ${!stats.databaseConnected ? 'text-destructive' : 'text-foreground'}`}>
                        {!stats.databaseConnected ? 'Down' : 'Active'}
                    </p>
                    {!stats.databaseConnected && (
                        <p className="text-xs text-destructive/80 mt-2">Contact support immediately</p>
                    )}
                </div>

                {/* Total Packages */}
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-ochre/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Package className="text-purple-500" size={24} />
                        </div>
                    </div>
                    <h3 className="text-sm text-muted-foreground mb-1">Total Packages</h3>
                    <p className="text-3xl font-bold text-foreground">{stats.totalPackages}</p>
                </div>

                {/* Packages to Review */}
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-ochre/50 transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-ochre/10 flex items-center justify-center">
                            <FileCheck className="text-ochre" size={24} />
                        </div>
                        {stats.packagesToReview > 0 && (
                            <span className="text-xs font-medium px-2 py-1 rounded bg-ochre/20 text-ochre">
                                Pending
                            </span>
                        )}
                    </div>
                    <h3 className="text-sm text-muted-foreground mb-1">Packages to Review</h3>
                    <p className="text-3xl font-bold text-foreground">{stats.packagesToReview}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
                <h3 className="text-lg font-medium mb-4 text-foreground">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 rounded-lg border border-border hover:border-ochre hover:bg-ochre/5 transition-all text-left">
                        <Package className="text-ochre mb-2" size={20} />
                        <p className="font-medium text-foreground text-sm">Add New Package</p>
                        <p className="text-xs text-muted-foreground mt-1">Upload travel package details</p>
                    </button>
                    <button className="p-4 rounded-lg border border-border hover:border-ochre hover:bg-ochre/5 transition-all text-left">
                        <FileCheck className="text-ochre mb-2" size={20} />
                        <p className="font-medium text-foreground text-sm">Review Packages</p>
                        <p className="text-xs text-muted-foreground mt-1">Check pending submissions</p>
                    </button>
                    <button className="p-4 rounded-lg border border-border hover:border-ochre hover:bg-ochre/5 transition-all text-left">
                        <Activity className="text-ochre mb-2" size={20} />
                        <p className="font-medium text-foreground text-sm">View Analytics</p>
                        <p className="text-xs text-muted-foreground mt-1">Detailed traffic reports</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
