import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="footer-brand">
                    &copy; Too<span>Easy</span>Websites
                </p>
                <nav className="footer-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Services</a></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}