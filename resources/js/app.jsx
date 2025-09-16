import React from 'react';
import Layout from './Components/Layout.jsx';
import AboutMe from './pages/AboutMe.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Impressum from './pages/Impressum.jsx';
import Prices from './pages/Prices.jsx';
import Privacy from './pages/Privacy.jsx';
import References from './pages/References.jsx';
import Services from './pages/Services.jsx';
import Studies from './pages/Studies.jsx';
import Terms from './pages/Terms.jsx';
import route from './route.js';

const DEFAULT_PATH = '/home';

const pagesByPath = {
  [DEFAULT_PATH]: Home,
  '/about-me': AboutMe,
  '/services': Services,
  '/prices': Prices,
  '/references': References,
  '/studies': Studies,
  '/contact': Contact,
  '/privacy': Privacy,
  '/terms': Terms,
  '/impressum': Impressum,
};

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return DEFAULT_PATH;
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function NotFound() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
      <h1 className="text-5xl font-bold text-[#FF007A]">404</h1>
      <p className="text-lg text-gray-300">A keresett oldal nem található.</p>
      <a href={route('home')} className="inline-block text-[#FF007A] underline underline-offset-4">
        Vissza a főoldalra
      </a>
    </section>
  );
}

export default function App() {
  const currentPath =
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : DEFAULT_PATH;

  const PageComponent = pagesByPath[currentPath] || null;
  const activePath = PageComponent ? currentPath : '';

  return (
    <Layout activePath={activePath}>
      {PageComponent ? <PageComponent /> : <NotFound />}
    </Layout>
  );
}
