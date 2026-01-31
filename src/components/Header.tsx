import { useEffect, useState, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/format';
import './Header.css';

export function Header() {
  const clips = useGameStore((s) => s.manufacturing.clips);
  const { prestigeU, prestigeS } = useGameStore((s) => s.prestige);
  const [clipRate, setClipRate] = useState(0);
  const [hasProduced, setHasProduced] = useState(false);
  
  // Use refs to track clip history for rolling average
  const clipHistoryRef = useRef<number[]>([]);
  const lastClipsRef = useRef(clips);
  
  const showPrestige = prestigeU > 0 || prestigeS > 0;
  
  // Calculate clips per second using a 1-second rolling window
  useEffect(() => {
    const interval = setInterval(() => {
      const currentClips = useGameStore.getState().manufacturing.clips;
      const delta = currentClips - lastClipsRef.current;
      lastClipsRef.current = currentClips;
      
      // Track that we've produced at least once
      if (delta > 0 && !hasProduced) {
        setHasProduced(true);
      }
      
      // Keep last 10 samples (100ms each = 1 second window)
      clipHistoryRef.current.push(delta);
      if (clipHistoryRef.current.length > 10) {
        clipHistoryRef.current.shift();
      }
      
      // Calculate rate as sum of deltas * 10 (to get per second)
      const totalDelta = clipHistoryRef.current.reduce((a, b) => a + b, 0);
      const rate = totalDelta * (10 / clipHistoryRef.current.length);
      setClipRate(rate);
    }, 100);
    
    return () => clearInterval(interval);
  }, [hasProduced]);
  
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
      
      {hasProduced && (
        <p className="clip-rate">
          per second: <span className="rate">{formatNumber(Math.round(clipRate))}</span>
        </p>
      )}
    </div>
  );
}
