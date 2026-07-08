import skills from '../../data/skills.js';
import useInView from '../../hooks/useInView.js';
import './SkillsChart.css';

/**
 * SkillsChart — pure-SVG radar chart. Six axes (one per skill) on a 240×240 canvas.
 * Grid rings at 25/50/75/100. Skill polygon scales via viewBox; animates on first view.
 */
export default function SkillsChart() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 120;
  const levels = 4; // 25/50/75/100 grid rings
  const n = skills.length;
  // Angle for each axis, starting at the top (-π/2) and going clockwise.
  const axisAngle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const point = (i, valuePct) => {
    const a = axisAngle(i);
    const r = (radius * valuePct) / 100;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  const polygon = skills.map((s, i) => point(i, s.level).join(',')).join(' ');
  const gridRings = Array.from({ length: levels }, (_, k) => ((k + 1) * radius) / levels);

  return (
    <section id="skills-chart" className="skills-chart">
      <div className="container skills-chart__inner">
        <h2>Skills at a Glance</h2>
        <p className="skills-chart__intro">
          The same data, plotted as a radar. Each axis runs 0 to 100.
        </p>
        <div ref={ref} className="skills-chart__canvas" data-animated={inView ? 'true' : 'false'}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            role="img"
            aria-label="Radar chart of my skills"
            className="skills-chart__svg"
          >
            {/* Grid rings */}
            {gridRings.map((r) => (
              <circle
                key={r}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />
            ))}
            {/* Axes */}
            {skills.map((s, i) => {
              const [x, y] = point(i, 100);
              return (
                <line
                  key={s.name}
                  x1={cx} y1={cy} x2={x} y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              );
            })}
            {/* Data polygon */}
            <polygon
              points={polygon}
              fill="var(--accent)"
              fillOpacity="0.25"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Data points + labels */}
            {skills.map((s, i) => {
              const [px, py] = point(i, s.level);
              const [lx, ly] = point(i, 115);
              return (
                <g key={s.name}>
                  <circle cx={px} cy={py} r="4" fill="var(--accent)" />
                  <text
                    x={lx} y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--text)"
                    fontSize="12"
                    fontFamily="var(--font-sans)"
                    fontWeight="600"
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
