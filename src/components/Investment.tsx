import { useGameStore } from '../store/gameStore';
import { formatMoney, formatNumber } from '../utils/format';
import './Section.css';
import './Investment.css';

export function Investment() {
  const { investmentEngineFlag, investmentLevel, bankroll, secValue, stocks } = 
    useGameStore((s) => s.investment);
  const funds = useGameStore((s) => s.business.funds);
  const yomi = useGameStore((s) => s.strategic.yomi);
  
  const investDeposit = useGameStore((s) => s.investDeposit);
  const investWithdraw = useGameStore((s) => s.investWithdraw);
  const upgradeInvestment = useGameStore((s) => s.upgradeInvestment);
  
  if (!investmentEngineFlag) return null;
  
  const upgradeCost = Math.pow(2, investmentLevel) * 100;
  const canUpgrade = yomi >= upgradeCost;
  
  return (
    <div className="section investment">
      <h3>Investments</h3>
      <hr />
      
      <div className="invest-controls">
        <select defaultValue="low">
          <option value="low">Low Risk</option>
          <option value="med">Med Risk</option>
          <option value="hi">High Risk</option>
        </select>
      </div>
      
      <div className="invest-buttons">
        <button onClick={investDeposit} disabled={funds <= 0}>
          Deposit
        </button>
        <button onClick={investWithdraw} disabled={bankroll + secValue <= 0}>
          Withdraw
        </button>
      </div>
      
      <div className="portfolio-summary">
        <p>Cash: $<span className="value">{formatMoney(bankroll)}</span></p>
        <p>Stocks: $<span className="value">{formatMoney(secValue)}</span></p>
        <p><strong>Total: $<span className="value">{formatMoney(bankroll + secValue)}</span></strong></p>
      </div>
      
      {stocks.length > 0 && (
        <table className="stocks-table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Amt.</th>
              <th>Price</th>
              <th>Total</th>
              <th>P/L</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, i) => (
              <tr key={i}>
                <td>{stock.sym}</td>
                <td>{stock.amt}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td>${(stock.amt * stock.price).toFixed(2)}</td>
                <td className={stock.price > stock.avgPrice ? 'profit' : 'loss'}>
                  {((stock.price - stock.avgPrice) * stock.amt).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="upgrade-section">
        <button onClick={upgradeInvestment} disabled={!canUpgrade}>
          Upgrade Investment Engine
        </button>
        <span className="level">Level: {investmentLevel}</span>
        <p className="cost">Cost: {formatNumber(upgradeCost)} Yomi</p>
      </div>
    </div>
  );
}
