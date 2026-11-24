import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { translateSiteText as siteT, useSiteLocale } from './i18n';


export default function SelectInput({ id: suppliedId, label, translateLabel = true, value, onChange, options = [], translateOptions = false, disabled = false, embedded = false, placeholder = 'Válassz…', className = '', portal = true, multiple = false, renderValue, renderOption, menuClassName = '', optionClassName = '', triggerProps = {}, menuMinWidth = 0, menuPlacement = 'auto', attached = false, searchable = false, inlineSearch = false, renderSearchPrefix }) {
    useSiteLocale();
    const searchInField = searchable && inlineSearch && !multiple;
    const accessibleLabel = translateLabel ? siteT(label) : label;
    const generatedId = useId();
    const id = suppliedId ?? generatedId;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const searchInput = useRef(null);
    const [above, setAbove] = useState(false);
    const [active, setActive] = useState(0);
    const root = useRef(null);
    const trigger = useRef(null);
    const menu = useRef(null);
    const [position, setPosition] = useState(null);
    const search = useRef({ text: '', time: 0 });
    // Option text may come from clients, service catalogues or user-authored forms.
    // Only explicitly marked system options are translated here.
    const optionText = option => {
        const text = option?.content ?? option?.label;
        return translateOptions || option?.translateLabel ? siteT(text) : text;
    };
    const normalize = text => String(text ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    const visibleOptions = options.map((option, index) => ({ option, index }))
        .filter(({ option }) => !searchable || normalize(optionText(option)).includes(normalize(query).trim()));
    const selectedValues = (multiple ? (Array.isArray(value) ? value : []) : [value]).map(String);
    const selected = options.findIndex(option => selectedValues.includes(String(option.value)));
    const isSelected = option => selectedValues.includes(String(option.value));
    const choose = index => {
        if (!options[index] || options[index].disabled) return;
        const chosenValue = String(options[index].value);
        const nextValue = multiple
            ? selectedValues.includes(chosenValue) ? selectedValues.filter(item => item !== chosenValue) : [...selectedValues, chosenValue]
            : chosenValue;
        onChange?.({ target: { value: nextValue } });
        if (!multiple) setOpen(false);
        trigger.current?.focus();
        if (searchInField) trigger.current?.select();
    };
    const show = () => {
        if (disabled) return;
        const bounds = trigger.current?.getBoundingClientRect();
        setAbove(menuPlacement !== 'bottom' && Boolean(bounds && window.innerHeight - bounds.bottom < 280 && bounds.top > 280));
        setActive(selected >= 0 && !options[selected].disabled ? selected : Math.max(0, options.findIndex(option => !option.disabled)));
        setQuery('');
        setOpen(true);
    };
    useEffect(() => {
        if (open && searchable && !searchInField) searchInput.current?.focus();
    }, [open, searchable]);
    useEffect(() => {
        if (!open) return undefined;
        const outside = event => {
            if (!root.current?.contains(event.target) && !menu.current?.contains(event.target)) setOpen(false);
        };
        document.addEventListener('pointerdown', outside);
        return () => document.removeEventListener('pointerdown', outside);
    }, [open]);
    useEffect(() => {
        if (!open || !portal) return undefined;
        const update = () => {
            const bounds = (embedded || attached ? trigger.current?.closest('fieldset') : null)?.getBoundingClientRect()
                ?? (searchInField ? root.current?.getBoundingClientRect() : trigger.current?.getBoundingClientRect());
            if (!bounds) return;
            const bottomSpace = window.innerHeight - bounds.bottom - 12;
            const topSpace = bounds.top - 12;
            const menuHeight = Math.min(256, (menu.current?.scrollHeight ?? 0) + 2);
            const placeAbove = menuPlacement !== 'bottom' && bottomSpace < menuHeight && topSpace > bottomSpace;
            const computed = window.getComputedStyle(root.current);
            const palette = Object.fromEntries(['background', 'color', 'border', 'hover', 'accent']
                .map(key => `--site-dropdown-${key}`).map(key => [key, computed.getPropertyValue(key).trim()]).filter(([, value]) => value));
            const width = Math.min(Math.max(bounds.width, menuMinWidth), window.innerWidth - 16);
            setPosition({ ...palette, position: 'fixed', left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)), width,
                top: placeAbove ? undefined : bounds.bottom + (attached ? -1 : 6),
                bottom: placeAbove ? window.innerHeight - bounds.top + (attached ? -1 : 6) : undefined,
                ...(attached ? { borderRadius: placeAbove ? '12px 12px 0 0' : '0 0 12px 12px', borderTopWidth: placeAbove ? undefined : 0, borderBottomWidth: placeAbove ? 0 : undefined, '--site-dropdown-border': window.getComputedStyle(trigger.current.closest('fieldset') ?? trigger.current).borderTopColor } : {}),
                maxHeight: Math.max(60, Math.min(256, placeAbove ? topSpace : bottomSpace)), zIndex: 100050 });
        };
        update();
        const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
        if (trigger.current) observer?.observe(trigger.current);
        if (menu.current) observer?.observe(menu.current);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => { observer?.disconnect(); window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); };
    }, [open, portal, embedded, menuMinWidth, menuPlacement, attached, searchInField]);
    useEffect(() => {
        if (open) menu.current?.querySelector(`[data-option-index="${active}"]`)?.scrollIntoView?.({ block: 'nearest' });
    }, [active, open]);
    useEffect(() => { if (disabled) setOpen(false); }, [disabled]);
    const moveActive = (start, direction) => {
        for (let offset = 1; offset <= options.length; offset++) {
            const index = (start + direction * offset + options.length * 2) % options.length;
            if (!options[index].disabled && visibleOptions.some(item => item.index === index)) { setActive(index); return; }
        }
    };
    const onKeyDown = event => {
        if (event.key === 'Tab') { setOpen(false); return; }
        if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus(); return; }
        const fromSearch = event.target === searchInput.current || (searchInField && event.target === trigger.current);
        if (fromSearch && [' ', 'Home', 'End'].includes(event.key)) return;
        if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
            event.preventDefault();
            if (!open) { show(); return; }
            if (event.key === 'Enter' || event.key === ' ') { if (visibleOptions.some(item => item.index === active)) choose(active); }
            else if (event.key === 'Home') moveActive(-1, 1);
            else if (event.key === 'End') moveActive(options.length, -1);
            else if (options.length) moveActive(active, event.key === 'ArrowDown' ? 1 : -1);
        } else if (!fromSearch && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const now = Date.now();
            search.current.text = (now - search.current.time < 700 ? search.current.text : '') + event.key.toLocaleLowerCase();
            search.current.time = now;
            const found = options.findIndex(option => !option.disabled && String(optionText(option)).toLocaleLowerCase().startsWith(search.current.text));
            if (found >= 0) { if (!open) show(); setActive(found); }
        }
    };
    const list = open && <div ref={menu} id={searchable ? undefined : `${id}-options`} role={searchable ? undefined : "listbox"} aria-label={searchable ? undefined : accessibleLabel} aria-multiselectable={!searchable && multiple || undefined} data-site-dropdown-menu
        style={portal ? position ?? { visibility: 'hidden', position: 'fixed' } : undefined}
        className={`site-dropdown-panel max-h-64 overflow-y-auto overscroll-contain rounded-xl border border-violet-200 bg-white p-1.5 text-slate-700 shadow-xl shadow-violet-950/15 ${portal ? '' : `absolute left-0 right-0 z-50 ${above ? 'bottom-full mb-2' : 'top-full mt-2'}`} ${menuClassName}`}>
        {searchable && !searchInField && <div className="sticky top-0 z-10 bg-[var(--site-dropdown-background,white)] p-1 pb-2">
            <input ref={searchInput} type="search" role="combobox" aria-label={siteT('Keresés…')} aria-expanded={open}
                aria-controls={`${id}-options`} aria-autocomplete="list"
                aria-activedescendant={visibleOptions.some(item => item.index === active) ? `${id}-option-${active}` : undefined}
                value={query} placeholder={siteT('Keresés…')} autoComplete="off" onKeyDown={onKeyDown}
                onBlur={event => { if (!root.current?.contains(event.relatedTarget) && !menu.current?.contains(event.relatedTarget)) setOpen(false); }}
                onChange={event => {
                    const next = event.target.value;
                    setQuery(next);
                    setActive(options.findIndex(option => !option.disabled && normalize(optionText(option)).includes(normalize(next).trim())));
                }}
                className="w-full rounded-lg border border-violet-200 bg-transparent px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
        </div>}
        <div id={searchable ? `${id}-options` : undefined} role={searchable ? "listbox" : undefined} aria-label={searchable ? accessibleLabel : undefined} aria-multiselectable={searchable && multiple || undefined}>
        {searchable && !visibleOptions.length && <div role="status" className="px-3 py-3 text-sm">{siteT('Nincs találat')}</div>}
        {siteT(visibleOptions.map(({ option, index }) => <div key={`${option.value}-${index}`} id={`${id}-option-${index}`}
            role="option" aria-selected={isSelected(option)} aria-disabled={option.disabled || undefined} data-option-value={String(option.value)} data-option-index={index} data-active={index === active}
            onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm ${option.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} ${index === active || isSelected(option) ? 'bg-violet-100 text-violet-900' : ''} ${isSelected(option) ? 'font-semibold' : 'font-medium'} ${optionClassName}`}>
            <span className="min-w-0">{renderOption ? renderOption(option) : optionText(option)}</span>{siteT(isSelected(option) && <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-violet-700"><path d="m20 6-11 11-5-5" /></svg>)}
        </div>))}
        </div>
    </div>;
    return (
        <div ref={root} className={`relative min-w-0 ${open ? 'z-30' : ''}`}>
            {searchInField ? <div className={`flex w-full items-center gap-2 text-left font-medium transition focus-within:border-violet-600 ${embedded ? 'min-h-6 bg-transparent p-0' : 'min-h-12 rounded-xl border-2 border-slate-400 bg-white px-4 py-3 text-sm text-black shadow-sm'} ${className}`}>
                {!open && renderSearchPrefix?.(options.filter(isSelected))}
                <input {...triggerProps} ref={trigger} id={id} type="text" role="combobox"
                    aria-label={accessibleLabel} aria-haspopup="listbox" aria-expanded={open}
                    aria-controls={`${id}-options`} aria-autocomplete="list"
                    aria-activedescendant={open && visibleOptions.some(item => item.index === active) ? `${id}-option-${active}` : undefined}
                    autoComplete="off" disabled={disabled}
                    value={open ? query : selected >= 0 && String(options[selected].value) !== '' ? options[selected].inputLabel ?? optionText(options[selected]) : ''}
                    placeholder={siteT(placeholder)}
                    onFocus={event => { triggerProps.onFocus?.(event); if (!event.defaultPrevented && !open) show(); }}
                    onClick={event => { triggerProps.onClick?.(event); if (!event.defaultPrevented && !open) show(); }}
                    onChange={event => {
                        const next = event.target.value;
                        setQuery(next); setOpen(true);
                        setActive(options.findIndex(option => !option.disabled && normalize(optionText(option)).includes(normalize(next).trim())));
                    }}
                    onKeyDown={event => { triggerProps.onKeyDown?.(event); if (!event.defaultPrevented) onKeyDown(event); }}
                    onBlur={event => { triggerProps.onBlur?.(event); if (!root.current?.contains(event.relatedTarget) && !menu.current?.contains(event.relatedTarget)) setOpen(false); }}
                    className="min-w-0 flex-1 border-0 bg-transparent p-0 text-inherit shadow-none outline-none focus:ring-0"
                    style={{ width: 0, minWidth: 0, border: 0, padding: 0, background: 'transparent', boxShadow: 'none' }} />
                <span aria-hidden="true" className="shrink-0 cursor-pointer"
                    onMouseDown={event => event.preventDefault()}
                    onClick={() => { if (disabled) return; trigger.current?.focus(); if (open) setOpen(false); else show(); }}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-5 w-5 text-violet-700 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                </span>
            </div> : <button {...triggerProps} ref={trigger} id={id} type="button" role="combobox" aria-label={accessibleLabel}
                aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`}
                aria-activedescendant={open && !searchable ? `${id}-option-${active}` : undefined}
                disabled={disabled} onKeyDown={event => { triggerProps.onKeyDown?.(event); if (!event.defaultPrevented) onKeyDown(event); }} onClick={event => { triggerProps.onClick?.(event); if (!event.defaultPrevented) open ? setOpen(false) : show(); }}
                onBlur={event => { triggerProps.onBlur?.(event); if (!root.current?.contains(event.relatedTarget) && !menu.current?.contains(event.relatedTarget)) setOpen(false); }}
                className={`flex w-full items-center justify-between gap-3 text-left font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${embedded ? 'min-h-6 border-0 bg-transparent p-0 text-[15px] leading-6 text-slate-700 outline-none focus:ring-0' : 'min-h-12 rounded-xl border-2 border-slate-400 bg-white px-4 py-3 text-sm text-black shadow-sm hover:border-violet-500 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200'} ${className}`}>
                <span className="min-w-0 truncate">{renderValue ? renderValue(options.filter(isSelected)) : multiple ? options.filter(isSelected).map(optionText).join(', ') || siteT(placeholder) : selected >= 0 ? optionText(options[selected]) : siteT(placeholder)}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-5 w-5 shrink-0 text-violet-700 transition-transform ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
            </button>}
            {(portal && list ? createPortal(list, document.body) : siteT(list))}
        </div>
    );
}
