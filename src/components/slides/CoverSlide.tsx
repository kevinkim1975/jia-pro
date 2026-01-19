import React from 'react';

interface CoverSlideProps {
  title: string;        // "정이안한의원"
  subtitle: string;     // "마케팅 전략 제안"
  date: string;         // "2026. 01"
  company: string;      // "호원앤컴퍼니"
}

export function CoverSlide({ title, subtitle, date, company }: CoverSlideProps) {
  return (
    <div className="w-full aspect-[16/9] bg-white flex items-center justify-center">
      {/* Main content container - NO decorative elements, pure white background */}
      <div className="w-full h-full flex flex-col justify-between p-16">
        {/* Top spacer */}
        <div />
        
        {/* Center content */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Title */}
          <h1 
            className="text-7xl font-bold tracking-tight"
            style={{ color: '#004B8D' }}
          >
            {title}
          </h1>
          
          {/* Divider line */}
          <div 
            className="w-24 h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #004B8D 0%, #48A9C5 100%)' }}
          />
          
          {/* Subtitle */}
          <h2 
            className="text-3xl font-medium tracking-wide"
            style={{ color: '#1F2937' }}
          >
            {subtitle}
          </h2>
        </div>
        
        {/* Bottom footer */}
        <div className="flex justify-between items-end">
          {/* Date - bottom left */}
          <div 
            className="text-xl font-medium"
            style={{ color: '#48A9C5' }}
          >
            {date}
          </div>
          
          {/* Company name - bottom right */}
          <div 
            className="text-xl font-semibold"
            style={{ color: '#004B8D' }}
          >
            {company}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverSlide;
