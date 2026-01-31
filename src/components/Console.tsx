import { useGameStore } from '../store/gameStore';
import './Console.css';

export function Console() {
  const messages = useGameStore((s) => s.messages);
  
  return (
    <div className="console-container">
      <div className="console-old">
        {messages.slice(1, 5).reverse().map((msg) => (
          <p key={msg.id} className="console-line old">
            <span className="prompt">&nbsp;.&nbsp;</span>
            <span>{msg.text}</span>
          </p>
        ))}
      </div>
      <p className="console-line current">
        <span className="prompt">&nbsp;&gt;&nbsp;</span>
        <span>{messages[0]?.text || ''}</span>
        <span className="cursor pulsate">|</span>
      </p>
    </div>
  );
}
