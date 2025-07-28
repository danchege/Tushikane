import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProjectPulse from './pages/ProjectPulse';
import Volunteers from './pages/Volunteers';
import Donors from './pages/Donors';
import Contact from './pages/Contact';
import ChatHub from './pages/ChatHub';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projectpulse" element={<ProjectPulse />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chathub" element={<ChatHub />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App; 