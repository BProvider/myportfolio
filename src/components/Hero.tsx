import React, { useEffect, useRef } from 'react';
import { ChevronDown, Code, Zap, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);

  const roles = [
    'Android Developer',
    'Full-Stack Developer', 
    'Problem Solver',
    'UI/UX Enthusiast',
    'Tech Innovator'
  ];

  useEffect(() => {
    if (imageRef.current && textRef.current) {
      imageRef.current.style.opacity = '1';
      imageRef.current.style.transform = 'translateY(0)';
      
      const elements = textRef.current.querySelectorAll('.animate-in');
      elements.forEach((element, index) => {
        setTimeout(() => {
          (element as HTMLElement).style.opacity = '1';
          (element as HTMLElement).style.transform = 'translateY(0)';
        }, 300 + index * 100);
      });
    }
  }, []);

  // Dynamic typing effect
  useEffect(() => {
    const currentText = roles[currentRole];
    let index = 0;
    
    const typeText = () => {
      if (index < currentText.length) {
        setDisplayText(currentText.slice(0, index + 1));
        index++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setTimeout(() => {
            setDisplayText('');
            setCurrentRole((prev) => (prev + 1) % roles.length);
            setIsTyping(true);
          }, 2000);
        }, 1500);
      }
    };

    if (isTyping) {
      typeText();
    }
  }, [currentRole, isTyping]);

  const scrollToPersonalInfo = () => {
    const personalInfoSection = document.getElementById('personal-info');
    if (personalInfoSection) {
      window.scrollTo({
        top: personalInfoSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-6 flex items-center relative overflow-hidden"
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/10 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-cyan-400/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-purple-400/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-green-400/10 rounded-full animate-float-slow"></div>
        
        {/* Animated Icons */}
        <div className="absolute top-32 right-10 text-yellow-400/20 animate-spin-slow">
          <Code size={32} />
        </div>
        <div className="absolute bottom-32 left-10 text-cyan-400/20 animate-pulse-glow">
          <Zap size={28} />
        </div>
        <div className="absolute top-1/2 right-5 text-purple-400/20 animate-bounce-gentle">
          <Star size={24} />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="lg:w-1/3 flex justify-center order-1 lg:order-1">
            <div className="relative group perspective-1000">
              {/* Multiple glowing rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700 animate-pulse-glow"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse-glow-delayed"></div>
              
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-400 p-1 animate-spin-slow">
                <div className="w-full h-full bg-slate-900 rounded-full"></div>
              </div>
              
              <img
                ref={imageRef}
                src="https://avatars.githubusercontent.com/u/109984220?s=400&u=830ae2d7210f7a7b6ca3efbe266e2d99faf79e86&v=4"
                alt="Rakib Hossain"
                className="relative rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-yellow-400 shadow-lg shadow-cyan-500/20 opacity-0 transform translate-y-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3d z-10"
              />
              
              {/* Floating particles around image */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-60"></div>
              <div className="absolute top-20 right-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float-delayed opacity-70"></div>
              <div className="absolute bottom-16 left-6 w-2.5 h-2.5 bg-purple-400 rounded-full animate-float-slow opacity-50"></div>
              <div className="absolute bottom-10 right-12 w-1 h-1 bg-green-400 rounded-full animate-float opacity-80"></div>
            </div>
          </div>

          <div 
            ref={textRef}
            className="lg:w-2/3 text-center lg:text-left order-2 lg:order-2 relative"
          >
            {/* Background text effect */}
            <div className="absolute -top-10 -left-10 text-8xl font-bold text-slate-800/5 select-none pointer-events-none animate-float-slow">
              CODE
            </div>
            
            <h2 className="animate-in text-base md:text-lg text-cyan-400 font-medium mb-2 md:mb-3 opacity-0 transform translate-y-8 transition-all duration-700">
              <span className="inline-block animate-wave">👋</span> Hello, I am
            </h2>
            
            <h1 className="animate-in text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 opacity-0 transform translate-y-8 transition-all duration-700 leading-tight relative">
              <span className="text-yellow-400 animate-glow-text">Rakib</span> 
              <span className="ml-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-shimmer-text">Hossain</span>
            </h1>
            
            <h3 className="animate-in text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 opacity-0 transform translate-y-8 transition-all duration-700 h-8 md:h-10">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                {displayText}
                <span className="animate-blink">|</span>
              </span>
            </h3>
            
            <p className="animate-in text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed opacity-0 transform translate-y-8 transition-all duration-700 text-sm md:text-base">
              A <span className="text-white font-medium animate-highlight">passionate developer</span> with 3+ years of experience in <span className="text-white font-medium animate-highlight-delayed">Android</span> and <span className="text-white font-medium animate-highlight-slow">Web Development</span>. I specialize in creating high-performance mobile apps and scalable web applications.
            </p>
            
            <div className="animate-in flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 opacity-0 transform translate-y-8 transition-all duration-700 relative">
              <a 
                href="https://drive.google.com/file/d/1_c5VHsD0ojWLrvEniRDuE5DE8372qLPL/view?usp=drive_link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-center relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative">Download CV</span>
              </a>
              
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    window.scrollTo({
                      top: contactSection.offsetTop - 80,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 hover:-translate-y-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-center relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative">Contact Me</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 md:mt-16 animate-bounce">
          <button 
            onClick={scrollToPersonalInfo}
            className="group p-3 rounded-full border-2 border-gray-500 text-gray-400 hover:text-white hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 hover:scale-110 relative overflow-hidden"
            aria-label="Scroll down"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            <ChevronDown size={24} className="relative animate-bounce-gentle" />
          </button>
        </div>
      </div>
    </section>
  );
};