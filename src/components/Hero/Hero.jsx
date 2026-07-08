import useTypewriter from '../../hooks/useTypewriter.js';
import './Hero.css';

const ROLES = ['Frontend Developer', 'React Developer', 'Software Engineer'];

export default function Hero() {
  const { text } = useTypewriter(ROLES, { typeSpeed: 90, deleteSpeed: 45, pauseMs: 1300 });

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <p className="hero__eyebrow">Hi, my name is</p>
        <h1 className="hero__name">Daniel Fortune Ofu-Owoicho.</h1>
        <h2 className="hero__role">
          <span>I build things for the web.</span>
          <span className="hero__typewriter" aria-live="polite">
            {text}
            <span className="caret" aria-hidden="true" />
          </span>
        </h2>
        <p className="hero__tagline">
          I&apos;m a frontend developer based in Abuja, Nigeria, focused on building
          responsive, accessible web interfaces with React, JavaScript, HTML, and CSS.
          Currently finishing my B.Sc. in Software Engineering at Aptech and looking
          for an internship where I can learn from senior engineers and ship real product work.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="/Daniel_Fortune_Ofu-Owoicho_CV.docx" download>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
              />
            </svg>
            Download CV
          </a>
          <a className="btn btn--ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
