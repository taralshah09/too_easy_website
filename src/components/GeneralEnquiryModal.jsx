import React, { useState } from 'react';

const FORMSUBMIT_EMAILS = ['akeimsuth@gmail.com', 'taralonyt@gmail.com'];

const GeneralEnquiryModal = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                _subject: `General Enquiry from ${formData.name}`,
                _captcha: 'false',
                _template: 'table',
            };
            const results = await Promise.all(
                FORMSUBMIT_EMAILS.map(email =>
                    fetch(`https://formsubmit.co/ajax/${email}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify(payload),
                    })
                )
            );
            if (results.every(r => r.ok)) {
                setIsSubmitted(true);
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (err) {
            console.error(err);
            alert('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box" style={{ maxWidth: '520px' }}>
                <button className="modal-close" onClick={onClose} aria-label="Close">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                </button>

                {isSubmitted ? (
                    <div className="modal-success">
                        <div className="modal-success-icon">✓</div>
                        <h3>Message Sent!</h3>
                        <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
                        <button className="contact-btn contact-btn-primary" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h3 className="modal-title">General Enquiry</h3>
                            <p className="modal-subtitle">We usually reply within a few hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="modal-body" style={{ paddingTop: '20px' }}>
                                <div className="form-step">
                                    <div className="form-group">
                                        <label>Your Name <span className="required">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Smith"
                                            className={errors.name ? 'input-error' : ''}
                                        />
                                        {errors.name && <span className="required" style={{ fontSize: '12px' }}>{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address <span className="required">*</span></label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <span className="required" style={{ fontSize: '12px' }}>{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label>Message <span className="required">*</span></label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us what you need help with…"
                                            style={{ minHeight: '130px' }}
                                        />
                                        {errors.message && <span className="required" style={{ fontSize: '12px' }}>{errors.message}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="contact-btn contact-btn-secondary" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="contact-btn contact-btn-primary" disabled={isSubmitting} style={{ minWidth: '160px' }}>
                                    {isSubmitting ? 'Sending…' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default GeneralEnquiryModal;