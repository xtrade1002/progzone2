import React from 'react';
import route from '../route.js';

const menuItems = [
  { name: 'home', label: 'Főoldal' },
  { name: 'aboutme', label: 'Rólam' },
  { name: 'services', label: 'Szolgáltatások' },
  { name: 'prices', label: 'Árak' },
  { name: 'references', label: 'Referenciák' },
  { name: 'infos', label: 'Információk' },
  { name: 'quote', label: 'Árajánlat' },
  { name: 'contact', label: 'Kapcsolat' },
];

export default function MainMenu({ activePath }) {
  return (
    <header className="bg-gradient-to-br from-[#0a0a0f] via-[#141422] to-[#0a0a0f] text-gray-400 py-4">
      <nav>
        <ul className="flex justify-center space-x-8 text-lg font-semibold text-[#FF007A]">
          {menuItems.map((item) => {
            const href = route(item.name);
            const isActive = activePath === href;
            const baseClasses = 'hover:underline transition-colors';
            const activeClasses = isActive
              ? 'text-white underline decoration-[#FF007A] decoration-2 underline-offset-4'
              : '';

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

      {/* Neon kék vonal közvetlenül a menü alatt */}
      <div className="w-full h-[1px] bg-[#00f7ff] shadow-[0_0_15px_#00f7ff] mt-4 mb-2"/>
    </header>
  );
}
