import React, { useState } from 'react';
import { X, Send, Copy, Check, Calendar, Download, Sparkles } from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  phone?: string;
  resumePdfUrl: string;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
  onPlaySuccess?: () => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  email,
  phone,
  resumePdfUrl,
  onPlayClick,
  onPlayHover,
  onPlaySuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Full-Time Engineering Role',
    message: '',
  });

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    onPlayClick?.();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaySuccess?.();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={() => {
          onPlayClick?.();
          onClose();
        }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-10 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-border/50">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-primary">
              <Sparkles className="w-4 h-4" />
              <span>LET'S CONNECT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight">
              Start Something <span className="italic font-light text-primary">Meaningful</span>
            </h2>
          </div>

          <button
            onClick={() => {
              onPlayClick?.();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-muted text-foreground-muted hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {submitted ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl uppercase tracking-tight">Message Received</h3>
            <p className="font-mono text-xs text-foreground-muted max-w-md mx-auto uppercase">
              Thank you for reaching out. I typically respond within 24 hours. Let's create something extraordinary together!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Form (2 cols) */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border focus:border-primary focus:outline-none font-sans text-xs text-foreground transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border focus:border-primary focus:outline-none font-sans text-xs text-foreground transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted mb-1.5">
                  Inquiry Nature
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border focus:border-primary focus:outline-none font-sans text-xs text-foreground transition-colors"
                >
                  <option>Full-Time Engineering Role</option>
                  <option>Freelance / Contract Project</option>
                  <option>Advisory / Technical Consulting</option>
                  <option>General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-foreground-muted mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Briefly describe your vision, product scope, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted/60 border border-border focus:border-primary focus:outline-none font-sans text-xs text-foreground transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={onPlayHover}
                className="w-full py-3.5 rounded-full bg-primary text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Direct Info (1 col) */}
            <div className="space-y-6 font-mono text-xs border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-6">
              <div>
                <span className="text-foreground-muted uppercase block mb-1">Direct Mail</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="text-foreground font-medium hover:text-primary transition-colors truncate"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-muted text-foreground-muted transition-colors"
                    title="Copy Email"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {phone && (
                <div>
                  <span className="text-foreground-muted uppercase block mb-1">Phone / WhatsApp</span>
                  <a
                    href={`tel:${phone}`}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              )}

              <div>
                <span className="text-foreground-muted uppercase block mb-2">Instant Meeting</span>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-foreground hover:bg-primary hover:text-white transition-colors text-[11px]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK 15-MIN CALL</span>
                </a>
              </div>

              <div>
                <span className="text-foreground-muted uppercase block mb-2">Resume Document</span>
                <a
                  href={resumePdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>GET RESUME (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
