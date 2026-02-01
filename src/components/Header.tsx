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
          &nbsp;Universe: {prestigeU} / Sim Level: {prestigeS}
        </div>
      )}
      
      <h2 className="clip-counter">
        Paperclips: <span className="count">{formatNumber(clips)}</span>
      </h2>
    </div>
  );
}
