import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Основной градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-pink-900/20 animate-gradient-shift"></div>
      
      {/* Движущиеся сферы */}
      <div className="absolute inset-0">
        {/* Большая сфера 1 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Большая сфера 2 */}
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow-reverse"></div>
        
        {/* Средние сферы */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/15 to-purple-500/15 rounded-full blur-2xl animate-pulse-slow"></div>
        
        <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-float-medium"></div>
        
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-yellow-500/8 to-orange-500/8 rounded-full blur-2xl animate-float-medium-reverse"></div>
      </div>
      
      {/* Геометрические фигуры */}
      <div className="absolute inset-0">
        {/* Вращающиеся кольца */}
        <div className="absolute top-1/3 left-1/6 w-32 h-32 border border-purple-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-2/3 right-1/6 w-24 h-24 border border-pink-500/20 rounded-full animate-spin-slow-reverse"></div>
        
        {/* Плавающие треугольники */}
        <div className="absolute top-1/4 right-1/3 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-purple-500/20 animate-float-triangle"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-pink-500/20 animate-float-triangle-reverse"></div>
        
        {/* Квадраты */}
        <div className="absolute top-1/2 right-1/5 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rotate-45 animate-float-square"></div>
        <div className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rotate-45 animate-float-square-reverse"></div>
      </div>
      
      {/* Анимированные частицы */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/30 rounded-full animate-particle-${i % 3}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* Световые блики */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-2 h-2 bg-pink-400 rounded-full animate-twinkle shadow-lg shadow-pink-400/50"></div>
        <div className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle-delay shadow-lg shadow-purple-400/50"></div>
        <div className="absolute bottom-1/4 left-1/4 w-2.5 h-2.5 bg-blue-400 rounded-full animate-twinkle-slow shadow-lg shadow-blue-400/50"></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle-fast shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-twinkle-delay shadow-lg shadow-yellow-400/50"></div>
      </div>
      
      {/* Волновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent skew-y-12 animate-wave"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent -skew-y-12 animate-wave-reverse"></div>
      </div>
    </div>
  );
};
