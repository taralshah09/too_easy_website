import React from 'react';
import OnboardingForm from './OnboardingForm';

const GetFreeDesignsModal = ({ onClose }) => {
    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{ alignItems: 'flex-start', overflowY: 'auto', paddingTop: '40px', paddingBottom: '40px' }}
        >
            <div style={{ position: 'relative', width: '100%', maxWidth: '760px', margin: '0 auto' }}>
                {/* Close button sits outside the form box, top-right of the wrapper */}
                <button
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close"
                    style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                </button>

                <OnboardingForm />
            </div>
        </div>
    );
};

export default GetFreeDesignsModal;