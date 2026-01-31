import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import './Cheats.css';

export function Cheats() {
  const [isOpen, setIsOpen] = useState(false);
  
  const cheatFunds = useGameStore((s) => s.cheatFunds);
  const cheatOps = useGameStore((s) => s.cheatOps);
  const cheatCreativity = useGameStore((s) => s.cheatCreativity);
  const cheatTrust = useGameStore((s) => s.cheatTrust);
  const cheatYomi = useGameStore((s) => s.cheatYomi);
  const cheatWire = useGameStore((s) => s.cheatWire);
  const setFlag = useGameStore((s) => s.setFlag);
  const reset = useGameStore((s) => s.reset);
  
  if (!isOpen) {
    return (
      <button 
        className="cheats-toggle"
        onClick={() => setIsOpen(true)}
        title="Open Cheats"
      >
        🎮
      </button>
    );
  }
  
  return (
    <div className="cheats-panel">
      <div className="cheats-header">
        <h3>🎮 Cheats</h3>
        <button onClick={() => setIsOpen(false)}>✕</button>
      </div>
      
      <div className="cheats-grid">
        <div className="cheat-section">
          <h4>Resources</h4>
          <button onClick={() => cheatFunds(10000)}>+$10,000</button>
          <button onClick={() => cheatFunds(1000000)}>+$1M</button>
          <button onClick={() => cheatWire(10000)}>+10k Wire</button>
          <button onClick={() => cheatWire(100000)}>+100k Wire</button>
        </div>
        
        <div className="cheat-section">
          <h4>Computing</h4>
          <button onClick={() => cheatOps(1000)}>+1k Ops</button>
          <button onClick={() => cheatOps(10000)}>Max Ops</button>
          <button onClick={() => cheatCreativity(100)}>+100 Creativity</button>
          <button onClick={() => cheatCreativity(1000)}>+1k Creativity</button>
          <button onClick={() => cheatTrust(1)}>+1 Trust</button>
          <button onClick={() => cheatTrust(10)}>+10 Trust</button>
        </div>
        
        <div className="cheat-section">
          <h4>Strategy</h4>
          <button onClick={() => cheatYomi(1000)}>+1k Yomi</button>
          <button onClick={() => cheatYomi(10000)}>+10k Yomi</button>
        </div>
        
        <div className="cheat-section">
          <h4>Unlock Sections</h4>
          <button onClick={() => setFlag('compFlag', true)}>Unlock Computing</button>
          <button onClick={() => setFlag('projectsFlag', true)}>Unlock Projects</button>
          <button onClick={() => setFlag('autoClipperFlag', true)}>Unlock AutoClippers</button>
          <button onClick={() => setFlag('megaClipperFlag', true)}>Unlock MegaClippers</button>
          <button onClick={() => setFlag('investmentEngineFlag', true)}>Unlock Investments</button>
          <button onClick={() => setFlag('strategyEngineFlag', true)}>Unlock Strategy</button>
        </div>
        
        <div className="cheat-section danger">
          <h4>Danger Zone</h4>
          <button className="danger-btn" onClick={() => {
            if (confirm('Reset all progress?')) {
              reset();
            }
          }}>🗑️ Reset Game</button>
        </div>
      </div>
    </div>
  );
}
