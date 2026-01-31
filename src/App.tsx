import { useGameLoop } from './hooks/useGameLoop';
import { Console } from './components/Console';
import { Header } from './components/Header';
import { MakeClipButton } from './components/MakeClipButton';
import { Manufacturing } from './components/Manufacturing';
import { Business } from './components/Business';
import { Computing } from './components/Computing';
import { Projects } from './components/Projects';
import { Strategy } from './components/Strategy';
import { Investment } from './components/Investment';
import { useGameStore } from './store/gameStore';
import './App.css';

function App() {
  useGameLoop();
  
  const { humanFlag, compFlag, strategyEngineFlag, investmentEngineFlag } = useGameStore((s) => s.flags);
  const reset = useGameStore((s) => s.reset);
  
  return (
    <div className="app">
      <div className="game-container">
        <Console />
        
        <Header />
        
        <div className="game-columns">
          {/* Left Column */}
          <div className="column left">
            <MakeClipButton />
            
            {humanFlag && <Business />}
            
            <Manufacturing />
          </div>
          
          {/* Middle Column */}
          <div className="column middle">
            {compFlag && <Computing />}
            
            <Projects />
          </div>
          
          {/* Right Column */}
          <div className="column right">
            {strategyEngineFlag && <Strategy />}
            
            {investmentEngineFlag && <Investment />}
          </div>
        </div>
        
        {/* Save/Load Controls */}
        <div className="game-controls">
          <button onClick={() => {
            localStorage.removeItem('paperclips-save');
            reset();
          }}>
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
