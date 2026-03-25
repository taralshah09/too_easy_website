import React from 'react'
import OnboardingForm from "./OnboardingForm"

export default function ContactPage() {
    return (
        <section className="contact-page">
            <div className="contact-page-inner">
                <div className="contact-page-header">
                    <h2 className="contact-page-heading">
                        Get In <span>Touch</span>
                    </h2>
                    <p className="contact-page-subheading">
                        Whether you have a quick question or you're ready to get your free designs, we're here to help.
                    </p>
                </div>
                
                <OnboardingForm />
            </div>

        </section>
    )
}