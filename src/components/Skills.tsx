import React from 'react';
import { SectionTitle } from './common/SectionTitle';
import { skillsData } from '../data/skills';
import { Sparkles, Zap } from 'lucide-react';

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = React.useState<number | null>(null);

  return (
    <section id="skills" className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <SectionTitle>My Skills</SectionTitle>
        
        {/* Skills intro with animated text */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="text-yellow-400 animate-pulse" size={20} />
              Crafting digital experiences with cutting-edge technologies
              <Zap className="text-cyan-400 animate-pulse" size={20} />
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-12">
          {skillsData.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div 
                key={skill.name}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden border border-slate-700/50 hover:border-slate-600/50 cursor-pointer perspective-1000"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Multiple background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-glow transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400/60 rounded-full animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-float-delayed opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Skill level indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-t-xl"></div>
                
                <div className="relative z-10">
                  <div 
                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-700/70 mb-3 md:mb-4 mx-auto transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg relative overflow-hidden" 
                    style={{ color: skill.color }}
                  >
                    {/* Icon glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse-glow"
                      style={{ backgroundColor: skill.color }}
                    ></div>
                    <IconComponent size={24} className="md:w-7 md:h-7" />
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-center mb-2 leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-gray-400 text-center text-xs md:text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {skill.technologies}
                  </p>
                  
                  {/* Skill mastery bar */}
                  <div className="mt-3 w-full bg-slate-700/50 rounded-full h-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left"
                      style={{ 
                        transitionDelay: `${index * 50}ms`,
                        width: hoveredSkill === index ? '85%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Corner decoration */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>
            );
          })}
        </div>
        
        {/* Skills summary with animated counters */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Technologies', count: '15+', icon: '🚀' },
              { label: 'Years Experience', count: '3+', icon: '⏱️' },
              { label: 'Projects Built', count: '50+', icon: '💼' },
              { label: 'Skills Mastered', count: '9', icon: '🎯' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="group p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}
              >
                <div className="text-2xl mb-2 animate-bounce-gentle">{stat.icon}</div>
                <div className="text-2xl font-bold text-yellow-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.count}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};