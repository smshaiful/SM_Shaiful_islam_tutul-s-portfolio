import React, { useState } from 'react';
import { FAQItem } from '../types/resume';
import { Sparkles, X, Send, Bot, User, Download, Mail, Calendar } from 'lucide-react';

interface AIAssistantProps {
  questions: FAQItem[];
  email: string;
  resumePdfUrl: string;
  onOpenContact: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  questions,
  email,
  resumePdfUrl,
  onOpenContact,
  onPlayClick,
  onPlayHover,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: "Hello! I am Tutul's AI portfolio companion. Ask me anything about my experience, skills, technical stack, or project availability.",
      time: 'Just now',
    },
  ]);

  const handleToggle = () => {
    onPlayClick?.();
    setIsOpen(!isOpen);
  };

  const handleAsk = (questionText: string, customAnswer?: string) => {
    onPlayClick?.();
    const userMsg: ChatMessage = {
      sender: 'user',
      text: questionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Find answer or fallback
    let answer = customAnswer;
    if (!answer) {
      const match = questions.find((q) =>
        q.question.toLowerCase().includes(questionText.toLowerCase()) ||
        questionText.toLowerCase().includes(q.question.toLowerCase().slice(0, 15))
      );
      if (match) {
        answer = match.answer;
      } else {
        answer = `Thanks for asking! You can reach out directly via email (${email}) or schedule a conversation through the "Let's talk" button.`;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: answer || '',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const q = inputVal.trim();
    setInputVal('');
    handleAsk(q);
  };

  return (
    <>
      {/* Floating Morphing Orb Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-3 select-none">
        {/* Helper speech bubble tooltip */}
        {!isOpen && (
          <div
            onClick={handleToggle}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border shadow-lg font-mono text-xs uppercase tracking-wider text-foreground cursor-pointer hover:border-primary transition-all animate-pulse"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>PORTFOLIO AI</span>
          </div>
        )}

        <button
          onClick={handleToggle}
          onMouseEnter={onPlayHover}
          aria-label="Toggle AI Assistant"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/45 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden group"
        >
          {/* Animated gradient surface */}
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center transition-colors group-hover:bg-card/80">
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            )}
          </div>
          {/* Pulsing ring aura */}
          <div className="absolute -inset-1 rounded-full bg-primary/30 blur-md -z-10 animate-ping opacity-30" />
        </button>
      </div>

      {/* Interactive AI Assistant Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[600px] flex flex-col rounded-3xl bg-card border border-border shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-border/60 bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif text-lg uppercase tracking-tight">Portfolio AI</h4>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-foreground-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>ONLINE & GROUNDED IN RESUME</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleToggle}
              className="p-1.5 rounded-full hover:bg-muted text-foreground-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[340px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-muted/70 text-foreground rounded-bl-none border border-border/50'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-60 mt-1 block font-mono">
                    {m.time}
                  </span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick FAQ Prompts */}
          <div className="p-3 border-t border-border/40 bg-muted/20">
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted block mb-2 px-1">
              SUGGESTED QUESTIONS:
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {questions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(q.question, q.answer)}
                  onMouseEnter={onPlayHover}
                  className="text-left text-[11px] font-mono px-2.5 py-1 rounded-full bg-card hover:bg-primary hover:text-white border border-border/60 transition-colors"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Input & Quick Actions */}
          <div className="p-4 border-t border-border/60 bg-card">
            <form onSubmit={handleFormSubmit} className="flex gap-2 mb-3">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about tech, projects, or background..."
                className="flex-1 bg-muted/60 border border-border/70 rounded-full px-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/30"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] font-mono text-foreground-muted pt-2 border-t border-border/40">
              <button
                onClick={() => {
                  onPlayClick?.();
                  onOpenContact();
                  setIsOpen(false);
                }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Calendar className="w-3 h-3" />
                <span>MEET</span>
              </button>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>EMAIL</span>
              </a>
              <a
                href={resumePdfUrl}
                download
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>RESUME</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
