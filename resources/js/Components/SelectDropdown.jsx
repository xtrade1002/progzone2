import React, { useEffect, useId, useRef, useState } from 'react';
import './select-dropdown.css';

const normalizeValue = (value) => String(value ?? '').trim();

// Adapted from the supplied SingleSelectDropdown and MultiSelectDropdown components.
export default function SelectDropdown({
  id, label, name, options: suppliedOptions = [], value, defaultValue = '', onChange,
  placeholder = 'Válassz…', required = false, disabled = false, error, multiple = false, allowEmpty = true,
}) {
  const options = !allowEmpty || suppliedOptions.some((option) => normalizeValue(option.value) === '')
    ? suppliedOptions
    : [{ value: '', label: placeholder }, ...suppliedOptions];
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const listboxId = `${controlId}-options`;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [placement, setPlacement] = useState({ above: false, height: 280 });
  const containerRef = useRef(null);
  const controlRef = useRef(null);
  const menuRef = useRef(null);
  const searchRef = useRef({ text: '', time: 0 });
  const currentValue = value ?? uncontrolledValue;
  const selectedValues = (Array.isArray(currentValue) ? currentValue : [currentValue]).map(normalizeValue).filter(Boolean);
  const selectedValue = multiple ? selectedValues : selectedValues[0] ?? '';
  const selectedOptions = options.filter((option) => selectedValues.includes(normalizeValue(option.value)));
  const buttonLabel = selectedOptions.map((option) => option.label).join(', ') || placeholder;
  const isSelected = (option) => option.value === '' ? selectedValues.length === 0 : selectedValues.includes(normalizeValue(option.value));

  const openDropdown = () => {
    if (disabled) return;
    setIsOpen(true);
    const selectedIndex = options.findIndex((option) => isSelected(option) && !option.disabled);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled));
  };

  const updateSelection = (nextValue) => {
    if (value === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  };

  const selectOption = (index) => {
    const option = options[index];
    if (!option || option.disabled) return;
    const optionValue = normalizeValue(option.value);
    if (!multiple) {
      updateSelection(optionValue);
      setIsOpen(false);
    } else if (!optionValue) {
      updateSelection([]);
    } else {
      updateSelection(selectedValues.includes(optionValue)
        ? selectedValues.filter((item) => item !== optionValue)
        : [...selectedValues, optionValue]);
    }
    controlRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const positionMenu = () => {
      const bounds = controlRef.current.getBoundingClientRect();
      const below = window.innerHeight - bounds.bottom - 16;
      const above = bounds.top - 16;
      const placeAbove = below < 280 && above > below;
      setPlacement({ above: placeAbove, height: Math.max(80, Math.min(320, placeAbove ? above : below)) });
    };
    positionMenu();
    const observer = new ResizeObserver(positionMenu);
    observer.observe(controlRef.current);
    document.addEventListener('pointerdown', closeOutside);
    window.addEventListener('resize', positionMenu);
    window.addEventListener('scroll', positionMenu, true);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      window.removeEventListener('resize', positionMenu);
      window.removeEventListener('scroll', positionMenu, true);
      observer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) menuRef.current?.querySelector(`[data-option-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      setIsOpen(false);
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      setIsOpen(false);
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      if (!isOpen) {
        openDropdown();
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        selectOption(activeIndex);
        return;
      }
      const direction = event.key === 'ArrowUp' || event.key === 'End' ? -1 : 1;
      const start = event.key === 'Home' ? -1 : event.key === 'End' ? options.length : activeIndex;
      for (let step = 1; step <= options.length; step++) {
        const index = (start + direction * step + options.length) % options.length;
        if (!options[index].disabled) {
          setActiveIndex(index);
          break;
        }
      }
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      searchRef.current.text = (now - searchRef.current.time < 700 ? searchRef.current.text : '') + event.key.toLocaleLowerCase();
      searchRef.current.time = now;
      const index = options.findIndex((option) => !option.disabled && option.label.toLocaleLowerCase().startsWith(searchRef.current.text));
      if (index >= 0) {
        if (!isOpen) openDropdown();
        setActiveIndex(index);
      }
    }
  };

  return (
    <div className="own-select-field-wrapper">
      <fieldset className={`own-select-field ${selectedValues.length ? 'own-select-field--filled' : ''} ${error ? 'own-select-field--error' : ''}`}>
        <legend aria-hidden={!selectedValues.length}>
          <label htmlFor={controlId} title={label ?? placeholder}>{label ?? placeholder}</label>
        </legend>
        <div ref={containerRef} className={`own-select-dropdown ${isOpen ? 'own-select-dropdown--open' : ''} ${placement.above ? 'own-select-dropdown--above' : ''} ${multiple ? 'own-select-dropdown--multiple' : ''}`}>
          <select
            className="own-select-dropdown-native"
            name={name}
            value={selectedValue}
            multiple={multiple}
            onChange={(event) => updateSelection(multiple
              ? Array.from(event.target.selectedOptions, (option) => option.value).filter(Boolean)
              : event.target.value)}
            required={required}
            disabled={disabled}
            tabIndex={-1}
            aria-hidden="true"
            onInvalid={(event) => {
              event.preventDefault();
              if (event.currentTarget.form?.querySelector(':invalid') === event.currentTarget) {
                openDropdown();
                controlRef.current?.focus();
              }
            }}
          >
            {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
          <button
            ref={controlRef}
            id={controlId}
            type="button"
            role="combobox"
            aria-label={label}
            aria-required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${controlId}-error` : undefined}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-expanded={isOpen}
            aria-activedescendant={isOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
            disabled={disabled}
            className="own-select-dropdown-trigger"
            onKeyDown={handleKeyDown}
            onBlur={(event) => {
              if (!containerRef.current?.contains(event.relatedTarget)) setIsOpen(false);
            }}
            onClick={() => isOpen ? setIsOpen(false) : openDropdown()}
          >
            <span className={selectedValues.length ? '' : 'own-select-dropdown-placeholder'}>{buttonLabel}</span>
            <svg className="own-select-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {isOpen && (
            <div
              ref={menuRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              aria-multiselectable={multiple || undefined}
              className={`own-select-dropdown-menu ${placement.above ? 'own-select-dropdown-menu--above' : ''}`}
              style={{ maxHeight: placement.height }}
            >
              {options.map((option, index) => {
                const selected = isSelected(option);
                return (
                  <button
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={Boolean(option.disabled)}
                    tabIndex={-1}
                    data-option-index={index}
                    data-active={index === activeIndex}
                    className="own-select-dropdown-option"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectOption(index)}
                  >
                    <span className="own-select-dropdown-indicator">
                      {selected && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><path d="m20 6-11 11-5-5" /></svg>}
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
          </fieldset>
      {error && <p id={`${controlId}-error`} className="own-select-field-error" role="alert">{error}</p>}
    </div>
  );
}
