import React, { useState, useEffect } from 'react';
import { SectionTitle } from './common/SectionTitle';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Code, 
  Award, 
  Calendar,
  ExternalLink,
  Star,
  Zap,
  Brain,
  Timer,
  CheckCircle
} from 'lucide-react';

interface PlatformStats {
  name: string;
  username: string;
  profileUrl: string;
  logo: string;
  color: string;
  stats: {
    solved: number;
    rating?: number;
    rank?: string;
    contests?: number;
    streak?: number;
    badges?: number;
  };
  achievements: string[];
}

export const ProblemSolving: React.FC = () => {
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);

  // Mock data - In a real implementation, you'd fetch this from APIs
  const platformData: PlatformStats[] = [
    {
      name: 'HackerRank',
      username: 'rakib100rlms',
      profileUrl: 'https://www.hackerrank.com/profile/rakib100rlms',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hackerrank/hackerrank-original.svg',
      color: '#00EA64',
      stats: {
        solved: 150,
        rating: 1847,
        rank: 'Gold Badge',
        contests: 25,
        streak: 45,
        badges: 12
      },
      achievements: ['SQL Basic Certificate', 'Problem Solving Badge', 'Gold Badge Holder']
    },
    {
      name: 'LeetCode',
      username: 'rakib100always',
      profileUrl: 'https://leetcode.com/rakib100always',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg',
      color: '#FFA116',
      stats: {
        solved: 280,
        rating: 1650,
        rank: 'Knight',
        contests: 18,
        streak: 30
      },
      achievements: ['Daily Challenge Streak', 'Contest Participant', 'Algorithm Expert']
    },
    {
      name: 'CodeChef',
      username: 'rakib_100',
      profileUrl: 'https://www.codechef.com/users/rakib_100',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codechef/codechef-original.svg',
      color: '#5B4638',
      stats: {
        solved: 95,
        rating: 1534,
        rank: '3 Star',
        contests: 12
      },
      achievements: ['3 Star Coder', 'Long Challenge Participant']
    },
    {
      name: 'Codeforces',
      username: 'rakib100',
      profileUrl: 'https://codeforces.com/profile/rakib100',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeforces/codeforces-original.svg',
      color: '#1F8ACB',
      stats: {
        solved: 120,
        rating: 1200,
        rank: 'Pupil',
        contests: 8
      },
      achievements: ['Contest Participant', 'Problem Solver']
    }
  ];

  const overallStats = {
    totalSolved: platformData.reduce((sum, platform) => sum + platform.stats.solved, 0),
    totalContests: platformData.reduce((sum, platform) => sum + (platform.stats.contests || 0), 0),
    averageRating: Math.round(
      platformData.reduce((sum, platform) => sum + (platform.stats.rating || 0), 0) / 
      platformData.filter(p => p.stats.rating).length
    ),
    yearsActive: 3,
    languagesUsed: ['C++', 'Java', 'Python', 'JavaScript'],
    favoriteTopics: ['Dynamic Programming', 'Graph Algorithms', 'Data Structures', 'Greedy Algorithms']
  };

  // Animation effect for counters
  useEffect(() => {
    if (!isVisible) return;

    const animateValue = (key: string, start: number, end: number, duration: number) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        
        setAnimatedStats(prev => ({ ...prev, [key]: current }));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    };

    // Animate main stats
    animateValue('totalSolved', 0, overallStats.totalSolved, 2000);
    animateValue('totalContests', 0, overallStats.totalContests, 1800);
    animateValue('averageRating', 0, overallStats.averageRating, 2200);
    
    // Animate platform stats
    platformData.forEach((platform, index) => {
      setTimeout(() => {
        animateValue(`${platform.name}_solved`, 0, platform.stats.solved, 1500);
        if (platform.stats.rating) {
          animateValue(`${platform.name}_rating`, 0, platform.stats.rating, 1800);
        }
      }, index * 200);
    });
  }, [isVisible]);

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('problem-solving');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="problem-solving" className="py-16 md:py-20 px-4 md:px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <SectionTitle>Problem-Solving Experience</SectionTitle>
        
        {/* Hero Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {[
            { 
              label: 'Problems Solved', 
              value: animatedStats.totalSolved || 0, 
              icon: CheckCircle, 
              color: 'from-green-400 to-emerald-500',
              suffix: '+'
            },
            { 
              label: 'Contests Participated', 
              value: animatedStats.totalContests || 0, 
              icon: Trophy, 
              color: 'from-yellow-400 to-orange-500',
              suffix: '+'
            },
            { 
              label: 'Average Rating', 
              value: animatedStats.averageRating || 0, 
              icon: Star, 
              color: 'from-blue-400 to-cyan-500',
              suffix: ''
            },
            { 
              label: 'Years Active', 
              value: overallStats.yearsActive, 
              icon: Calendar, 
              color: 'from-purple-400 to-pink-500',
              suffix: '+'
            }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.label}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: 0,
                  animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-10 group-hover:animate-pulse-slow`}></div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={20} className="text-white md:w-6 md:h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {platformData.map((platform, index) => (
            <div 
              key={platform.name}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-3 border border-slate-700/50"
              style={{
                animationDelay: `${index * 200}ms`,
                opacity: 0,
                animation: isVisible ? 'slideInUp 0.7s ease-out forwards' : 'none'
              }}
            >
              {/* Animated gradient background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(135deg, ${platform.color}10, transparent)`
                }}
              ></div>

              {/* Header with logo and platform name */}
              <div className="relative p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <img 
                          src={platform.logo} 
                          alt={platform.name} 
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{ filter: `drop-shadow(0 0 8px ${platform.color}50)` }}
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-gray-400 text-sm">@{platform.username}</p>
                    </div>
                  </div>
                  <a 
                    href={platform.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-700/50 text-gray-400 hover:text-white hover:bg-slate-600/50 transition-all duration-300 hover:scale-110"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="relative p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                    <div className="text-xl md:text-2xl font-bold text-white mb-1">
                      {animatedStats[`${platform.name}_solved`] || 0}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm">Problems Solved</div>
                  </div>
                  
                  {platform.stats.rating && (
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div 
                        className="text-xl md:text-2xl font-bold mb-1"
                        style={{ color: platform.color }}
                      >
                        {animatedStats[`${platform.name}_rating`] || 0}
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm">Rating</div>
                    </div>
                  )}
                  
                  {platform.stats.rank && (
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="text-sm md:text-base font-bold text-yellow-400 mb-1">
                        {platform.stats.rank}
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm">Current Rank</div>
                    </div>
                  )}
                  
                  {platform.stats.contests && (
                    <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600/50">
                      <div className="text-xl md:text-2xl font-bold text-cyan-400 mb-1">
                        {platform.stats.contests}
                      </div>
                      <div className="text-gray-400 text-xs md:text-sm">Contests</div>
                    </div>
                  )}
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Award size={14} />
                    Key Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {platform.achievements.map((achievement, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-slate-700/50 text-gray-300 rounded-md border border-slate-600/50 hover:border-slate-500/50 transition-colors duration-300"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div 
                className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-full opacity-10"
                style={{ backgroundColor: platform.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Skills & Topics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Programming Languages */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <Code size={20} className="text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Languages Used</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {overallStats.languagesUsed.map((language, index) => (
                <div 
                  key={language}
                  className="group flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-green-400/50 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap size={16} className="text-green-400" />
                  </div>
                  <span className="text-white font-medium">{language}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Topics */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Favorite Topics</h3>
            </div>
            
            <div className="space-y-3">
              {overallStats.favoriteTopics.map((topic, index) => (
                <div 
                  key={topic}
                  className="group flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-purple-400/50 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: 0,
                    animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                  }}
                >
                  <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target size={16} className="text-purple-400" />
                  </div>
                  <span className="text-white font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">Competitive Programming Journey</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"></div>
            
            <div className="space-y-8">
              {[
                {
                  year: '2022',
                  title: 'Started Competitive Programming',
                  description: 'Began journey with basic problem solving on HackerRank',
                  icon: Timer,
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  year: '2023',
                  title: 'Expanded to Multiple Platforms',
                  description: 'Joined LeetCode, CodeChef, and Codeforces. Participated in first contests',
                  icon: Trophy,
                  color: 'from-purple-400 to-pink-500'
                },
                {
                  year: '2024',
                  title: 'Achieved Significant Milestones',
                  description: 'Reached 500+ problems solved across platforms. Earned multiple badges and certificates',
                  icon: Award,
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  year: '2025',
                  title: 'Continuous Growth',
                  description: 'Focusing on advanced algorithms and participating in regular contests',
                  icon: TrendingUp,
                  color: 'from-green-400 to-emerald-500'
                }
              ].map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div 
                    key={milestone.year}
                    className="relative flex items-start gap-4 md:gap-6"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      opacity: 0,
                      animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                    }}
                  >
                    <div className={`relative z-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent size={16} className="text-white md:w-5 md:h-5" />
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg md:text-xl font-bold text-yellow-400">{milestone.year}</span>
                        <h4 className="text-lg md:text-xl font-bold text-white">{milestone.title}</h4>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};