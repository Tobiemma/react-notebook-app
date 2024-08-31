import { useNavigate } from 'react-router-dom';
import './landing.css';
export function LandingPage(){
const navigate = useNavigate();

const navigateToListPage = () => {
  navigate('/notes')
}
    return (
        <>
         <div className="landing-page">
      <header className="header">
        <h1 className="app-title">Notebook App</h1>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      
      <section className="hero">
        <h2 className="hero-title">Your Notes, Organized</h2>
        <p className="hero-subtitle">Capture your thoughts, organize your ideas, and stay on top of your tasks.</p>
        <button className="cta-button" onClick={navigateToListPage}>Get Started</button>
      </section>
      
      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature-item">
          <h3>Organize Notes</h3>
          <p>Tag, categorize, and manage your notes efficiently.</p>
        </div>
        <div className="feature-item">
          <h3>Cloud Sync</h3>
          <p>Access your notes anywhere with seamless cloud synchronization.</p>
        </div>
        <div className="feature-item">
          <h3>Secure</h3>
          <p>Your notes are encrypted and secure.</p>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About</h2>
        <p>Notebook App is designed to help you keep your ideas organized, no matter where you are.</p>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have questions? <a href="mailto:support@notebookapp.com">Email us</a>.</p>
      </section>

      <footer className="footer">
        <p>© 2024 Notebook App. All rights reserved.</p>
      </footer>
    </div>
        </>
    )
}