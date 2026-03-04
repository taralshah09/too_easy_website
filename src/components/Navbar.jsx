import { useState } from "react"
import logo from "../assets/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header>
        <div className="header-left">
          <img src={logo} alt="TooEasyWebsite logo" className="logo" />
          <h1>
            Too<span>Easy</span>Websites
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="header-right">
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Portfolio</li>
            <li>Contact Us</li>
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
          <li>Home</li>
          <li>About Us</li>
          <li>Our Services</li>
          <li>Portfolio</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </>
  )
}