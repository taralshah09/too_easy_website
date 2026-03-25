import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header>
        <div className="header-left">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="TooEasyWebsite logo" className="logo" />
          </Link>
          <Link to="/" className="header-brand-link" onClick={closeMenu}>
            <h1>Too<span>Easy</span>Websites</h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="header-right">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Hamburger */}
        <div
          className={`hamburger ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><a href="#" onClick={closeMenu}>About Us</a></li>
          <li><a href="#" onClick={closeMenu}>Our Services</a></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
        </ul>
      </div>
    </>
  )
}