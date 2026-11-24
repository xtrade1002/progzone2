import React, { useState } from 'react';
import SelectInput from './SelectInput';
import { useSiteLocale } from './i18n';

const textContent = children => React.Children.toArray(children).map(child =>
    React.isValidElement(child) ? textContent(child.props.children) : String(child)).join('').trim();

export default function PhoneCountrySelect({ children, className = '', defaultValue = '', disabled = false,
    id, menuClassName = '', name, onBlur, onChange, required = false, value, 'aria-label': ariaLabel }) {
    useSiteLocale();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const options = React.Children.toArray(children).filter(React.isValidElement).map(child => ({
        value: child.props.value ?? textContent(child.props.children),
        label: child.props['aria-label'] || textContent(child.props.children),
        inputLabel: textContent(child.props.children),
        disabled: child.props.disabled,
        flag: React.Children.toArray(child.props.children).find(node => React.isValidElement(node) && ['img', 'svg'].includes(node.type)),
    }));
    return <span className="custom-select phone-country-search-select">
        {name && <input type="hidden" name={name} value={selectedValue} disabled={disabled} required={required} />}
        <SelectInput id={id} label={ariaLabel} value={selectedValue} options={options} disabled={disabled}
            searchable inlineSearch embedded menuMinWidth={280} className={'custom-select-trigger phone-country-search-trigger ' + className}
            menuClassName={'phone-country-search-menu ' + menuClassName} triggerProps={{ onBlur, 'aria-required': required }}
            renderSearchPrefix={selected => selected[0]?.flag}
            renderOption={option => <span className="flex items-center gap-2">{option.flag}<span>{option.label}</span></span>}
            onChange={event => {
                if (value === undefined) setInternalValue(event.target.value);
                const target = { name, value: event.target.value };
                onChange?.({ target, currentTarget: target });
            }} />
    </span>;
}
