import projects from '../../data/projects.js';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container projects__inner">
        <h2>Projects</h2>
        <p className="projects__intro">
          A few things I&apos;ve built while learning. Each one taught me something I
          couldn&apos;t have picked up from tutorials alone.
        </p>
        <div className="projects__grid">
          {projects.map((p) => (
            <article key={p.id} className="project-card">
              <header className="project-card__head">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 17l9 4 9-4"
                  />
                </svg>
                <h3 className="project-card__title">{p.title}</h3>
              </header>
              <p className="project-card__desc">{p.description}</p>
              <ul className="project-card__stack" aria-label="Tech stack">
                {p.tech.map((t) => (
                  <li key={t} className="project-card__chip">{t}</li>
                ))}
              </ul>
              <footer className="project-card__links">
                <a
                  className="project-card__link"
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${p.title} on GitHub`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
                    />
                  </svg>
                  GitHub
                </a>
                {p.demo && p.demo !== '#' && (
                  <a
                    className="project-card__link"
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${p.title}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 3h7v7m0-7L10 14M5 5v14h14"
                      />
                    </svg>
                    Live
                  </a>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
