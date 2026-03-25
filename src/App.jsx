import { BrowserRouter, Routes, Route } from "react-router-dom"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import WhyChoose from "./components/WhyChoose"
import MadeEasy from "./components/MadeEasy"
import Footer from "./components/Footer"
import ContactPage from "./components/ContactPage"
import About from "./components/About"

function HomePage() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <MadeEasy />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App