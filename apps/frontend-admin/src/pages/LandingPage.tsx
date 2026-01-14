import React from 'react';
import { BackgroundGradient } from '@project-v-redone/ui';
import { Button } from '@project-v-redone/ui';

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <BackgroundGradient className="h-full w-full opacity-40 animate-aurora" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-glass-dark backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-ochre mx-auto flex items-center justify-center text-white font-serif font-bold text-2xl mb-4 shadow-lg shadow-ochre/20">
                            LV
                        </div>
                        <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
                        <p className="text-gray-400 text-sm">Restricted Access. Authorized Personnel Only.</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
                            onClick={() => console.log('Google Login')}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-gray-900 px-2 text-gray-500">Security Check</span>
                            </div>
                        </div>

                        <p className="text-center text-xs text-gray-500">
                            By signing in, you agree to the monitoring of your activity sequences.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-600 text-xs">
                    System Status: <span className="text-green-500">Operational</span>
                </div>
            </div>
        </div>
    );
};
