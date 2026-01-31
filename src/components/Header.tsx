import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/format';
import './Header.css';

export function Header() {
  const clips = useGameStore((s) => s.manufacturing.clips);
  const { prestigeU, prestigeS } = useGameStore((s) => s.prestige);
  
  const showPrestige = prestigeU > 0 || prestigeS > 0;
  
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
    </div>
  );
}
