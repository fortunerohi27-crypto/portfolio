import skills from '../../data/skills.js';
import useInView from '../../hooks/useInView.js';
import './Skills.css';

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="skills" className="skills">
      <div className="container skills__inner">
        <h2>Skills</h2>
        <p className="skills__intro">
          A snapshot of what I work with day to day. Levels are honest estimates — I&apos;d
          rather be truthful here than oversell.
        </p>
        <ul
          ref={ref}
          className="skills__list"
          // Set data-animated on the parent; CSS targets descendants via attribute.
          data-animated={inView ? 'true' : 'false'}
        >
          {skills.map((s) => (
            <li key={s.name} className="skill-bar" style={{ '--fill': `${s.level}%` }}>
              <div className="skill-bar__head">
                <span className="skill-bar__name">{s.name}</span>
                <span className="skill-bar__level">{s.level}%</span>
              </div>
              <div className="skill-bar__track" aria-hidden="true">
                <div className="skill-bar__fill" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
