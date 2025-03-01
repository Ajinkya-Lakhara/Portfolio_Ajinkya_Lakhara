import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './components/Contact.jsx';
import Clients from './sections/Clients.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Experience from './components/Experience.jsx';
import Education from './components/Education.jsx';
import StarsCanvas from './components/canvas/Stars.jsx';

const App = () => {
  return (
    <div>
    <main className="max-w-7xl mx-auto relative">
    <Navbar />
    <div className='relative z-0'>
      
      <Hero />
      <StarsCanvas />
      </div>
      <About />
      
      <div className='relative z-0'>
      <Experience/>
      <StarsCanvas />
      </div>
      <Education/>
      {/* <Projects /> */}
      
    </main>
    <div className='relative z-0'>
      <Contact />
      <StarsCanvas />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;


