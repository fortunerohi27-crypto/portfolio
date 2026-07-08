import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <h2>About Me</h2>
        <div className="about__content">
          <p>
            I&apos;m a self-taught frontend developer in my final stretch of a B.Sc. in
            Software Engineering at <strong>Aptech, Abuja</strong> (expected 2027).
            I write clean HTML, CSS, and modern JavaScript, and I build component-based
            interfaces with React.
          </p>
          <p>
            Outside of class, I&apos;ve shipped several small projects — task trackers,
            weather lookups, and this very site — to push my skills past tutorials and into
            real working code. I care about responsive layouts, accessible defaults, and
            shipping small, working increments.
          </p>
          <p>
            I&apos;m currently looking for an <strong>internship or junior frontend role</strong>{' '}
            where I can contribute to a real product, learn from senior engineers, and
            grow toward full-stack work.
          </p>
        </div>
      </div>
    </section>
  );
}
