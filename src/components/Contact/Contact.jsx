import { useState } from 'react';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;

const initial = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please tell me your name.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email looks off — please double-check.';
  if (!values.message.trim()) errors.message = 'A short message is required.';
  else if (values.message.trim().length < MIN_MESSAGE) errors.message = `Message should be at least ${MIN_MESSAGE} characters.`;
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // No backend — just confirm locally. To wire up real email,
      // swap this for a fetch to a serverless function or Formspree endpoint.
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <h2>Get in Touch</h2>
        <p className="contact__intro">
          I&apos;m currently open to <strong>internship and junior frontend roles</strong>.
          Send me a note and I&apos;ll get back to you as soon as I can.
        </p>

        {submitted ? (
          <div className="contact__success" role="status">
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
            <div>
              <p className="contact__success-title">Thanks! I&apos;ll get back to you soon.</p>
              <p className="contact__success-body">
                Your message reached the form. I&apos;ll reply from{' '}
                <a href="mailto:fortunerohi27@gmail.com">fortunerohi27@gmail.com</a>.
              </p>
            </div>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                autoComplete="name"
                required
              />
              {errors.name && (
                <p id="contact-name-error" className="form-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                autoComplete="email"
                required
              />
              {errors.email && (
                <p id="contact-email-error" className="form-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                required
              />
              {errors.message && (
                <p id="contact-message-error" className="form-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn--primary contact__submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
