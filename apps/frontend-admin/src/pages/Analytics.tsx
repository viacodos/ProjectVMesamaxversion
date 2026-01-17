
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle } from 'lucide-react';

export const Analytics = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch('http://localhost:5000/api/analytics/charts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const json = await res.json();
                if (json.success && json.charts?.visitsTrend) {
                    setData(json.charts.visitsTrend);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif text-ochre">Website Traffic</h2>
                    <p className="text-muted-foreground text-sm mt-1">Monthly visitor trends.</p>
                </div>
            </div>

            {/* Main Chart Card */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border flex-grow min-h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-foreground">Visits per Month</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-ochre"></span>
                        Last 6 Months
                    </div>
                </div>

                <div className="flex-grow w-full h-full min-h-[400px]">
                    {loading ? (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading analytics...</div>
                    ) : data.length === 0 ? (
                        <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground">
                            <AlertCircle size={32} className="mb-2 opacity-50" />
                            <p>No traffic data recorded yet.</p>
                            <p className="text-xs opacity-50">Visits will appear here once users access the site.</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D48D4D" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#D48D4D" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#ffffff60"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#ffffff60"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#ffffff20', strokeWidth: 2 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#D48D4D"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};
