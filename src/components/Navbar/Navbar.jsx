import { useState } from 'react';
import useTheme from '../../hooks/useTheme.js';
import './Navbar.css';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  // { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" onClick={handleLinkClick}>
          <span className="nav__brand-mark">DF</span>
          <span className="nav__brand-text">Daniel Fortune</span>
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`nav__toggle-bar ${open ? 'is-open' : ''}`} />
          <span className={`nav__toggle-bar ${open ? 'is-open' : ''}`} />
          <span className={`nav__toggle-bar ${open ? 'is-open' : ''}`} />
        </button>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav__link" onClick={handleLinkClick}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66l1.42-1.42M4.92 19.08l1.42-1.42m0-11.32L4.92 4.92m14.16 14.16l-1.42-1.42M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
