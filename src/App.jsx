import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import RecentWork from "./components/RecentWork"
import WhyChoose from "./components/WhyChoose"

Navbar
function App() {

  return (
    <div className="container">
      <Navbar />
      <Hero />
      <WhyChoose />
      <RecentWork />
    </div>
  )
}

export default App
