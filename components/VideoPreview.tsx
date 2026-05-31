"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoPreview({ videoSrc }: { videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="aspect-video bg-gradient-to-br from-card-bg via-card-bg to-background border border-white/20 mb-4 flex items-center justify-center overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute inset-0 bg-grid-pattern transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-10'}`}></div>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-[100%]' : 'translate-x-[-100%]'}`}></div>

      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {!isHovered && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-card-bg/50"></div>
      )}
    </div>
  );
}
