import React, { useState } from 'react';
import GeneralEnquiryModal from './GeneralEnquiryModal';
import GetFreeDesignsModal from './GetFreeDesignsModal';

// ── Icon components (inline SVG, no external dep) ──────────────────────────
const ChatIcon = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="var(--color-bg-light)" />
        <path d="M10 13a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5l-4 3v-3h-3a2 2 0 0 1-2-2V13Z"
            stroke="var(--color-primary)" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <circle cx="14.5" cy="16.5" r="1" fill="var(--color-primary)" />
        <circle cx="18" cy="16.5" r="1" fill="var(--color-primary)" />
        <circle cx="21.5" cy="16.5" r="1" fill="var(--color-primary)" />
    </svg>
);

const DesignIcon = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="rgba(244,180,0,0.12)" />
        <path d="M13 24l2-6 9-9a1.41 1.41 0 0 1 2 2l-9 9-4 2Z"
            stroke="var(--color-accent)" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
        <path d="M22 13l1 1" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11 26h14" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
);

// ── Stat badge ──────────────────────────────────────────────────────────────
const StatBadge = ({ value, label }) => (
    <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '2px', padding: '10px 18px',
        background: 'var(--color-bg-light)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
    }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)', lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500 }}>{label}</span>
    </div>
);

// ── Main component ──────────────────────────────────────────────────────────
export default function ContactPage() {
    const [activeModal, setActiveModal] = useState(null); // 'enquiry' | 'designs' | null

    const openEnquiry = () => setActiveModal('enquiry');
    const openDesigns = () => setActiveModal('designs');
    const closeModal = () => setActiveModal(null);

    return (
        <>
            <section className="contact-page">
                <div className="contact-page-inner">

                    {/* ── Header ── */}
                    <div className="contact-page-header">
                        <h2 className="contact-page-heading">
                            Let's Build <span>Something</span> Great
                        </h2>
                        <p className="contact-page-subheading">
                            Have a quick question, or ready to kick off your project? Pick the option that fits — we're here either way.
                        </p>

                        {/* Stats row */}
                        {/*<div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
                            <StatBadge value="48h" label="Avg. Response" />
                            <StatBadge value="100+" label="Sites Delivered" />
                            <StatBadge value="Free" label="Design Preview" />
                        </div>*/}
                    </div>

                    {/* ── Cards ── */}
                    <div className="contact-cards" style={{ maxWidth: '820px', width: '100%' }}>

                        {/* Card 1 — General Enquiry */}
                        <div className="contact-card">
                            <div className="contact-card-icon">
                                <ChatIcon />
                            </div>
                            <h3 className="contact-card-title">General Enquiry</h3>
                            <p className="contact-card-desc">
                                Got a question about pricing, process, or anything else? Drop us a message and we'll get back to you quickly.
                            </p>

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: 'auto' }}>
                                <div style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: '#22c55e', flexShrink: 0,
                                    boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
                                }} />
                                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Usually replies within a few hours</span>
                            </div>

                            <button
                                className="contact-btn contact-btn-secondary"
                                onClick={openEnquiry}
                                style={{ width: '100%', marginTop: '4px' }}
                            >
                                Send a Message
                            </button>
                        </div>

                        {/* Card 2 — Get Free Designs */}
                        <div className="contact-card contact-card-featured">
                            <div className="contact-card-icon contact-card-icon-accent">
                                <DesignIcon />
                            </div>

                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                background: 'var(--color-accent)', color: '#fff',
                                fontSize: '11px', fontWeight: 700,
                                padding: '3px 10px', borderRadius: '999px',
                                letterSpacing: '0.06em', textTransform: 'uppercase',
                            }}>
                                ✦ Most Popular
                            </div>

                            <h3 className="contact-card-title">Get Free Designs</h3>
                            <p className="contact-card-desc">
                                Ready to get started? Share your business details and we'll put together free design concepts tailored to your brand.
                            </p>

                            <ul style={{
                                listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px',
                                width: '100%', padding: 0, marginTop: '4px',
                            }}>
                                {['No commitment required', 'Custom to your business', 'Fast turnaround'].map(item => (
                                    <li key={item} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        fontSize: '13px', color: 'var(--color-text-body)',
                                    }}>
                                        <span style={{
                                            width: '18px', height: '18px', borderRadius: '50%',
                                            background: 'rgba(244,180,0,0.15)', color: 'var(--color-accent)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '10px', fontWeight: 700, flexShrink: 0,
                                        }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="contact-btn contact-btn-primary"
                                onClick={openDesigns}
                                style={{ width: '100%', marginTop: '4px' }}
                            >
                                GET FREE DESIGNS →
                            </button>
                        </div>
                    </div>

                    {/* ── Bottom reassurance strip ── */}
                    {/*
                    <div style={{
                        display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center',
                        paddingTop: '8px',
                    }}>
                        {[
                            { icon: '🔒', text: 'Your data is safe with us' },
                            { icon: '📞', text: 'No pushy sales calls' },
                            { icon: '⚡', text: 'Fast, friendly service' },
                        ].map(({ icon, text }) => (
                            <div key={text} style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                fontSize: '13px', color: 'var(--color-text-muted)',
                            }}>
                                <span style={{ fontSize: '16px' }}>{icon}</span>
                                {text}
                            </div>
                        ))}
                    </div>
                    */}
                </div>
            </section>

            {/* ── Modals ── */}
            {activeModal === 'enquiry' && <GeneralEnquiryModal onClose={closeModal} />}
            {activeModal === 'designs' && <GetFreeDesignsModal onClose={closeModal} />}
        </>
    );
}
