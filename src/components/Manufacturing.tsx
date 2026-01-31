import { useGameStore } from '../store/gameStore';
import { formatNumber, formatMoney } from '../utils/format';
import './Section.css';

export function Manufacturing() {
  const { 
    wire, wireCost, clipmakerLevel, clipperCost, clipperBoost,
    megaClipperLevel, megaClipperCost, megaClipperBoost, wireBuyerFlag, wireBuyerStatus
  } = useGameStore((s) => s.manufacturing);
  
  const funds = useGameStore((s) => s.business.funds);
  const { megaClipperFlag } = useGameStore((s) => s.flags);
  
  const buyWire = useGameStore((s) => s.buyWire);
  const makeClipper = useGameStore((s) => s.makeClipper);
  const makeMegaClipper = useGameStore((s) => s.makeMegaClipper);
  const toggleWireBuyer = useGameStore((s) => s.toggleWireBuyer);
  
  // Calculate clips per second
  const clipperRate = clipperBoost * clipmakerLevel;
  const megaRate = megaClipperBoost * megaClipperLevel * 500;
  const totalRate = clipperRate + megaRate;
  
  return (
    <div className="section">
      <h3>Manufacturing</h3>
      <hr />
      
      <p>Clips per Second: <span className="value">{formatNumber(totalRate)}</span></p>
      
      {wireBuyerFlag && (
        <div className="wire-buyer">
          <button onClick={toggleWireBuyer}>WireBuyer</button>
          <span className="status">{wireBuyerStatus ? 'ON' : 'OFF'}</span>
        </div>
      )}
      
      <div className="wire-section">
        <button 
          onClick={buyWire}
          disabled={funds < wireCost}
        >
          Wire
        </button>
        <span className="value">{formatNumber(wire)} inches</span>
        <p className="cost">Cost: ${formatMoney(wireCost)}</p>
      </div>
      
      <div className="clipper-section">
        <button 
          onClick={makeClipper}
          disabled={funds < clipperCost}
        >
          AutoClippers
        </button>
        <span className="level">{clipmakerLevel}</span>
        <p className="cost">Cost: ${formatMoney(clipperCost)}</p>
      </div>
      
      {megaClipperFlag && (
        <div className="mega-clipper-section">
          <button 
            onClick={makeMegaClipper}
            disabled={funds < megaClipperCost}
          >
            MegaClippers
          </button>
          <span className="level">{megaClipperLevel}</span>
          <p className="cost">Cost: ${formatMoney(megaClipperCost)}</p>
        </div>
      )}
    </div>
  );
}
