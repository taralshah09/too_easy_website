import { useState } from "react";

const faqs = [
    {
        q: "Do I have to come to see you in Perth to discuss my website?",
        a: "No. In fact, we'd rather you didn't come and see us at all because it's a waste of everyone's time and effort. It's also 2026, and there are these things called telephones and computers that can be used to communicate. We will communicate with you by phone and email. No one needs to drive anywhere to see anyone.",
    },
    {
        q: "Do you only build websites for small businesses in Perth?",
        a: "Not at all. We don't care if you are based in Perth, Sydney, Melbourne, Adelaide, Darwin, Brisbane, Hobart or the moon. If you need an affordable website, we are happy to help.",
    },
    {
        q: "How can you make websites at such affordable prices?",
        a: "This is an easy one! We keep it simple. We give you what your business needs to achieve your goals and not pointless and expensive add-ons or flashy extras that distract from the key purpose of the site. Where appropriate, we use existing templates and tailor them to suit your business. After all, you are running a small business, not Amazon!",
    },
    {
        q: "What if I don't like the initial design brief?",
        a: "We will be most offended and remove you from our Christmas card list. Just kidding! Designing a website that works for you is a two-way process. We can tell you what you need and what suits your business and your goals, but ultimately it's your money and your business, so if you want something different to what we have suggested, we'll do that for you and still make sure the site does what it needs to do.",
    },
    {
        q: "What ongoing support do you offer?",
        a: "We will work with you to determine what support you will need going forward and come up with a plan based on your needs. We will either advise you on what you can or should do, or we can offer you a tailored service package that covers things like SEO and site maintenance. If you decide just to take your site and leave, we will be sad and miss you, but we'll get over it in time. If you want to stick around and let us handle your website for you, we'll do that too. We're easy either way.",
    },
];

const youWillGet = [
    "Australia-based professional staff who understand your industry and your business",
    "A professionally developed and visually appealing website that meets your needs and suits your budget",
    "A website that does what it needs to do without silly or annoying gimmicks",
    "A website that improves your online presence and brings in customers",
    "Search Engine Optimisation (SEO) built into the initial design, followed by ongoing support and guidance",
    "Professional and prompt aftercare for any problems or things you want to add or change",
];

const youWontGet = [
    "Ripped off",
    "False promises",
    "Poor customer service",
    "AI slop content on your website",
    "The run-around when you want to make a change to the site",
    "A website with silly gimmicks like flashing images or pop-ups that distract from what the customer wants to see",
];

