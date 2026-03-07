import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import RecentWork from "./components/RecentWork"
import WhyChoose from "./components/WhyChoose"
import MadeEasy from "./components/MadeEasy"
import Footer from "./components/Footer"

Navbar
function App() {

  return (
    <div className="container">
      <Navbar />
      <Hero />
      <WhyChoose />
      <MadeEasy />
      <RecentWork />
      <Footer />
    </div>
  )
}

export default App
