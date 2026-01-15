
export const QuoteSection = () => {
    return (
        <section className="relative py-32 px-6 bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center">
                    {/* Opening Quote */}
                    <div className="mb-6">
                        <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-ochre/30" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="relative">
                        <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4 italic">
                            The Pearl of the
                        </p>
                        <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-ochre leading-tight mb-6 italic">
                            Indian Ocean
                        </p>
                    </blockquote>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center my-8">
                        <div className="h-px w-20 bg-ochre/50"></div>
                        <div className="w-2 h-2 rounded-full bg-ochre mx-4"></div>
                        <div className="h-px w-20 bg-ochre/50"></div>
                    </div>

                    {/* Supporting Text */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        A timeless island where ancient heritage meets pristine nature, creating unforgettable memories at every turn.
                    </p>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
};
