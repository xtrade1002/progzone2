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

const pages = {
  '/home': { component: Home, title: 'Főoldal' },
  '/about-me': { component: AboutMe, title: 'Rólam' },
  '/services': { component: Services, title: 'Szolgáltatások' },
  '/prices': { component: Prices, title: 'Árak' },
  '/references': { component: References, title: 'Referenciák' },
  '/studies': { component: Studies, title: 'Studies' },
  '/contact': { component: Contact, title: 'Kapcsolat' },
  '/privacy': { component: Privacy, title: 'Adatvédelmi szerződés' },
  '/terms': { component: Terms, title: 'ÁSZF' },
  '/impressum': { component: Impressum, title: 'Impresszum' },
};

const fallbackPath = '/home';
const baseTitle = 'Progzone';

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return fallbackPath;
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export default function App() {
  const currentPath = normalizePath(window.location.pathname);
  const entry = pages[currentPath] || pages[fallbackPath];
  const PageComponent = entry.component;
  const activePath = pages[currentPath] ? currentPath : fallbackPath;

  if (entry.title) {
    document.title = `${entry.title} - ${baseTitle}`;
  } else {
    document.title = baseTitle;
  }

  return (
    <Layout activePath={activePath}>
      <PageComponent />
    </Layout>
  );
}
