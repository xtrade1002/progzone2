import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

const privacySections = [
  {
    title: '1. Az adatkezelő adatai',
    paragraphs: [
      'Adatkezelő: Xtrade / Progzone. Székhely: Strasse der Jugend 18, 14974 Ludwigsfelde, Deutschland. E-mail: info@progzone.hu. Telefonszám: +49 173 615 47 30. USt-IdNr.: DE362261730.',
      'Jelen tájékoztató a progzone.hu, progzone.de és a kapcsolódó Progzone weboldalak kapcsolatfelvételi és árajánlatkérő űrlapjain keresztül végzett adatkezelésekre vonatkozik.',
    ],
  },
  {
    title: '2. Milyen adatokat kérünk be?',
    items: [
      'Kapcsolatfelvételi űrlap: név, e-mail cím, opcionális telefonszám, üzenet.',
      'Árajánlatkérő űrlap: név, e-mail cím, opcionális telefonszám, cég vagy projekt neve, választott szolgáltatás, költségkeret, tervezett határidő, projektleírás, referencia oldalak, célközönség, projekt nyelvei, funkcióigények, tartalomforrás, számlázási információk, preferált fizetési mód, utótámogatási igény, tárhely/domain igény, integrációs igények, marketing célok, jogi vagy megfelelőségi megjegyzések, projekt prioritása, valamint az adatkezelési tájékoztató elfogadásának ténye.',
      'Technikai adatok: a weboldal működéséhez szükséges naplóadatok, például IP-cím, böngésző- és eszközinformáció, látogatás időpontja, valamint munkamenet-cookie-k.',
    ],
  },
  {
    title: '3. Az adatkezelés célja és jogalapja',
    items: [
      'Kapcsolatfelvétel megválaszolása: a megkeresés kezelése és válaszadás. Jogalap: szerződéskötést megelőző lépések vagy jogos érdek.',
      'Árajánlat készítése: az igények felmérése, ajánlat összeállítása és egyeztetés. Jogalap: szerződéskötést megelőző lépések.',
      'Szerződés teljesítése és projektkommunikáció: a megrendelt webfejlesztési, design, webshop vagy marketing szolgáltatás teljesítése. Jogalap: szerződés teljesítése.',
      'Számlázás és könyvelés: számla kiállítása, adózási és számviteli kötelezettségek teljesítése. Jogalap: jogi kötelezettség.',
      'Jogi igények kezelése: vitás ügyek, követelések, bizonyítás. Jogalap: jogos érdek.',
    ],
  },
  {
    title: '4. Kik férhetnek hozzá az adatokhoz?',
    paragraphs: [
      'Az adatokat az adatkezelő kezeli. A weboldal működtetéséhez és az üzenetek továbbításához technikai szolgáltatók vehetnek részt adatfeldolgozóként, különösen tárhelyszolgáltató, e-mail küldő szolgáltató, levelezési szolgáltató, domain- és IT-üzemeltetési szolgáltató.',
      'A weboldal az űrlapértesítésekhez Mailjet e-mail küldő szolgáltatást használhat. Harmadik fél részére adatot csak akkor adunk át, ha ez a szolgáltatás teljesítéséhez szükséges, jogszabály írja elő, vagy az érintett ehhez kifejezetten hozzájárult.',
    ],
  },
  {
    title: '5. Adatmegőrzési idő',
    items: [
      'Kapcsolatfelvételi üzenetek: legfeljebb 12 hónapig, kivéve ha az ügyből szerződés vagy jogvita lesz.',
      'Árajánlatkérések és ajánlati egyeztetések: legfeljebb 24 hónapig, vagy szerződéskötés esetén a szerződéses dokumentáció részeként.',
      'Szerződéses és projektadatok: a szerződés teljesítéséhez, garanciális vagy igényérvényesítési határidőkig szükséges ideig.',
      'Számlázási adatok: a vonatkozó számviteli és adózási jogszabályok szerinti megőrzési ideig.',
      'Technikai naplóadatok: biztonsági és hibakeresési célból korlátozott ideig.',
    ],
  },
  {
    title: '6. Cookie-k és analitika',
    paragraphs: [
      'A weboldal a működéshez szükséges cookie-kat használhat, például munkamenet-kezelésre és nyelvválasztásra. Ezek nélkül bizonyos funkciók nem működnének megfelelően.',
      'Marketing vagy analitikai cookie-k, például Google Analytics vagy hirdetési mérőkódok csak akkor használhatók, ha azok ténylegesen be vannak építve az oldalba, és a látogató a szükséges hozzájárulást megadta. Amennyiben ilyen mérés később bekerül, a tájékoztató és a cookie-kezelés frissítendő.',
    ],
  },
  {
    title: '7. Az érintettek jogai',
    items: [
      'Tájékoztatást kérhetsz arról, hogy milyen személyes adatokat kezelünk rólad.',
      'Kérheted az adataid helyesbítését, törlését vagy az adatkezelés korlátozását.',
      'Bizonyos esetekben kérheted az adatok hordozhatóságát, vagy tiltakozhatsz az adatkezelés ellen.',
      'Hozzájáruláson alapuló adatkezelés esetén a hozzájárulást bármikor visszavonhatod, ez azonban nem érinti a visszavonás előtti adatkezelés jogszerűségét.',
      'Kérelmedet az info@progzone.hu e-mail címen tudod benyújtani. A kérelmekre indokolatlan késedelem nélkül, legfeljebb 30 napon belül válaszolunk.',
    ],
  },
  {
    title: '8. Panasz és jogorvoslat',
    paragraphs: [
      'Ha úgy érzed, hogy a személyes adataid kezelése nem megfelelő, először érdemes közvetlenül az info@progzone.hu címen jelezni a problémát, hogy gyorsan rendezni lehessen.',
      'Panaszt tehetsz a lakóhelyed vagy tartózkodási helyed szerinti adatvédelmi felügyeleti hatóságnál is. Magyarországon ez a Nemzeti Adatvédelmi és Információszabadság Hatóság, Németországban pedig az illetékes tartományi adatvédelmi hatóság.',
    ],
  },
  {
    title: '9. A tájékoztató módosítása',
    paragraphs: [
      'Az adatkezelési tájékoztató módosulhat, ha a weboldal funkciói, az igénybe vett szolgáltatók vagy a jogszabályi környezet változik. A mindenkor hatályos változat ezen az oldalon érhető el.',
      'Hatályos: 2026. május 13.',
    ],
  },
];

function Section({ section }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-black text-[var(--pz-pink)]">{section.title}</h2>
      {section.paragraphs?.map((paragraph, index) => (
        <p key={index} className="leading-relaxed text-slate-300">{paragraph}</p>
      ))}
      {section.items && (
        <ul className="list-inside list-disc space-y-2 text-slate-300">
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function Privacy() {
  const { trans, t } = useTranslations();
  const privacy = trans?.privacy ?? {};
  const sections = Array.isArray(privacy.sections) ? privacy.sections : privacySections;

  return (
    <Layout>
      <Head title={privacy.meta_title ?? t('menu.privacy', 'Privacy')} />
      <section className="pz-section max-w-4xl">
        <div className="pz-panel space-y-6 rounded-[2rem] p-8">
          <h1 className="pz-title text-4xl font-black">
            {privacy.document_title ?? 'Adatkezelési tájékoztató'}
          </h1>
          <p className="text-lg leading-relaxed text-slate-300">
            {privacy.document_intro ?? 'Ez a tájékoztató összefoglalja, hogy a Progzone weboldal milyen adatokat kér be, milyen célból kezeli azokat, és milyen jogaid vannak az adatkezeléssel kapcsolatban.'}
          </p>
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Section key={section.title ?? index} section={section} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