const steps = [
    {
        num: "1",
        title: "Attract",
        desc: "Get them in the door — onto your site.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                <line x1="22" y1="22" x2="28" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        num: "2",
        title: "Inform",
        desc: "Make information quick, easy to find, and leave no questions unanswered.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="4" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
                <line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="10" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="10" y1="20" x2="17" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        num: "3",
        title: "Action",
        desc: "Give them a way to get in touch or buy your products in a few clicks.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16l6 6 10-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const needFromYou = [
    "A description of your business — what you do, where and how",
    "What you want the website to achieve (e.g. increase visibility, drive sales enquiries, sell products)",
    "Who your competitors are",
    "A couple of examples of websites you like from competitors or similar businesses",
    "Your company logo and any images you want to use — no images? No problem, we can find some",
    "An idea of your budget so we can tailor options that match how much you want to pay",
];

const whatHappensNext = [
    "Send you some simple design briefs of the site",
    "Send you examples of written site content",
    "Get your feedback",
    "Make any necessary changes",
    "Check that you are happy to proceed",
    "Build the site",
];

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            style={{
                background: "var(--color-white)",
                borderRadius: "var(--radius-medium)",
                boxShadow: "0 2px 12px var(--color-shadow)",
                overflow: "hidden",
                transition: "box-shadow 0.3s ease",
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    textAlign: "left",
                    gap: "12px",
                }}
            >
                <span>{q}</span>
                <span
                    style={{
                        flexShrink: 0,
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: open ? "var(--color-accent)" : "var(--color-bg-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: open ? "#fff" : "var(--color-text-primary)",
                        fontSize: "18px",
                        fontWeight: 700,
                        transition: "all 0.3s ease",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                >
                    +
                </span>
            </button>
            <div
                style={{
                    maxHeight: open ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                }}
            >
                <p
                    style={{
                        padding: "0 24px 20px",
                        fontSize: "15px",
                        color: "var(--color-text-body)",
                        lineHeight: 1.75,
                    }}
                >
                    {a}
                </p>
            </div>
        </div>
    );
}

export default function About() {
    return (
        <div style={{ background: "var(--color-bg-gradient-start)", width: "100%" }}>

            {/* ===== HERO BANNER ===== */}
            <section
                style={{
                    width: "100%",
                    padding: "60px 5% 56px",
                    background: "linear-gradient(135deg, var(--color-bg-gradient-start) 0%, var(--color-bg-gradient-end) 100%)",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
                    <h1
                        style={{
                            fontSize: "clamp(32px, 5vw, 56px)",
                            fontWeight: 700,
                            color: "var(--color-text-primary)",
                            lineHeight: 1.2,
                        }}
                    >
                        About{" "}
                        <span style={{ color: "var(--color-accent)" }}>TooEasy</span>Websites
                    </h1>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "var(--color-text-body)",
                            lineHeight: 1.75,
                            maxWidth: "640px",
                        }}
                    >
                        We build fast, affordable, beautifully designed websites optimised for desktop and mobile — for any and all small businesses.
                    </p>
                    <p style={{ fontSize: "15px", color: "var(--color-text-muted)", maxWidth: "700px", lineHeight: 1.7 }}>
                        Plumbers, electricians, tilers, painters, roofers, plasterers, hair salons, cafés, physiotherapists, accountants, personal trainers, landscapers, photographers, mortgage brokers, gyms, mechanics, florists, tattoo artists, dog groomers and many more.
                    </p>
                    <p
                        style={{
                            fontSize: "17px",
                            fontWeight: 600,
                            color: "var(--color-text-primary)",
                            background: "var(--color-white)",
                            borderRadius: "var(--radius-pill)",
                            padding: "12px 28px",
                            boxShadow: "0 2px 12px var(--color-shadow)",
                        }}
                    >
                        Looking for a reasonably priced website that's going to showcase your business and bring in more sales?{" "}
                        <span style={{ color: "var(--color-accent)" }}>We've got you covered.</span>
                    </p>
                </div>
            </section>

            {/* ===== WHAT MAKES A GOOD WEBSITE ===== */}
            <section style={{ width: "100%", padding: "56px 5%", background: "var(--color-white)" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px", alignItems: "center", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
                        What makes a <span style={{ color: "var(--color-accent)" }}>good website?</span>
                    </h2>
                    <p style={{ fontSize: "17px", color: "var(--color-text-body)", lineHeight: 1.8, maxWidth: "780px" }}>
                        Your website is your shop window. It needs to be visually appealing to catch the customer's eye and professionally showcase your products and services. Above all else, your website must include quality written and visual content that gives the customer the information they want at a glance. Lastly, you need a way for them to get in touch or buy your products directly. That's it — that's all your site needs to do.
                    </p>

                    {/* 3 Steps */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "20px",
                            width: "100%",
                            marginTop: "8px",
                        }}
                    >
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "var(--color-bg-light)",
                                    borderRadius: "var(--radius-medium)",
                                    padding: "32px 24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "14px",
                                    textAlign: "center",
                                    boxShadow: "0 2px 12px var(--color-shadow)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        width: "56px",
                                        height: "56px",
                                        borderRadius: "50%",
                                        background: "var(--color-accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        flexShrink: 0,
                                    }}
                                >
                                    {s.icon}
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "16px",
                                        fontSize: "52px",
                                        fontWeight: 800,
                                        color: "rgba(244,180,0,0.1)",
                                        lineHeight: 1,
                                        userSelect: "none",
                                    }}
                                >
                                    {s.num}
                                </div>
                                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}>{s.title}</h3>
                                <p style={{ fontSize: "15px", color: "var(--color-text-body)", lineHeight: 1.6 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontSize: "16px", color: "var(--color-text-muted)", fontStyle: "italic", maxWidth: "660px", lineHeight: 1.7 }}>
                        Your site does the groundwork to bring in the customers — from there, it's up to you to close the sale and bring in some of that sweet profit!
                    </p>
                </div>
            </section>

            {/* ===== WHAT YOU WILL / WON'T GET ===== */}
            <section style={{ width: "100%", padding: "56px 5%", background: "var(--color-bg-gradient-start)" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "36px", alignItems: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "var(--color-text-primary)", textAlign: "center" }}>
                        What you <span style={{ color: "var(--color-accent)" }}>will</span> and <span style={{ color: "var(--color-text-primary)" }}>won't</span> get
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", width: "100%" }}>
                        {/* Will Get */}
                        <div
                            style={{
                                background: "var(--color-white)",
                                borderRadius: "var(--radius-large)",
                                padding: "32px 28px",
                                boxShadow: "0 2px 12px var(--color-shadow)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                                borderTop: "4px solid var(--color-accent)",
                            }}
                        >
                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "var(--color-accent)", fontSize: "24px" }}>✓</span> What you WILL get
                            </h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
                                {youWillGet.map((item, i) => (
                                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "15px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                                        <span style={{ color: "var(--color-accent)", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Won't Get */}
                        <div
                            style={{
                                background: "var(--color-white)",
                                borderRadius: "var(--radius-large)",
                                padding: "32px 28px",
                                boxShadow: "0 2px 12px var(--color-shadow)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                                borderTop: "4px solid var(--color-primary)",
                            }}
                        >
                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ color: "#e05252", fontSize: "22px" }}>✗</span> What you WON'T get
                            </h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
                                {youWontGet.map((item, i) => (
                                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "15px", color: "var(--color-text-body)", lineHeight: 1.6 }}>
                                        <span style={{ color: "#e05252", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✗</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p style={{ fontSize: "16px", color: "var(--color-text-muted)", textAlign: "center", maxWidth: "680px", lineHeight: 1.7 }}>
                        We specialise in websites for small businesses, tradies and sole traders who just need a website that does the job without any hard work or stress. We make the process of getting a professionally developed website <strong style={{ color: "var(--color-accent)" }}>too easy!</strong>
                    </p>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section style={{ width: "100%", padding: "56px 5%", background: "var(--color-white)" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "36px", alignItems: "center", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
                        How it all <span style={{ color: "var(--color-accent)" }}>works</span>
                    </h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", width: "100%", textAlign: "left" }}>
                        {/* What we need from you */}
                        <div
                            style={{
                                background: "var(--color-bg-light)",
                                borderRadius: "var(--radius-large)",
                                padding: "32px 28px",
                                boxShadow: "0 2px 12px var(--color-shadow)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                            }}
                        >
                            <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--color-text-primary)" }}>What we need from you</h3>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
                                {needFromYou.map((item, i) => (
                                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.65 }}>
                                        <span
                                            style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                background: "var(--color-accent)",
                                                color: "#fff",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                marginTop: "1px",
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What happens next */}
                        <div
                            style={{
                                background: "var(--color-bg-light)",
                                borderRadius: "var(--radius-large)",
                                padding: "32px 28px",
                                boxShadow: "0 2px 12px var(--color-shadow)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                            }}
                        >
                            <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--color-text-primary)" }}>What happens next</h3>
                            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", lineHeight: 1.6, marginTop: "-8px" }}>Once we have your information, we will:</p>
                            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
                                {whatHappensNext.map((item, i) => (
                                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "14px", color: "var(--color-text-body)", lineHeight: 1.65 }}>
                                        <span
                                            style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "50%",
                                                background: "var(--color-primary)",
                                                color: "#fff",
                                                fontSize: "12px",
                                                fontWeight: 700,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                marginTop: "1px",
                                            }}
                                        >
                                            {i + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHY PAY SOMEONE ELSE ===== */}
            <section style={{ width: "100%", padding: "56px 5%", background: "var(--color-bg-gradient-start)" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px", alignItems: "center", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
                        Why pay someone else to build a website?{" "}
                        <span style={{ color: "var(--color-accent)" }}>Can't you just do it yourself?</span>
                    </h2>

                    <div
                        style={{
                            background: "var(--color-white)",
                            borderRadius: "var(--radius-large)",
                            padding: "36px 40px",
                            boxShadow: "0 2px 12px var(--color-shadow)",
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
                        {[
                            "Yes, you can do it yourself. You can also cut your own hair, fix your own car and repair your own roof. How's that going to end? Just because you can do something doesn't mean you should. You are an expert at what you do — whether you are a plasterer, plumber, electrician, roofer, tiler, painter and decorator, chef, sports coach, driver, small business owner, music teacher, tutor, pest controller, etc. You should spend your time doing what you do best and what brings in the coin, and let us do what we do best.",
                            "Most 'easy website builders' are not easy at all. It never works out how you think it's going to work and never looks like you think it's going to look. By the time you've watched your 15th YouTube video on 'building a website in three easy steps', and worked out the difference between WordPress.com and Wordpress.org, we'd already be done and you'd have your shiny new website ready to unleash on the world.",
                            "We can tell you from experience that unless you know a thing or two about building websites, you will lose more money in lost time than it would have cost to pay us to build it for you. You will also end up with a pretty crappy website that ranks poorly on search engines and does nothing to increase sales. So, you'd have spent time and effort, lost money and been through hell just to end up back where you were in the first place. If you don't believe us, try. We'll be here waiting for you when you come back.",
                        ].map((para, i) => (
                            <p key={i} style={{ fontSize: "16px", color: "var(--color-text-body)", lineHeight: 1.8 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY US ===== */}
            <section style={{ width: "100%", padding: "56px 5%", background: "var(--color-primary)" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "#fff" }}>
                        So why should you use{" "}
                        <span style={{ color: "var(--color-accent)" }}>TooEasyWebsites?</span>
                    </h2>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.85, maxWidth: "780px" }}>
                        Simple, because we have been where you are and done exactly what you are trying to do now. Many times. We are small business owners who have seen and heard it all before. We've been sucked in by the cheap deals and promised the earth, only to be hit with a big bill and receive nothing but excuses and delays. We've been messed around, and we've been scammed.
                    </p>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.85, maxWidth: "780px" }}>
                        It really shouldn't be this hard to get a good website built at a reasonable price without suffering a heart attack in the process. This is why we started this business. We decided to make something that was too hard, too easy instead.
                    </p>
                    <a
                        href="/contact"
                        style={{
                            display: "inline-block",
                            marginTop: "8px",
                            padding: "14px 36px",
                            background: "var(--color-accent)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "16px",
                            borderRadius: "var(--radius-pill)",
                            textDecoration: "none",
                            letterSpacing: "0.05em",
                            boxShadow: "0 4px 14px rgba(244,180,0,0.35)",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={e => { e.target.style.background = "var(--color-accent-hover)"; e.target.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={e => { e.target.style.background = "var(--color-accent)"; e.target.style.transform = "translateY(0)"; }}
                    >
                        Let's Get Started
                    </a>
                </div>
            </section>

            {/* ===== FAQs ===== */}
            <section style={{ width: "100%", padding: "56px 5% 72px", background: "var(--color-bg-gradient-start)" }}>
                <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
                            Frequently Asked <span style={{ color: "var(--color-accent)" }}>Questions</span>
                        </h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}