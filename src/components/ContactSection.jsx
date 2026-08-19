import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, User, AtSign, MessageSquare, Tag, ArrowUpRight } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

// Brand SVGs (not in lucide-react due to trademark)
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TO_EMAIL = 'kartikrana9938@gmail.com';

const socials = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'kartikrana77',
    href: 'https://github.com/kartikrana77',
    icon: <GithubIcon />,
    color: '#fff',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'kartik-rana-40168b370',
    href: 'https://www.linkedin.com/in/kartik-rana-40168b370/',
    icon: <LinkedinIcon />,
    color: '#0A66C2',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'kartikrana9938@gmail.com',
    href: `mailto:${TO_EMAIL}`,
    icon: <Mail className="w-5 h-5" />,
    color: '#EA4335',
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '+91 • Available on request',
    href: 'tel:+91',
    icon: <Phone className="w-5 h-5" />,
    color: '#34A853',
  },
];

const topics = [
  'Freelance Project',
  'Full-Stack Development',
  'UI / UX Collaboration',
  'Cybersecurity Consulting',
  'AI Integration',
  'Job Opportunity',
  'Other',
];

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px',
  color: '#fff',
  outline: 'none',
  width: '100%',
  padding: '14px 18px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '0.9rem',
  transition: 'border-color 0.3s, box-shadow 0.3s',
};

function Field({ label, icon, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-xs font-['Space_Mono'] text-white/50 uppercase tracking-widest">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [focused, setFocused] = useState('');
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio Contact] ${form.topic || 'Message'} — from ${form.name}`
    );
    const body = encodeURIComponent(
      `Hi Kartik,\n\nName: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\nMessage:\n${form.message}\n\n---\nSent via Portfolio Contact Form`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${TO_EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', topic: '', message: '' });
  };

  const focusStyle = (id) =>
    focused === id
      ? { borderColor: 'rgba(249,115,22,0.6)', boxShadow: '0 0 0 3px rgba(249,115,22,0.08)' }
      : {};

  return (
    <section className="w-full px-6 md:px-24 py-24 relative z-10" id="contact">
      <div className="max-w-6xl mx-auto">

        {/* Giant Heading */}
        <div className="mb-20">
          <AnimatedHeading
            text="Contact me"
            highlight="me"
            variant="zoomSpin"
            className="font-['Syne'] font-black text-white leading-none select-none"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', letterSpacing: '-0.03em' }}
          />
          <p className="text-white/50 text-base font-['Space_Grotesk'] mt-4 max-w-md">
            Have a project, opportunity, or just want to say hello? I'm always open — drop a message.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left — Social Links + Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <span className="section-label">... /find me here ...</span>

            <div className="flex flex-col gap-4 mt-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.id !== 'phone' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 glass-panel rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    '--hover-color': s.color,
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                      color: s.color,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-['Space_Mono'] text-white/40 uppercase tracking-wider">
                      {s.label}
                    </span>
                    <span className="text-sm font-['Space_Grotesk'] text-white/80 truncate group-hover:text-white transition-colors">
                      {s.value}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    className="w-4 h-4 ml-auto shrink-0 text-white/20 group-hover:text-white/70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 mt-4 glass-panel rounded-2xl px-5 py-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div>
                <p className="text-white text-sm font-semibold font-['Space_Grotesk']">Available for work</p>
                <p className="text-white/40 text-xs font-['Space_Mono']">Open to freelance &amp; full-time roles</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <h3 className="text-xl font-bold font-['Syne'] text-white mb-8">Send a message</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Your Name" icon={<User className="w-3.5 h-3.5" />}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Kartik Rana"
                      required
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputBase, ...focusStyle('name') }}
                    />
                  </Field>

                  <Field label="Your Email" icon={<AtSign className="w-3.5 h-3.5" />}>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused('')}
                      style={{ ...inputBase, ...focusStyle('email') }}
                    />
                  </Field>
                </div>

                {/* Topic / Service */}
                <Field label="Topic / Service" icon={<Tag className="w-3.5 h-3.5" />}>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    onFocus={() => setFocused('topic')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...inputBase,
                      ...focusStyle('topic'),
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" disabled style={{ background: '#1a1a1a' }}>Select a topic…</option>
                    {topics.map((t) => (
                      <option key={t} value={t} style={{ background: '#1a1a1a' }}>{t}</option>
                    ))}
                  </select>
                </Field>

                {/* Message */}
                <Field label="Message" icon={<MessageSquare className="w-3.5 h-3.5" />}>
                  <textarea
                    name="message"
                    placeholder="Hi Kartik, I'd love to discuss…"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused('')}
                    style={{
                      ...inputBase,
                      ...focusStyle('message'),
                      resize: 'vertical',
                      minHeight: '130px',
                    }}
                  />
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-['Space_Mono'] font-bold text-sm transition-all duration-300 mt-2"
                  style={{
                    background: sent
                      ? 'rgba(52,168,83,0.9)'
                      : 'var(--color-brand-orange)',
                    color: '#000',
                    boxShadow: sent
                      ? '0 8px 30px rgba(52,168,83,0.3)'
                      : '0 8px 30px rgba(249,115,22,0.3)',
                    transform: 'translateY(0)',
                  }}
                  onMouseEnter={(e) => {
                    if (!sent) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {sent ? (
                    <>✓ Opening Gmail…</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-white/25 text-xs font-['Space_Mono'] text-center">
                  Opens Gmail compose with your message pre-filled →&nbsp;{TO_EMAIL}
                </p>
              </form>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
