import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Calendar, Hash, ExternalLink } from 'lucide-react';
import AnimatedHeading from './AnimatedHeading';

const certifications = [
  {
    id: 'google-ai',
    title: 'Google AI',
    issuer: 'Google',
    issuedDate: null,
    credentialId: 'VVAO2JFI2YP9',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/VVAO2JFI2YP9',
    skills: ['Generative AI', 'Web Application Development'],
    color: '#4285F4',
    gradient: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
    logo: '🤖',
  },
  {
    id: 'meta-frontend',
    title: 'Introduction to Front-End Development',
    issuer: 'Meta',
    issuedDate: 'Jul 2026',
    credentialId: 'SW5C9XLVL31Q',
    credentialUrl: 'https://coursera.org/share/58b1519315b0a9f9ff286b3c30db8ae0',
    skills: ['JavaScript Frameworks', 'Full-Stack Development'],
    color: '#0866FF',
    gradient: 'linear-gradient(135deg, #0866FF 0%, #23c6e6 100%)',
    logo: '🔷',
  },
  {
    id: 'uf-personality',
    title: 'Personality Types at Work',
    issuer: 'University of Florida',
    issuedDate: 'Jul 2026',
    credentialId: 'UCSWPE6RACOV',
    credentialUrl: 'https://coursera.org/share/bdd3d518f0e48101e6bee2716d6cf108',
    skills: ['Writing', 'Professional Development'],
    color: '#FA4616',
    gradient: 'linear-gradient(135deg, #FA4616 0%, #f7b733 100%)',
    logo: '🎓',
  },
  {
    id: 'macquarie-leadership',
    title: 'Professional Development: Improve Yourself, Always',
    issuer: 'Macquarie University',
    issuedDate: 'Aug 2023',
    credentialId: 'ZXY3JSPB7HQX',
    credentialUrl: 'https://coursera.org/share/72c667bc5452d691656487a2adbaff62',
    skills: ['Leadership', 'Self Development'],
    color: '#c0392b',
    gradient: 'linear-gradient(135deg, #8B0000 0%, #c0392b 100%)',
    logo: '🏛️',
  },
  {
    id: 'google-ai-research',
    title: 'AI for Research and Insights',
    issuer: 'Google',
    issuedDate: 'Jul 2026',
    credentialId: '46IJOZXMJKT3',
    credentialUrl: 'https://coursera.org/share/533de128a5585e2889604fd1317aca0c',
    skills: ['Google Workspace', 'Prompt Engineering Tools'],
    color: '#34A853',
    gradient: 'linear-gradient(135deg, #34A853 0%, #4285F4 100%)',
    logo: '🔬',
  },
  {
    id: 'google-ai-brainstorm',
    title: 'AI for Brainstorming and Planning',
    issuer: 'Google',
    issuedDate: 'Jul 2026',
    credentialId: '6UT3Q1H7PUG5',
    credentialUrl: 'https://coursera.org/share/2677213349d12f0e35359b38c0ddbc09',
    skills: ['Google Workspace', 'AI for Compliance Workflows'],
    color: '#FBBC05',
    gradient: 'linear-gradient(135deg, #FBBC05 0%, #EA4335 100%)',
    logo: '💡',
  },
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CertificationsSection() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="w-full px-6 md:px-24 py-24 relative z-10" id="certifications">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <span className="section-label mb-4 block">... /credentials ...</span>
          <AnimatedHeading
            text="Licenses & Certifications"
            highlight="Certifications"
            variant="slideRight"
            className="text-4xl md:text-5xl font-bold font-['Syne'] text-white mb-4"
          />
          <p className="text-white/60 max-w-2xl text-lg font-['Space_Grotesk']">
            Verified credentials from world-class institutions — spanning AI, full-stack development, and professional growth.
          </p>
        </div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariant}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
            >
              <div
                className="glass-panel rounded-3xl p-6 flex flex-col h-full transition-all duration-500 relative overflow-hidden"
                style={{
                  transform: hoveredId === cert.id ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow:
                    hoveredId === cert.id
                      ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${cert.color}33`
                      : undefined,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${cert.color}18 0%, transparent 65%)`,
                    opacity: hoveredId === cert.id ? 1 : 0,
                  }}
                />

                {/* Top row: logo + verified badge */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-lg"
                    style={{ background: cert.gradient }}
                  >
                    {cert.logo}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-['Space_Mono'] text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>

                {/* Title & Issuer */}
                <div className="relative z-10 flex-grow">
                  <h3 className="text-lg font-bold font-['Syne'] text-white leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <p
                    className="text-sm font-semibold font-['Space_Mono'] mb-4"
                    style={{ color: cert.color }}
                  >
                    {cert.issuer}
                  </p>

                  {/* Meta: date + ID */}
                  <div className="flex flex-col gap-1.5 mb-5">
                    {cert.issuedDate && (
                      <div className="flex items-center gap-2 text-white/50 text-xs font-['Space_Grotesk']">
                        <Calendar className="w-3.5 h-3.5" />
                        Issued {cert.issuedDate}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/40 text-xs font-['Space_Mono'] truncate">
                      <Hash className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{cert.credentialId}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-['Space_Mono'] px-2.5 py-1 rounded-full border text-white/70"
                        style={{
                          background: `${cert.color}15`,
                          borderColor: `${cert.color}30`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Certificate Button */}
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 flex items-center justify-between gap-2 mt-auto px-4 py-2.5 rounded-xl border text-sm font-['Space_Mono'] font-semibold transition-all duration-300"
                  style={{
                    borderColor: `${cert.color}40`,
                    color: cert.color,
                    background: `${cert.color}0D`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${cert.color}25`;
                    e.currentTarget.style.borderColor = `${cert.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${cert.color}0D`;
                    e.currentTarget.style.borderColor = `${cert.color}40`;
                  }}
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-wrap gap-10 items-center"
        >
          {[
            { label: 'Certifications', value: '6+' },
            { label: 'Issuing Orgs', value: '4' },
            { label: 'Platform', value: 'Coursera' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold font-['Syne'] text-white">{stat.value}</div>
              <div className="text-white/40 text-sm font-['Space_Mono'] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
