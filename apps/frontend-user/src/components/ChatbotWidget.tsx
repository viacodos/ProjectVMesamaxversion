import { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm your Lanka Vacations assistant. How can I help you plan your perfect Sri Lankan adventure today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputMessage,
                    sessionId: 'web-session-' + Date.now()
                })
            });

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response || "I'm sorry, I couldn't process that. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting. Please try again later or contact our support team.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed right-6 bottom-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-ochre to-orange-600 text-white shadow-2xl hover:shadow-ochre/50 transition-all duration-300 flex items-center justify-center group ${isOpen ? 'scale-90' : 'scale-100 hover:scale-110'
                    }`}
                aria-label="Open chat"
            >
                {isOpen ? (
                    <X size={24} className="transition-transform group-hover:rotate-90" />
                ) : (
                    <MessageCircle size={24} className="animate-pulse" />
                )}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed right-6 bottom-24 z-50 w-[380px] h-[550px] md:h-[600px] bg-card border-2 border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-ochre to-orange-600 p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <MessageCircle size={20} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">Lanka Vacations</h3>
                                <p className="text-xs text-white/80 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online • Typically replies instantly
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${message.sender === 'user'
                                        ? 'bg-ochre text-white rounded-br-sm'
                                        : 'bg-card border border-border rounded-bl-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                                    <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                                    <Loader2 size={16} className="animate-spin text-ochre" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-background border-t border-border">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask about packages, destinations..."
                                className="flex-1 bg-muted border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ochre"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="bg-ochre hover:bg-ochre-dark text-white rounded-xl px-4"
                                size="sm"
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-2 text-center">
                            Powered by AI • We respect your privacy
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
