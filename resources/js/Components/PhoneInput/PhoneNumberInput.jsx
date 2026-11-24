import CustomSelect from './PhoneCountrySelect';
import '../../../css/phone-number-input.css';
import React, { forwardRef, useEffect, useId, useMemo, useState } from 'react';

import { usePage } from '@inertiajs/react';
import { translateSiteText as siteT, useSiteLocale } from './i18n';


const countryIsoCodes = {
    'United States / Canada': 'US',
    Egypt: 'EG',
    'South Africa': 'ZA',
    Greece: 'GR',
    Netherlands: 'NL',
    Belgium: 'BE',
    Germany: 'DE',
    Austria: 'AT',
    Switzerland: 'CH',
    France: 'FR',
    Italy: 'IT',
    Spain: 'ES',
    Hungary: 'HU',
    Romania: 'RO',
    'United Kingdom': 'GB',
    Denmark: 'DK',
    Sweden: 'SE',
    Norway: 'NO',
    Poland: 'PL',
    Mexico: 'MX',
    Argentina: 'AR',
    Brazil: 'BR',
    Portugal: 'PT',
    Ireland: 'IE',
    'Czech Republic': 'CZ',
    Slovakia: 'SK',
    Ukraine: 'UA',
    Russia: 'RU',
    Thailand: 'TH',
    Australia: 'AU',
    'New Zealand': 'NZ',
    Japan: 'JP',
    'South Korea': 'KR',
    China: 'CN',
    Turkey: 'TR',
    India: 'IN',
    'United Arab Emirates': 'AE',
    Israel: 'IL',
};

const siteCountryNames = {
    ch: 'Switzerland',
    hu: 'Hungary',
};

const flagForOption = (option) => {
    const countryName = option.country_name || option.name || option.code || '';
    const normalizedName = siteCountryNames[String(countryName).toLowerCase()] || countryName;
    const isoCode = option.iso_code || countryIsoCodes[normalizedName]
        || (/^[a-z]{2}$/i.test(String(option.code)) ? option.code.toUpperCase() : '');
    return isoCode
        ? <img className="phone-country-flag" src={option.flag_url || '/images/phone-flags/' + isoCode.toLowerCase() + '.svg'} alt={siteT("")} aria-hidden="true" width="22" height="16" />
        : <svg className="phone-country-flag" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>;
};

const FALLBACK = [{ code: 'phone_hu', country_name: 'Hungary', country_code: '+36' }];
export const normalizePhoneNumber = (phone = siteT('')) => {
    const text = String(phone || '').trim();
    const international = text.startsWith('+') || text.startsWith('00');
    const digits = text.replace(/\D/g, '').replace(text.startsWith('00') ? /^00/ : /^$/, '');
    return (international ? '+' : '') + digits;
};
const countryFromPhone = (phone, options, preferred) => {
    let normalized = normalizePhoneNumber(phone);
    if (!normalized.startsWith('+')) {
        if (normalized.length < 11 || normalized.startsWith('0')) return null;
        normalized = '+' + normalized;
    }
    const candidates = [...options].sort((a,b) => b.country_code.length - a.country_code.length).filter(option => normalized.startsWith(option.country_code));
    if (!candidates.length) return null;
    const longest = candidates[0].country_code;
    const sameCode = candidates.filter(option => option.country_code === longest);
    const national = normalized.slice(longest.length);
    const matches = sameCode.filter(option => option.leading_digits
        ? new RegExp('^(?:' + option.leading_digits + ')').test(national)
        : option.detection_pattern && new RegExp('^(?:' + option.detection_pattern + ')$').test(national));
    return matches.find(option => option.code === preferred) || matches[0]
        || sameCode.find(option => option.code === preferred) || sameCode.find(option => option.main_country) || sameCode[0];
};
const localFromPhone = (phone, prefix) => {
    const normalized = normalizePhoneNumber(phone);
    if (normalized.startsWith(prefix)) return normalized.slice(prefix.length);
    const digits = normalized.replace(/\D/g, '');
    if (digits.length >= 11 && digits.startsWith(prefix.slice(1))) return digits.slice(prefix.length - 1);
    return prefix === '+36' && digits.startsWith('06') ? digits.slice(2) : digits;
};

// Default: transparent outlined field with its own label. Use variant="embedded"
// inside a custom field; existing LegendField wrappers are detected automatically.
// Override --phone-field-border / --phone-field-label / --phone-field-color to theme it.
// Native event adapter lets existing forms keep their own validation and state.
export default forwardRef(function PhoneNumberInput({ type = 'tel', onChangeEvent, inputClassName = '', ...props }, ref) {
    useSiteLocale();
    if (type !== 'tel') return <input {...props} ref={ref} type={type} className={inputClassName || props.className} onChange={onChangeEvent || props.onChange} />;
    return <PhoneControl {...props} inputRef={ref} onChangeEvent={onChangeEvent} inputClassName={inputClassName} />;
});

