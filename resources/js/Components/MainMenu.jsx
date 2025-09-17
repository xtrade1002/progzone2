import React from 'react';
import route from '../route.js';

const menuItems = [
  { name: 'home', label: 'Főoldal' },
  { name: 'aboutme', label: 'Rólam' },
  { name: 'services', label: 'Szolgáltatások' },
  { name: 'prices', label: 'Árak' },
  { name: 'references', label: 'Referenciák' },
  { name: 'infos', label: 'Információk' },
  { name: 'contact', label: 'Kapcsolat' },
];

export default function MainMenu({ activePath }) {
  return (
    <header className="bg-[#232323] py-4">
      <nav>
        <ul className="flex justify-center space-x-8 text-lg font-semibold text-[#FF007A]">
          {menuItems.map((item) => {
            const href = route(item.name);
            const isActive = activePath === href;
            const baseClasses = 'hover:underline transition-colors';
            const activeClasses = isActive ? 'text-white underline decoration-[#FF007A] decoration-2 underline-offset-4' : '';

            return (
              <li key={item.name}>
                <a href={href} className={`${baseClasses} ${activeClasses}`.trim()}>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
