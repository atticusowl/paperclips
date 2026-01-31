import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/format';
import './Section.css';
import './Strategy.css';

const STRATEGIES = [
  { value: 10, label: 'Pick a Strat' },
  { value: 0, label: 'RANDOM' },
  { value: 1, label: 'A100' },
  { value: 2, label: 'B100' },
  { value: 3, label: 'GREEDY' },
  { value: 4, label: 'GENEROUS' },
  { value: 5, label: 'MINIMAX' },
  { value: 6, label: 'TIT FOR TAT' },
  { value: 7, label: 'BEAT LAST' },
];

export function Strategy() {
  const { strategyEngineFlag } = useGameStore((s) => s.flags);
  const { yomi, tourneyCost, autoTourneyFlag, autoTourneyStatus } = useGameStore((s) => s.strategic);
  const operations = useGameStore((s) => s.computing.operations);
  
  const runTourney = useGameStore((s) => s.runTourney);
  const newTourney = useGameStore((s) => s.newTourney);
  const toggleAutoTourney = useGameStore((s) => s.toggleAutoTourney);
  
  const [selectedStrat, setSelectedStrat] = useState(10);
  const [tourneyResults, setTourneyResults] = useState<string[]>([]);
  
  if (!strategyEngineFlag) return null;
  
  const handleRun = () => {
    runTourney();
    // Generate some mock results
    const results = [
      `Round 1: +${Math.floor(Math.random() * 10)} yomi`,
      `Round 2: +${Math.floor(Math.random() * 10)} yomi`,
      `Round 3: +${Math.floor(Math.random() * 15)} yomi`,
    ];
    setTourneyResults(results);
  };
  
  return (
    <div className="section strategy">
      <h3>Strategic Modeling</h3>
      <hr />
      
      <div className="strategy-controls">
        <select 
          value={selectedStrat} 
          onChange={(e) => setSelectedStrat(Number(e.target.value))}
        >
          {STRATEGIES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        
        <button onClick={handleRun} disabled={operations < tourneyCost / 10}>
          Run
        </button>
      </div>
      
      <div className="tourney-display">
        {tourneyResults.length > 0 ? (
          tourneyResults.map((r, i) => <p key={i}>{r}</p>)
        ) : (
          <p>Pick strategy, run tournament, gain yomi</p>
        )}
      </div>
      
      <p className="yomi-display">
        Yomi: <span className="value">{formatNumber(yomi)}</span>
      </p>
      
      <div className="tourney-management">
        <button 
          onClick={newTourney}
          disabled={operations < tourneyCost}
        >
          New Tournament
        </button>
        
        {autoTourneyFlag && (
          <div className="auto-tourney">
            <button onClick={toggleAutoTourney}>AutoTourney</button>
            <span className="status">{autoTourneyStatus ? 'ON' : 'OFF'}</span>
          </div>
        )}
        
        <p className="cost">Cost: {formatNumber(tourneyCost)} ops</p>
      </div>
    </div>
  );
}
