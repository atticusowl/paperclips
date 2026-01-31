import { useGameStore } from '../store/gameStore';
import { formatNumber } from '../utils/format';
import './Section.css';
import './Computing.css';

export function Computing() {
  const { 
    processors, memory, operations, maxOps, trust, nextTrust,
    creativity, creativityOn, qFlag, qChips
  } = useGameStore((s) => s.computing);
  
  const { humanFlag, compFlag } = useGameStore((s) => s.flags);
  const swarmGifts = useGameStore((s) => s.swarm.swarmGifts);
  
  const addProcessor = useGameStore((s) => s.addProcessor);
  const addMemory = useGameStore((s) => s.addMemory);
  const computeQuantum = useGameStore((s) => s.computeQuantum);
  
  const availablePoints = trust - (processors + memory) + swarmGifts;
  const canAdd = availablePoints > 0;
  
  if (!compFlag) return null;
  
  return (
    <div className="section computing">
      <h3>Computational Resources</h3>
      <hr />
      
      {humanFlag && (
        <div className="trust-section">
          <p>Trust: <span className="value">{trust}</span></p>
          <p className="small">+1 Trust at: {formatNumber(nextTrust)} clips</p>
        </div>
      )}
      
      {swarmGifts > 0 && (
        <p>Swarm Gifts: <span className="value">{swarmGifts}</span></p>
      )}
      
      <div className="resource-controls">
        <button onClick={addProcessor} disabled={!canAdd}>
          Processors
        </button>
        <span className="level">{processors}</span>
      </div>
      
      <div className="resource-controls">
        <button onClick={addMemory} disabled={!canAdd}>
          Memory
        </button>
        <span className="level">{memory}</span>
      </div>
      
      <p>
        Operations: <span className="value">{formatNumber(operations)}</span> / {formatNumber(maxOps)}
      </p>
      
      {creativityOn && (
        <p>Creativity: <span className="value">{Math.floor(creativity)}</span></p>
      )}
      
      {qFlag && (
        <div className="quantum-section">
          <h4>Quantum Computing</h4>
          <div className="qchips">
            {qChips.map((chip, i) => (
              <div 
                key={i} 
                className="qchip"
                style={{ 
                  opacity: chip.active ? Math.abs(chip.value) : 0.1,
                  backgroundColor: chip.active ? '#00ff88' : '#333'
                }}
              />
            ))}
          </div>
          <button 
            onClick={computeQuantum}
            disabled={!qChips.some(c => c.active)}
          >
            Compute
          </button>
        </div>
      )}
    </div>
  );
}
