import React from 'react';
import route from '../route.js';

const footerLinks = [
  { name: 'privacy', label: 'Adatvédelmi szerződés' },
  { name: 'terms', label: 'ÁSZF' },
  { name: 'impressum', label: 'Impresszum' },
];

export default function FooterMenu() {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-12">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} Progzone. Minden jog fenntartva.</p>
        <div className="flex space-x-6">
          {footerLinks.map((link) => (
            <a key={link.name} href={route(link.name)} className="hover:text-pink-400">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