function PhoneControl({ value = '', onChange, onChangeEvent, country = '', countries, required = false, id, name,
    className = '', inputClassName = '', variant = 'outlined', label = 'Telefon', error, autoComplete = 'tel-national', disabled = false, readOnly = false,
    inputRef, onBlur, maxLength = 15, ...inputProps }) {
    useSiteLocale();
    const page = usePage();
    const nestedLegend = false;
    const generatedId = useId();
    const controlId = id ?? generatedId;
    const outlined = variant === 'outlined' && !nestedLegend;
    const embedded = variant === 'embedded' || variant === 'outlined' || nestedLegend;
    const options = useMemo(() => {
        const source = countries?.length ? countries : page.props.phoneCountries?.length ? page.props.phoneCountries : page.props.locations?.phoneCountries;
        const list = source?.length ? source.filter(item => item.code && item.country_code) : FALLBACK;
        return [...list, { code: 'phone_other', country_name: 'Other', country_code: '+' }];
    }, [countries, page.props.phoneCountries, page.props.locations?.phoneCountries]);
    const defaultCountry = country || page.props.site?.country || 'hu';
    const preferred = options.find(option => option.code === defaultCountry || option.iso_code?.toLowerCase() === String(defaultCountry).toLowerCase() || option.country_name?.toLowerCase() === (siteCountryNames[String(defaultCountry).toLowerCase()] || defaultCountry).toLowerCase()) || options.find(option => option.country_code === '+36') || options[0];
    const [selected, setSelected] = useState(() => (countryFromPhone(value, options, preferred.code) || preferred).code);
    const selectedOption = options.find(option => option.code === selected) || preferred;
    const prefix = selectedOption.country_code;
    const local = localFromPhone(value, prefix);
    const digitLimit = Math.min(15, maxLength);
    const localLimit = digitLimit - prefix.replace(/\D/g, '').length;
    useEffect(() => {
        const detected = countryFromPhone(value, options, selected);
        if (detected && detected.country_code !== selectedOption.country_code) setSelected(detected.code);
        else if (!options.some(option => option.code === selected)) setSelected(preferred.code);
    }, [value, options, preferred.code, selected, selectedOption.country_code]);
    const emit = (full, callingCode = prefix) => {
        const limited = full ? '+' + full.replace(/\D/g, '').slice(0, digitLimit) : '';
        onChange?.(limited, { countryCode: callingCode, localNumber: localFromPhone(limited, callingCode) });
        const target = { name, id: controlId, type: 'tel', value: limited };
        onChangeEvent?.({ target, currentTarget: target });
    };
    const updateNumber = raw => {
        const detected = /^(\+|00)/.test(raw.trim()) ? countryFromPhone(raw, options, selected) : null;
        if (detected) { setSelected(detected.code); emit(normalizePhoneNumber(raw), detected.country_code); }
        else { const digits = raw.replace(/\D/g, ''); const national = prefix === '+36' && digits.startsWith('06') ? digits.slice(2) : digits; emit(national ? prefix + national : ''); }
    };
    const input = event => updateNumber(event.target.value);
    const control = <div className={'phone-number-control ' + (embedded ? 'phone-number-control--embedded ' : '') + className}>
        <CustomSelect className="phone-country-select" menuClassName="phone-country-select-menu" aria-label={siteT("Országhívó")} value={selectedOption.code} disabled={disabled || readOnly} onChange={event => { const option = options.find(item => item.code === event.target.value); setSelected(option.code); emit(local ? option.country_code + local : '', option.country_code); }}>
            {siteT(options.map(option => <option key={option.code} value={option.code} aria-label={(option.label || option.country_name || option.code) + ' ' + option.country_code}>{siteT(flagForOption(option))} <span>{siteT(option.country_code)}</span></option>))}
        </CustomSelect>
        {(name && <input type="hidden" name={name} value={value || ''} disabled={disabled} />)}
        <input {...inputProps} ref={inputRef} id={controlId} type="tel" className={inputClassName} value={local} onChange={input} onBlur={onBlur} required={required} disabled={disabled} readOnly={readOnly} autoComplete={autoComplete} inputMode="numeric" pattern="[0-9]*" maxLength={localLimit}
            onPaste={event => {
                const text = event.clipboardData.getData('text');
                if (/^(\+|00)/.test(text.trim())) {
                    event.preventDefault();
                    updateNumber(text);
                }
            }}
            aria-invalid={error ? true : inputProps['aria-invalid']} aria-describedby={error ? `${controlId}-error` : inputProps['aria-describedby']} />
    </div>;
    return outlined ? <div className="phone-number-field-wrapper">
        <fieldset className={`phone-number-field${error ? ' has-error' : ''}`}>
            {label && <legend><label htmlFor={controlId}>{siteT(label)}</label></legend>}
            {control}
        </fieldset>
        {error && <p id={`${controlId}-error`} role="alert" className="phone-number-field-error">{error}</p>}
    </div> : control;
}
