import heroVector from "../assets/hero-vec-with-shadow-new.png";

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-left">
                    <h2 className="hero-heading">
                        Small Business<br />
                        Websites<br />
                        <span className="hero-heading-accent">Made Easy!</span>
                    </h2>
                    <p className="hero-body">
                        Affordable, professional <strong>websites</strong> for small businesses
                        that get you online fast with no hassle. Let us do the work while you
                        focus on growing your business.
                    </p>
                    <a href="#contact" className="hero-cta">Get a Free Quote</a>
                </div>

                <div className="hero-right">
                    <img
                        src={heroVector}
                        alt="TooEasyWebsites Hero Vector image"
                        className="hero-vector"
                    />
                </div>
            </div>
        </section>
    );
}