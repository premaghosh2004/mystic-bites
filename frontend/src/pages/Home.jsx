import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import '/src/index.css';

const Home = () => {
  useEffect(() => {
    // Initialize particle effects when component mounts
    const initParticles = () => {
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
          window.particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#8B0000" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 4, random: true },
              line_linked: { enable: true, distance: 150, color: "#8B0000", opacity: 0.4, width: 1 },
              move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
              }
            }
          });
        };
        document.body.appendChild(script);
      }
    };
    initParticles();
  }, []);

  return (
    <div className="modern-home">
      {/* Interactive Particle Background */}
      <div id="particles-js" className="particles-container"></div>


      {/* Glowing Candle */}
      <div className="candle-container">
        <div className="candle">
          <div className="flame"></div>
          <div className="wax"></div>
        </div>
      </div>

      {/* Main Content with GSAP Animations */}
      <div className="modern-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h1
  className="text-4xl sm:text-5xl md:text-6xl font-gothic text-crimsonRed mb-4"
  data-aos="fade-down"
  data-aos-duration="1000"
>
          <span className="title-part-1">MYSTIC</span>
          <span className="title-part-2">BITES</span>
          <span className="title-highlight"></span>
        </h1>
        
        <p className="modern-subtitle text-sm sm:text-base md:text-lg text-boneWhite mb-6" data-aos="fade-up" data-aos-delay="300">
          Welcome to the ultimate <span className="glowing-text">Vampire Diaries</span>-themed restaurant in India
        </p>
        
        <div className="modern-cta mt-6 flex justify-center" data-aos="zoom-in" data-aos-delay="600">
          <a href="/menu" className="liquid-button text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base bg-bloodRed hover:bg-crimsonRed transition duration-300 relative">
            <span>EXPLORE BLOOD MENU</span>
            <div className="liquid"></div>
          </a>
        </div>
        
        <p className="modern-quote mt-6 text-xs sm:text-sm md:text-base text-gray-300 italic" data-aos="fade-up" data-aos-delay="900">
          "You want a love that consumes you..." — Damon Salvatore
        </p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
