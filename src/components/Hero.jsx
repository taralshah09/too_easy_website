import { Link } from "react-router-dom"
import heroVector from "../assets/hero-vec-with-shadow-new.png"

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-left">
                    <h2 className="hero-heading">
                        Get Two Free Homepage Designs Within Hours - No Obligation
                    </h2>
                    <p className="hero-body">
                        Get two free homepage designs within hours. We are so confident that you are going to love our website designs that we will provide two free website homepage designs within a few hours, with no obligation to buy.
                    </p>
                    <p className="hero-body">
                        Tell us about your small business, send us your logo and any images you want to include, tell us what kind of website you'd like, and we'll bring your ideas and your business to life for <em>free!</em>
                    </p>
                    <Link to="/contact" className="hero-cta">GET FREE DESIGNS</Link>
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
    )
}