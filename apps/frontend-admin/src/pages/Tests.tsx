
import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Package, Activity, Database, Server, RefreshCw, XCircle } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

interface SystemStatus {
    database: string;
    api: string;
    expertSystem: string;
    timestamp: string;
    dependencies?: {
        react: string;
        vite: string;
    };
}

export const SystemTests = () => {
    const [status, setStatus] = useState<SystemStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastRun, setLastRun] = useState<string | null>(null);

    const runDiagnostics = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate a slight delay for "diagnostic" feel if local is too fast
            const start = Date.now();
            const res = await fetch('http://localhost:5000/api/health');
            const data = await res.json();
            const duration = Date.now() - start;
            if (duration < 800) await new Promise(r => setTimeout(r, 800 - duration));

            if (data.success) {
                setStatus(data.status);
                setLastRun(new Date().toLocaleTimeString());
            } else {
                setError(data.status?.error || 'System checks failed');
                setStatus(data.status); // Might have some partial data
            }
        } catch (err) {
            console.error(err);
            setError('Failed to contact server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        runDiagnostics();
    }, []);

    const getStatusColor = (s: string) => {
        if (s === 'Connected' || s === 'Online' || s === 'Operational' || s === 'Checked') return 'text-green-400 bg-green-500/20';
        if (s === 'Error' || s === 'Disconnected') return 'text-red-400 bg-red-500/20';
        return 'text-yellow-400 bg-yellow-500/20';
    };

    const StatusBadge = ({ value }: { value: string }) => (
        <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(value)}`}>
            {value === 'Connected' || value === 'Online' || value === 'Operational' || value === 'Checked' ? <CheckCircle size={12} /> : <XCircle size={12} />}
            {value}
        </span>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif text-ochre">System Health & Tests</h2>
                    <p className="text-muted-foreground text-sm mt-1">Real-time diagnostics for backend and services.</p>
                </div>
                <div className="flex items-center gap-3">
                    {lastRun && <span className="text-xs text-muted-foreground">Last run: {lastRun}</span>}
                    <Button onClick={runDiagnostics} disabled={loading} className="bg-ochre hover:bg-ochre-dark text-white min-w-[140px]">
                        {loading ? <><RefreshCw size={16} className="animate-spin mr-2" /> Running...</> : 'Run Diagnostic'}
                    </Button>
                </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-center gap-3 text-orange-400 mb-2">
                <AlertCircle size={24} className="shrink-0" />
                <span className="text-sm">Recommendation: Run system tests periodically. This checks DB connectivity and internal APIs.</span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400">
                    <XCircle size={24} />
                    <span>Error: {error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Infrastructure */}
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border flex flex-col">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
                        <Server size={20} className="text-blue-400" />
                        Infrastructure Status
                    </h3>
                    <div className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="text-foreground flex items-center gap-2"><Database size={14} className="text-muted-foreground" /> Database</span>
                            {loading ? <span className="text-xs text-muted-foreground animate-pulse">Checking...</span> :
                                status ? <StatusBadge value={status.database} /> : <span className="text-xs text-muted-foreground">Unknown</span>}
                        </div>
                        <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="text-foreground flex items-center gap-2"><Activity size={14} className="text-muted-foreground" /> API Server</span>
                            {loading ? <span className="text-xs text-muted-foreground animate-pulse">Pinging...</span> :
                                status ? <StatusBadge value={status.api} /> : <span className="text-xs text-muted-foreground">Unknown</span>}
                        </div>
                        <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="text-foreground flex items-center gap-2"><RefreshCw size={14} className="text-muted-foreground" /> Expert System</span>
                            {loading ? <span className="text-xs text-muted-foreground animate-pulse">Verifying...</span> :
                                status ? <StatusBadge value={status.expertSystem} /> : <span className="text-xs text-muted-foreground">Unknown</span>}
                        </div>
                    </div>
                </div>

                {/* Dependencies (Mocked from Backend confirmation) */}
                <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border flex flex-col">
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-foreground">
                        <Package size={20} className="text-purple-400" />
                        Core Services
                    </h3>
                    <div className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="text-foreground">Core Backend (Node.js)</span>
                            {loading ? <span className="text-xs text-muted-foreground animate-pulse">Checking...</span> :
                                status ? <StatusBadge value="Online" /> : <span className="text-xs text-muted-foreground">Unknown</span>}
                        </div>
                        <div className="flex items-center justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="text-foreground">Frontend Build (Vite)</span>
                            {loading ? <span className="text-xs text-muted-foreground animate-pulse">Checking...</span> :
                                status ? <StatusBadge value={status.dependencies?.vite || 'Active'} /> : <span className="text-xs text-muted-foreground">Unknown</span>}
                        </div>
                    </div>
                </div>
            </div>

            {status && (
                <p className="text-xs text-right text-muted-foreground opacity-50 font-mono">
                    Server Timestamp: {new Date(status.timestamp).toLocaleString()}
                </p>
            )}
        </div>
    );
};
