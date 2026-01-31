import { useGameStore } from '../store/gameStore';
import './MakeClipButton.css';

export function MakeClipButton() {
  const wire = useGameStore((s) => s.manufacturing.wire);
  const makeClip = useGameStore((s) => s.makeClip);
  const humanFlag = useGameStore((s) => s.flags.humanFlag);
  
  // Only show in human phase
  if (!humanFlag) return null;
  
  return (
    <button 
      className="make-clip-button"
      onClick={() => makeClip(1)}
      disabled={wire < 1}
    >
      Make Paperclip
    </button>
  );
}
