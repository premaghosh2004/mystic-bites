import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import '/src/index.css';

const Home = () => {
  useEffect(() => {
    const initParticles = () => {
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
          window.particlesJS('particles-js', {
            particles: {
              number: { 
                value: window.innerWidth < 768 ? 40 : 80,
                density: { enable: true, value_area: window.innerWidth < 768 ? 600 : 800 }
              },
              color: { value: "#8B0000" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: window.innerWidth < 768 ? 3 : 4, random: true },
              line_linked: { 
                enable: true, 
                distance: window.innerWidth < 768 ? 100 : 150,
                color: "#8B0000",
                opacity: 0.4,
                width: 1
              },
              move: { 
                enable: true,
                speed: window.innerWidth < 768 ? 2 : 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out"
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: window.innerWidth > 768, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
              }
            }
          });
        };
        document.body.appendChild(script);
      }
    };
    
    initParticles();
    
    const handleResize = () => {
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroy();
        initParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="modern-home relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <div id="particles-js" className="particles-container absolute inset-0 z-0"></div>

      {/* Glowing Candle - Positioned differently on mobile */}
      <div className="candle-container absolute right-4 bottom-4 sm:right-8 sm:bottom-8 z-10">
        <div className="candle relative w-6 h-16 sm:w-8 sm:h-20">
          <div className="flame absolute top-[-15px] left-1/2 transform -translate-x-1/2 w-3 h-6 sm:w-4 sm:h-8 bg-[#ff5722] rounded-full blur-[1px] animate-flicker"></div>
          <div className="wax absolute bottom-0 w-full h-[70%] bg-gradient-to-r from-[#e0e0e0] via-[#f0f0f0] to-[#e0e0e0]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="modern-content relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center flex flex-col items-center justify-center min-h-[90vh]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-gothic text-crimsonRed mb-4 sm:mb-6 leading-tight">
          <span className="title-part-1 block sm:inline-block animate-float">MYSTIC</span>
          <span className="title-part-2 block sm:inline-block animate-float-reverse sm:ml-2">BITES</span>
          <span className="title-highlight block h-1 w-0 mx-auto bg-crimsonRed mt-2 animate-highlight-grow"></span>
        </h1>
        
        <p className="modern-subtitle text-base sm:text-lg md:text-xl text-boneWhite mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Welcome to the ultimate <span className="glowing-text font-bold">Vampire Diaries</span>-themed restaurant in India
        </p>
        
        <div className="modern-cta mt-6 sm:mt-8">
          <a href="/menu" className="liquid-button inline-block text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base md:text-lg bg-bloodRed hover:bg-crimsonRed transition-all duration-300 relative overflow-hidden group">
            <span className="relative z-10">EXPLORE BLOOD MENU</span>
            <div className="liquid absolute top-[-80px] left-0 w-full h-[200px] bg-crimsonRed transition-all duration-500 group-hover:top-[-120px]"></div>
          </a>
        </div>
        
        <p className="modern-quote mt-8 sm:mt-10 text-sm sm:text-base text-gray-300 italic max-w-md mx-auto px-4 py-3 rounded-lg bg-black bg-opacity-30 border-l-4 border-bloodRed">
          "You want a love that consumes you..."<br />
          <span className="text-bloodRed font-semibold not-italic">— Damon Salvatore</span>
        </p>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
