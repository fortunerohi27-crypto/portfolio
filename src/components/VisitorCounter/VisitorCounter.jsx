import useVisitorCount from '../../hooks/useVisitorCount.js';
import './VisitorCounter.css';

export default function VisitorCounter() {
  const count = useVisitorCount();
  return (
    <p className="visitor-counter" aria-label="Visitor counter">
      <span className="visitor-counter__dot" aria-hidden="true" />
      <span>Visitors: <span className="visitor-counter__count">{count.toLocaleString()}</span></span>
    </p>
  );
}
