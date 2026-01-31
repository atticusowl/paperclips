import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/format';
import './Header.css';

export function Header() {
  const clips = useGameStore((s) => s.manufacturing.clips);
  const { prestigeU, prestigeS } = useGameStore((s) => s.prestige);
  const [clipRate, setClipRate] = useState(0);
  const [prevClips, setPrevClips] = useState(clips);
  
  const showPrestige = prestigeU > 0 || prestigeS > 0;
  
  // Calculate clips per second
  useEffect(() => {
    const interval = setInterval(() => {
      const currentClips = useGameStore.getState().manufacturing.clips;
      const rate = (currentClips - prevClips) * 10; // Convert to per second (100ms interval)
      setClipRate(rate);
      setPrevClips(currentClips);
    }, 100);
    
    return () => clearInterval(interval);
  }, [prevClips]);
  
  return (
    <div className="header">
      {showPrestige && (
        <div className="prestige-display">
          Universe: {prestigeU} / Sim Level: {prestigeS}
        </div>
      )}
      
      <h1 className="clip-counter">
        Paperclips: <span className="count">{formatNumber(clips)}</span>
      </h1>
      
      {clipRate > 0 && (
        <p className="clip-rate">
          per second: <span className="rate">{formatNumber(clipRate)}</span>
        </p>
      )}
    </div>
  );
}
