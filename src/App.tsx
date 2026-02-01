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
import { Cheats } from './components/Cheats';
import { useGameStore } from './store/gameStore';
import './App.css';

function App() {
  useGameLoop();
  
  const { humanFlag, compFlag, projectsFlag, strategyEngineFlag, investmentEngineFlag } = useGameStore((s) => s.flags);
  const reset = useGameStore((s) => s.reset);
  
  // Show middle column only when computing or projects are visible
  const showMiddle = compFlag || projectsFlag;
  // Show right column only when strategy or investment are visible
  const showRight = strategyEngineFlag || investmentEngineFlag;
  
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
          
          {/* Middle Column - only show when unlocked */}
          {showMiddle && (
            <div className="column middle">
              {compFlag && <Computing />}
              
              <Projects />
            </div>
          )}
          
          {/* Right Column - only show when unlocked */}
          {showRight && (
            <div className="column right">
              {strategyEngineFlag && <Strategy />}
              
              {investmentEngineFlag && <Investment />}
            </div>
          )}
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
      
      {/* Cheat Panel */}
      <Cheats />
    </div>
  );
}

export default App;
