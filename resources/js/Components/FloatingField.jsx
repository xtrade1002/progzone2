import React from 'react';

export default function FloatingField({ id, label, value, error, children }) {
  const filled = String(value ?? '').length > 0;

  return (
    <div className="quote-field-wrapper">
      <fieldset className={`quote-field ${filled ? 'quote-field--filled' : ''} ${error ? 'quote-field--error' : ''}`}>
        <legend aria-hidden={!filled}>
          <label htmlFor={id} title={label}>{label}</label>
        </legend>
        {children}
      </fieldset>
      {error && <p id={`${id}-error`} className="quote-field-error" role="alert">{error}</p>}
    </div>
  );
}
