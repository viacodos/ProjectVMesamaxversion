
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Analytics = () => {
    const data = [
        { name: 'Mon', visits: 4000, bookings: 240 },
        { name: 'Tue', visits: 3000, bookings: 139 },
        { name: 'Wed', visits: 2000, bookings: 980 },
        { name: 'Thu', visits: 2780, bookings: 390 },
        { name: 'Fri', visits: 1890, bookings: 480 },
        { name: 'Sat', visits: 2390, bookings: 380 },
        { name: 'Sun', visits: 3490, bookings: 430 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif text-ochre">Real-time Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Active Users', value: '1,234' },
                    { label: 'Revenue (Today)', value: '$12,450' },
                    { label: 'Pending Bookings', value: '45' }
                ].map((kpi, i) => (
                    <div key={i} className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border">
                        <p className="text-muted-foreground text-sm mb-1">{kpi.label}</p>
                        <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border h-96">
                <h3 className="text-lg font-medium mb-4 text-foreground">Traffic Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                        <XAxis dataKey="name" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="visits" stroke="#D48D4D" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="bookings" stroke="#4FD1C5" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
