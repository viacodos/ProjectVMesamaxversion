import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackgroundGradient, Button, Input, Label, Separator } from '@project-v-redone/ui';

export const LandingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const sanitizeInput = (input: string) => {
        // Basic sanitization: remove html tags and trim
        return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const sanitizedUsername = sanitizeInput(formData.username);
        const sanitizedPassword = sanitizeInput(formData.password); // Passwords usually shouldn't be trimmed but for this case let's keep it safe. Actually, better not trim password in case of leading/trailing spaces in real password.
        // Let's just trim username.

        if (!sanitizedUsername || !formData.password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            // Updated to use the correct port for the backend (5000)
            // Ideally this should use an environment variable or proxy, but sticking to known working port for now.
            const response = await fetch('http://localhost:5000/api/auth/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: sanitizedUsername,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Save token to localStorage for ManageDestinations to usage
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Connection error. Please ensure the backend server is running.');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <BackgroundGradient className="h-full w-full opacity-40 animate-aurora" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-ochre mx-auto flex items-center justify-center text-white font-serif font-bold text-2xl mb-4 shadow-lg shadow-ochre/20">
                            LV
                        </div>
                        <h1 className="text-3xl font-serif text-foreground mb-2">Admin Portal</h1>
                        <p className="text-muted-foreground text-sm">Restricted Access. Authorized Personnel Only.</p>
                    </div>

                    <div className="space-y-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-foreground">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-ochre focus:ring-ochre/50"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-background/50 border-input text-foreground placeholder:text-muted-foreground focus:border-ochre focus:ring-ochre/50"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            {error && (
                                <p className="text-destructive text-xs text-center">{error}</p>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-ochre hover:bg-ochre-dark text-white font-medium h-10"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="bg-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 text-sm font-medium flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                            onClick={() => {
                                // TODO: Secure Admin Authentication with Google OAuth
                                // 1. Set up Google Cloud Console Project (Internal Organization).
                                // 2. Configure OAuth consent screen restricted to organization domain.
                                // 3. Use a library like @react-oauth/google to get the ID Token.
                                // 4. Send the ID Token to backend for verification (do NOT trust frontend).
                                console.log('Google Login');
                            }}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Security Check</span>
                            </div>
                        </div>

                        <p className="text-center text-xs text-muted-foreground">
                            By signing in, you agree to the monitoring of your activity sequences.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-muted-foreground text-xs">
                    System Status: <span className="text-green-500">Operational</span>
                </div>
            </div>
        </div>
    );
};
