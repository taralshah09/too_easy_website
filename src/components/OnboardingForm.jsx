import React, { useState } from 'react';
import phoneCodes from '../data/phoneCode.json';


const OnboardingForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "+1",
        phone: "",
        businessName: "",
        businessType: "",
        businessAddress: "",
        locationsCovered: "",
        currentWebsite: "",
        websitePurpose: [],
        websitePurposeOther: "",
        targetAudience: "",
        userActions: [],
        userActionsOther: "",
        uniqueSellingPoints: "",
        hasLogo: "",
        logoUpload: null,
        wantLogoDesign: "",
        logoDescription: "",
        logoColors: "",
        leaveToDesigner: false,
        exampleWebsite1: "",
        exampleWebsite2: "",
        designStyles: [],
        customStyle: "",
        pages: [],
        productServiceDetails: "",
        needsPayments: "",
        needsBlog: "",
        hasContent: "",
        contentUpload: null,
        wantContentWriting: "",
        contentInstructions: "",
        hasImages: "",
        imageUpload: null,
        userManagesSite: "",
        weManageSite: "",
        needsSEO: "",
        budget: "",
        launchDate: "",
        additionalNotes: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            // Checkboxes are handled via specialty functions
        } else if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: e.target.files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCheckboxGroup = (groupName, value) => {
        setFormData(prev => {
            const currentArr = prev[groupName] || [];
            if (currentArr.includes(value)) {
                return { ...prev, [groupName]: currentArr.filter(item => item !== value) };
            } else {
                return { ...prev, [groupName]: [...currentArr, value] };
            }
        });
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.firstName) newErrors.firstName = "First name is required";
            if (!formData.lastName) newErrors.lastName = "Last name is required";
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
            if (!formData.phone) {
                newErrors.phone = "Phone is required";
            } else if (!/^\d+$/.test(formData.phone)) {
                newErrors.phone = "Phone must be numeric";
            } else if (formData.phone.length !== 10) {
                newErrors.phone = "Phone must be exactly 10 digits";
            }
            if (!formData.businessName) newErrors.businessName = "Business name is required";
            if (!formData.businessType) newErrors.businessType = "Business type is required";
            if (!formData.businessAddress) newErrors.businessAddress = "Business address is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSkip = () => {
        if (isSubmitting) return;
        if (currentStep === 1) {
            if (validateStep(1)) {
                setCurrentStep(9);
                window.scrollTo(0, 0);
            }
        } else if (currentStep < 9) {
            setCurrentStep(9);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            setIsSubmitting(true);
            try {
                // Formatting data for Email submission using formsubmit.co
                const submissionData = new FormData();
                Object.keys(formData).forEach(key => {
                    const value = formData[key];
                    if (value instanceof File) {
                        submissionData.append(key, value);
                    } else if (Array.isArray(value)) {
                        submissionData.append(key, value.join(', '));
                    } else if (value !== null && value !== undefined && value !== "") {
                        submissionData.append(key, value);
                    }
                });

                // Adding formatting hints for FormSubmit
                submissionData.append("_subject", `New Onboarding Submission: ${formData.businessName}`);
                submissionData.append("_replyto", formData.email);
                submissionData.append("_template", "table");

                const response = await fetch("https://formsubmit.co/ajax/taralonyt@gmail.com", {
                    method: "POST",
                    body: submissionData
                });

                if (response.ok) {
                    setIsSubmitted(true);
                } else {
                    alert("There was an error submitting the form. Please try again.");
                }
            } catch (error) {
                console.error("Submission error:", error);
                alert("An unexpected error occurred. Please try again.");
            } finally {
                setIsSubmitting(false);
                window.scrollTo(0, 0);
            }
        }
    };

    if (isSubmitted) {
        return (
            <div className="modal-success" style={{ margin: '0 auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-large)', background: 'var(--color-white)', maxWidth: '900px', width: '100%' }}>
                <div className="modal-success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your business information has been successfully shared with us. We'll start reviewing your requirements and get in touch with you shortly.</p>
                <button
                    className="contact-btn contact-btn-primary"
                    onClick={() => {
                        setIsSubmitted(false);
                        setCurrentStep(1);
                        setFormData({
                            firstName: "", lastName: "", email: "", phoneCode: "+1", phone: "", businessName: "", businessType: "", businessAddress: "",
                            locationsCovered: "", currentWebsite: "", websitePurpose: [], websitePurposeOther: "", targetAudience: "",
                            userActions: [], userActionsOther: "", uniqueSellingPoints: "", hasLogo: "", logoUpload: null,
                            wantLogoDesign: "", logoDescription: "", logoColors: "", leaveToDesigner: false, exampleWebsite1: "",
                            exampleWebsite2: "", designStyles: [], customStyle: "", pages: [], productServiceDetails: "",
                            needsPayments: "", needsBlog: "", hasContent: "", contentUpload: null, wantContentWriting: "",
                            contentInstructions: "", hasImages: "", imageUpload: null, userManagesSite: "", weManageSite: "",
                            needsSEO: "", budget: "", launchDate: "", additionalNotes: ""
                        });
                    }}
                >
                    Back to Form
                </button>
            </div>
        );
    }

    const renderStepNumbers = () => {
        const totalSteps = 9;
        const dots = [];
        for (let i = 1; i <= totalSteps; i++) {
            dots.push(
                <div
                    key={i}
                    className={`step-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
                    title={`Step ${i}`}
                ></div>
            );
        }
        return <div className="step-indicator">{dots}</div>;
    };

    return (
        <form className="modal-box modal-box-large" style={{ margin: '0 auto', overflow: 'visible' }} onSubmit={handleSubmit}>
            <div className="modal-header">
                <h3 className="modal-title">Project Onboarding</h3>
                <p className="modal-subtitle">Step {currentStep} of 9 - Leave blank if unsure</p>
                {renderStepNumbers()}
            </div>

            <div className="modal-body" style={{ overflow: 'visible' }}>
                {currentStep === 1 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 1: About You and Your Business</h4>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name <span className="required">*</span></label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className={errors.firstName ? 'input-error' : ''} />
                                {errors.firstName && <span className="required" style={{ fontSize: '12px' }}>{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label>Last Name <span className="required">*</span></label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" />
                                {errors.lastName && <span className="required" style={{ fontSize: '12px' }}>{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Email <span className="required">*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                                {errors.email && <span className="required" style={{ fontSize: '12px' }}>{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label>Phone <span className="required">*</span></label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select
                                        name="phoneCode"
                                        value={formData.phoneCode}
                                        onChange={handleChange}
                                        className="phone-code-select"
                                        style={{
                                            width: '130px',
                                            padding: '11px 12px',
                                            border: '1.5px solid var(--color-border)',
                                            borderRadius: '10px',
                                            background: 'var(--color-bg-light)',
                                            fontFamily: 'inherit',
                                            fontSize: '14px',
                                            color: 'var(--color-text-primary)',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {phoneCodes.data.map((country, idx) => (
                                            <option key={`${country.code}-${idx}`} value={country.callingCode}>
                                                {country.name} ({country.callingCode})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="10-digit number"
                                        style={{
                                            flex: 1,
                                            borderColor: errors.phone ? '#e05252' : 'var(--color-border)'
                                        }}
                                    />
                                </div>
                                {errors.phone && <span className="required" style={{ fontSize: '12px' }}>{errors.phone}</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Business Name <span className="required">*</span></label>
                            <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
                            {errors.businessName && <span className="required" style={{ fontSize: '12px' }}>{errors.businessName}</span>}
                        </div>
                        <div className="form-group">
                            <label>Business Type <span className="required">*</span></label>
                            <input type="text" name="businessType" value={formData.businessType} onChange={handleChange} placeholder="e.g. Retail, Service, Food" />
                            {errors.businessType && <span className="required" style={{ fontSize: '12px' }}>{errors.businessType}</span>}
                        </div>
                        <div className="form-group">
                            <label>Business Address <span className="required">*</span></label>
                            <textarea name="businessAddress" value={formData.businessAddress} onChange={handleChange} placeholder="Full address"></textarea>
                            {errors.businessAddress && <span className="required" style={{ fontSize: '12px' }}>{errors.businessAddress}</span>}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Locations Covered</label>
                                <input type="text" name="locationsCovered" value={formData.locationsCovered} onChange={handleChange} placeholder="Optional" />
                            </div>
                            <div className="form-group">
                                <label>Current Website</label>
                                <input type="url" name="currentWebsite" value={formData.currentWebsite} onChange={handleChange} placeholder="https:// Optional" />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 2: About Your Business</h4>
                        <div className="form-group">
                            <label>Main Purpose of the Website (Select multiple)</label>
                            <div className="checkbox-grid">
                                {['Generate enquiries or leads', 'Drive people to attend business', 'Sell products online', 'Maintain online presence', 'Other'].map(opt => (
                                    <label key={opt} className="checkbox-item">
                                        <input type="checkbox" checked={formData.websitePurpose.includes(opt)} onChange={() => handleCheckboxGroup('websitePurpose', opt)} />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.websitePurpose.includes('Other') && (
                                <input type="text" name="websitePurposeOther" value={formData.websitePurposeOther} onChange={handleChange} placeholder="Specify other purpose" className="mt-8" />
                            )}
                        </div>
                        <div className="form-group">
                            <label>Target Audience</label>
                            <textarea name="targetAudience" value={formData.targetAudience} onChange={handleChange} placeholder="Describe your ideal customers"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Key User Actions</label>
                            <div className="checkbox-grid">
                                {['Call', 'Email', 'Browse products', 'Buy/pay online', 'Login', 'Leave reviews', 'Other'].map(opt => (
                                    <label key={opt} className="checkbox-item">
                                        <input type="checkbox" checked={formData.userActions.includes(opt)} onChange={() => handleCheckboxGroup('userActions', opt)} />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                            {formData.userActions.includes('Other') && (
                                <input type="text" name="userActionsOther" value={formData.userActionsOther} onChange={handleChange} placeholder="Specify other action" className="mt-8" />
                            )}
                        </div>
                        <div className="form-group">
                            <label>Unique Selling Points (USPs)</label>
                            <textarea name="uniqueSellingPoints" value={formData.uniqueSellingPoints} onChange={handleChange} placeholder="What makes your business better?"></textarea>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 3: Design Elements</h4>
                        <div className="form-group">
                            <label>Do you have a logo?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="hasLogo" value="yes" checked={formData.hasLogo === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="hasLogo" value="no" checked={formData.hasLogo === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        {formData.hasLogo === 'yes' && (
                            <div className="sub-fields">
                                <label>Upload Logo</label>
                                <div className="file-upload-area">
                                    {formData.logoUpload ? <span>{formData.logoUpload.name} selected</span> : <span>Click to upload logo</span>}
                                    <input type="file" name="logoUpload" onChange={handleChange} accept="image/*" />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Do you want us to design your logo?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="wantLogoDesign" value="yes" checked={formData.wantLogoDesign === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="wantLogoDesign" value="no" checked={formData.wantLogoDesign === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        {formData.wantLogoDesign === 'yes' && (
                            <div className="sub-fields" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div className="form-group">
                                    <label>Logo Vision/Description</label>
                                    <textarea name="logoDescription" value={formData.logoDescription} onChange={handleChange}></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Color Preferences</label>
                                    <input type="text" name="logoColors" value={formData.logoColors} onChange={handleChange} placeholder="e.g. Navy Blue, Golden" />
                                </div>
                                <label className="checkbox-item">
                                    <input type="checkbox" name="leaveToDesigner" checked={formData.leaveToDesigner} onChange={e => setFormData(p => ({ ...p, leaveToDesigner: e.target.checked }))} />
                                    <span>Allow designer full creative freedom</span>
                                </label>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 4: Design Preferences</h4>
                        <div className="form-group">
                            <label>Inspiration Links</label>
                            <input type="url" name="exampleWebsite1" value={formData.exampleWebsite1} onChange={handleChange} placeholder="Example Site 1" style={{ marginBottom: '10px' }} />
                            <input type="url" name="exampleWebsite2" value={formData.exampleWebsite2} onChange={handleChange} placeholder="Example Site 2" />
                        </div>
                        <div className="form-group">
                            <label>Desired Style Words (Select all that apply)</label>
                            <div className="checkbox-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                {['Trustworthy', 'Modern and dynamic', 'Old and established', 'Corporate and serious', 'Soft and warm', 'Industrial/mechanical', 'Urban', 'Rural or remote', 'Marine/water', 'For kids', 'Healthy and young', 'Elderly', 'Safe', 'Dangerous/risky', 'Friendly', 'Masculine', 'Feminine'].map(style => (
                                    <label key={style} className="checkbox-item">
                                        <input type="checkbox" checked={formData.designStyles.includes(style)} onChange={() => handleCheckboxGroup('designStyles', style)} />
                                        <span>{style}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Any other style comments?</label>
                            <input type="text" name="customStyle" value={formData.customStyle} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 5: Website Requirements</h4>
                        <div className="form-group">
                            <label>What pages do you need?</label>
                            <div className="checkbox-grid">
                                {['Home', 'About Us', 'Product/Service Pages'].map(pg => (
                                    <label key={pg} className="checkbox-item">
                                        <input type="checkbox" checked={formData.pages.includes(pg)} onChange={() => handleCheckboxGroup('pages', pg)} />
                                        <span>{pg}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Service/Product Overviews</label>
                            <textarea name="productServiceDetails" value={formData.productServiceDetails} onChange={handleChange} placeholder="What do you want us to present?"></textarea>
                        </div>
                        <div className="radio-row">
                            <div className="form-group">
                                <label>Needs Payments?</label>
                                <div className="radio-row">
                                    <label className="radio-item"><input type="radio" name="needsPayments" value="yes" checked={formData.needsPayments === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                    <label className="radio-item"><input type="radio" name="needsPayments" value="no" checked={formData.needsPayments === 'no'} onChange={handleChange} /><span>No</span></label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Needs Blog?</label>
                                <div className="radio-row">
                                    <label className="radio-item"><input type="radio" name="needsBlog" value="yes" checked={formData.needsBlog === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                    <label className="radio-item"><input type="radio" name="needsBlog" value="no" checked={formData.needsBlog === 'no'} onChange={handleChange} /><span>No</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 6 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 6: Content</h4>
                        <div className="form-group">
                            <label>Do you have written content?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="hasContent" value="yes" checked={formData.hasContent === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="hasContent" value="no" checked={formData.hasContent === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        {formData.hasContent === 'yes' && (
                            <div className="sub-fields">
                                <div className="file-upload-area">
                                    {formData.contentUpload ? <span>{formData.contentUpload.name} selected</span> : <span>Upload content file</span>}
                                    <input type="file" name="contentUpload" onChange={handleChange} />
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Want us to write content?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="wantContentWriting" value="yes" checked={formData.wantContentWriting === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="wantContentWriting" value="no" checked={formData.wantContentWriting === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        {formData.wantContentWriting === 'yes' && (
                            <textarea name="contentInstructions" value={formData.contentInstructions} onChange={handleChange} placeholder="Instructions for the copywriter"></textarea>
                        )}
                        <div className="form-group mt-12">
                            <label>Do you have business images?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="hasImages" value="yes" checked={formData.hasImages === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="hasImages" value="no" checked={formData.hasImages === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        {formData.hasImages === 'yes' && (
                            <div className="sub-fields">
                                <div className="file-upload-area">
                                    {formData.imageUpload ? <span>{formData.imageUpload.name} selected</span> : <span>Upload images (zip preferred)</span>}
                                    <input type="file" name="imageUpload" onChange={handleChange} />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 7 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 7: Site Management</h4>
                        <div className="form-group">
                            <label>Will you manage the site?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="userManagesSite" value="yes" checked={formData.userManagesSite === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="userManagesSite" value="no" checked={formData.userManagesSite === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Do you want us to manage it?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="weManageSite" value="yes" checked={formData.weManageSite === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="weManageSite" value="no" checked={formData.weManageSite === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Needs SEO services?</label>
                            <div className="radio-row">
                                <label className="radio-item"><input type="radio" name="needsSEO" value="yes" checked={formData.needsSEO === 'yes'} onChange={handleChange} /><span>Yes</span></label>
                                <label className="radio-item"><input type="radio" name="needsSEO" value="no" checked={formData.needsSEO === 'no'} onChange={handleChange} /><span>No</span></label>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 8 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 8: Budget & Timeline</h4>
                        <div className="form-group">
                            <label>Estimated Budget</label>
                            <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g. $1000" />
                        </div>
                        <div className="form-group">
                            <label>Expected Launch Date</label>
                            <input type="date" name="launchDate" value={formData.launchDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} style={{ padding: '10px' }} />
                        </div>
                    </div>
                )}

                {currentStep === 9 && (
                    <div className="form-step">
                        <h4 className="step-title">Section 9: Additional Info</h4>
                        <div className="form-group">
                            <label>Anything else for the team?</label>
                            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} style={{ minHeight: '180px' }}></textarea>
                        </div>
                    </div>
                )}
            </div>

            <div className="modal-footer">
                <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                    {currentStep > 1 && (
                        <button type="button" className="contact-btn contact-btn-secondary" onClick={handleBack} disabled={isSubmitting} style={{ minWidth: '100px' }}>
                            Back
                        </button>
                    )}
                    {currentStep < 9 && (
                        <button type="button" className="contact-btn contact-btn-secondary" onClick={handleSkip} disabled={isSubmitting} style={{ minWidth: '100px' }}>
                            Skip to Last
                        </button>
                    )}
                </div>

                {currentStep < 9 ? (
                    <button type="button" className="contact-btn contact-btn-primary" onClick={handleNext} style={{ minWidth: '160px' }}>
                        Next Step
                    </button>
                ) : (
                    <button type="submit" className="contact-btn contact-btn-primary" disabled={isSubmitting} style={{ minWidth: '160px' }}>
                        {isSubmitting ? "Submitting..." : "Submit My Details"}
                    </button>
                )}
            </div>
        </form>
    );
};

export default OnboardingForm;
