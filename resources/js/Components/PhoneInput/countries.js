import countries from '../../data/phone-countries.json';

export default function phoneCountries(locale) {
  const language = locale.split('-')[0];
  return countries.map((country) => ({
    code: country.iso_code,
    country_name: country.en,
    country_code: country.calling_code,
    iso_code: country.iso_code,
    flag_url: `/images/country-flags/${country.iso_code.toLowerCase()}.svg`,
    leading_digits: country.leading_digits,
    detection_pattern: country.detection_pattern,
    main_country: country.main_country,
    label: country[language] ?? country.en,
  }));
}
