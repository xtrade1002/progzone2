import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout.jsx';
import useTranslations from '../lib/useTranslations.js';

const termSections = [
  {
    title: '1. Szolgáltató adatai',
    paragraphs: [
      'Szolgáltató: Xtrade / Progzone. Székhely: Strasse der Jugend 18, 14974 Ludwigsfelde, Deutschland. E-mail: info@progzone.hu. Telefonszám: +49 173 615 47 30. USt-IdNr.: DE362261730.',
      'A jelen ÁSZF a Progzone által nyújtott weboldal-készítési, webshop-fejlesztési, egyedi webfejlesztési, webdesign, arculattervezési és online marketing szolgáltatásokra vonatkozik.',
    ],
  },
  {
    title: '2. Az ÁSZF hatálya',
    paragraphs: [
      'A jelen feltételek a weboldalon keresztül érkező megkeresésekre, árajánlatkérésekre, valamint az ezek alapján létrejövő egyedi megrendelésekre és szerződésekre alkalmazandók.',
      'A weboldalon szereplő információk és árak tájékoztató jellegűek. Konkrét projekt csak írásban elfogadott ajánlat vagy külön szerződés alapján indul.',
    ],
  },
  {
    title: '3. Szolgáltatások',
    items: [
      'WordPress weboldal készítés és beállítás.',
      'WooCommerce webshop készítés és kapcsolódó beállítások.',
      'Egyedileg fejlesztett weboldalak és webalkalmazások.',
      'Webdesign, UI-tervezés, logó- és arculattervezés.',
      'Online marketing szolgáltatások, például SEO, Google Ads, Facebook/Instagram kampányok és tartalomkészítés.',
      'Karbantartás, utótámogatás, tárhely/domain ügyintézés és integrációk, amennyiben ezek az ajánlatban szerepelnek.',
    ],
  },
  {
    title: '4. Ajánlatkérés és szerződéskötés',
    paragraphs: [
      'Az árajánlatkérő űrlap elküldése nem minősül megrendelésnek és nem hoz létre fizetési kötelezettséget. Az űrlap célja az igények felmérése és személyre szabott ajánlat készítése.',
      'A szerződés akkor jön létre, amikor az ügyfél az írásban megküldött ajánlatot elfogadja, és a felek a projekt lényeges feltételeiben megállapodnak. Ilyen feltétel különösen a feladatleírás, díjazás, fizetési ütemezés, határidő és átadandó anyagok köre.',
    ],
  },
  {
    title: '5. Díjak és fizetés',
    items: [
      'A díjak egyedi ajánlat alapján kerülnek meghatározásra. A weboldalon szereplő árak becslések vagy induló árak lehetnek.',
      'A projekt díja lehet fix díjas, óradíjas vagy mérföldkövekhez kötött, az elfogadott ajánlat szerint.',
      'Domain, tárhely, prémium sablonok, bővítmények, külső szoftverek, hirdetési költségek és harmadik fél szolgáltatásai csak akkor részei a vállalási díjnak, ha az ajánlat ezt kifejezetten tartalmazza.',
      'A fizetés általában banki átutalással történik. Előleg vagy részfizetés az ajánlatban meghatározottak szerint kérhető.',
      'Késedelmes fizetés esetén a szolgáltató jogosult a munkát felfüggeszteni és a jogszabály szerinti késedelmi kamatot vagy behajtási költséget érvényesíteni.',
    ],
  },
  {
    title: '6. Ügyfél együttműködési kötelezettsége',
    items: [
      'Az ügyfél köteles időben átadni a projekthez szükséges tartalmakat, hozzáféréseket, arculati anyagokat, képeket, szövegeket, jogi dokumentumokat és egyéb információkat.',
      'Az átadott anyagok jogszerűségéért, pontosságáért és felhasználási jogosultságáért az ügyfél felel.',
      'Ha az ügyfél késedelmesen ad visszajelzést vagy nem biztosítja a szükséges anyagokat, a határidők ennek megfelelően módosulhatnak.',
      'A projekttel kapcsolatos egyeztetés, módosítási kérés, jóváhagyás és egyéb kapcsolattartás kizárólag írásban, például e-mailben vagy más írásban visszakereshető csatornán történik, az esetleges félreértések elkerülése érdekében.',
    ],
  },
  {
    title: '7. Határidők és teljesítés',
    paragraphs: [
      'A határidők a felek együttműködésén alapulnak, és akkor tarthatók, ha minden szükséges anyag, hozzáférés és döntés időben rendelkezésre áll.',
      'A teljesítés történhet tesztoldalon, végleges domainen, fájlátadással vagy más, az ajánlatban meghatározott módon. A munka átadását követően az ügyfél köteles észszerű határidőn belül ellenőrizni az elkészült anyagot és jelezni az esetleges hibákat.',
    ],
  },
  {
    title: '8. Módosítások és többletmunka',
    paragraphs: [
      'Az elfogadott ajánlatban szereplő feladatokon túli módosítások, új funkciók, extra oldalak, integrációk, kampányok vagy tartalmi bővítések többletmunkának minősülhetnek.',
      'A többletmunka külön díjazás és külön határidő mellett végezhető el, amelyről a felek előzetesen egyeztetnek.',
    ],
  },
  {
    title: '9. Szellemi tulajdon',
    items: [
      'Az elkészült egyedi designok, forráskódok és kreatív anyagok felhasználási joga a teljes díj megfizetésével száll át az ügyfélre, az ajánlatban meghatározott terjedelemben.',
      'A szolgáltató által használt általános know-how, sablonok, keretrendszerek, fejlesztői eszközök és újrahasznosítható komponensek nem kerülnek kizárólagos tulajdonba.',
      'Harmadik féltől származó sablonok, bővítmények, betűtípusok, képek, szoftverek és szolgáltatások licencfeltételei az adott harmadik fél feltételei szerint irányadók.',
      'A szolgáltató jogosult az elkészült munkát referenciaként feltüntetni, kivéve ha a felek írásban másként állapodnak meg.',
    ],
  },
  {
    title: '10. Külső szolgáltatások',
    paragraphs: [
      'A projektekhez szükség lehet harmadik fél szolgáltatásaira, például domainregisztrátorra, tárhelyszolgáltatóra, e-mail SMTP szolgáltatóra, fizetési szolgáltatóra, hírlevélküldőre, Google, Meta vagy más marketingplatformokra. Ezek működéséért, díjaiért, rendelkezésre állásáért és szabályzatáért az adott szolgáltató felel.',
      'A jelen weboldal tárhely- és e-mail SMTP szolgáltatója Hostinger lehet. A Hostinger szolgáltatásainak működésére, díjaira, korlátozásaira, e-mail kézbesítésére és rendelkezésre állására a Hostinger saját feltételei irányadók.',
      'A kapcsolatfelvételi és árajánlatkérő űrlapok védelméhez Cloudflare Turnstile hitelesítés használható. A Cloudflare ellenőrzés célja a robotok, spam és visszaélésszerű űrlapküldések csökkentése.',
      'A szolgáltató segíthet ezek beállításában, de a külső szolgáltatóknál létrejövő szerződés általában az ügyfél és a külső szolgáltató között jön létre.',
    ],
  },
  {
    title: '11. Hibajavítás, karbantartás és garancia',
    items: [
      'A szolgáltató kijavítja azokat a hibákat, amelyek bizonyíthatóan az általa végzett munkából erednek, és amelyeket az ügyfél az átadást követően észszerű időn belül jelez.',
      'Nem tartozik az ingyenes hibajavítás körébe a későbbi tartalommódosítás, új funkció, külső szolgáltató változása, tárhelyprobléma, jogosulatlan beavatkozás, frissítésből eredő inkompatibilitás vagy az ügyfél által végzett módosítás.',
      'WordPress, WooCommerce és bővítmények esetén a rendszeres frissítés, biztonsági mentés és karbantartás külön szolgáltatásként rendelhető meg.',
    ],
  },
  {
    title: '12. Elállás és felmondás',
    paragraphs: [
      'Fogyasztónak minősülő ügyfél távollevők között kötött szerződés esetén főszabály szerint 14 napon belül elállhat. Ha azonban a szolgáltatás teljesítése az ügyfél kifejezett kérésére a 14 napos határidőn belül megkezdődik, az ügyfél tudomásul veszi, hogy a már teljesített munka ellenértéke arányosan felszámítható.',
      'Egyedi, az ügyfél kifejezett igényei alapján készülő digitális vagy kreatív szolgáltatásoknál az elállási jog jogszabály szerint korlátozott lehet. Üzleti ügyfelek esetén az elállásra és felmondásra az elfogadott ajánlat vagy külön szerződés rendelkezései irányadók.',
    ],
  },
  {
    title: '13. Felelősség',
    paragraphs: [
      'A szolgáltató a szolgáltatásokat szakmai gondossággal nyújtja, de nem vállal garanciát konkrét üzleti eredményre, keresőoptimalizálási helyezésre, hirdetési megtérülésre vagy harmadik fél platformjainak döntéseire.',
      'A szolgáltató nem felel az ügyfél által átadott hibás vagy jogsértő tartalomért, hiányos információért, késedelmes visszajelzésért, illetve külső szolgáltatók működési hibáiért.',
    ],
  },
  {
    title: '14. Adatkezelés',
    paragraphs: [
      'A szolgáltató a megrendelés, kapcsolattartás, számlázás és teljesítés során személyes adatokat kezel. Az adatkezelés részletes szabályait az Adatkezelési tájékoztató tartalmazza.',
    ],
  },
  {
    title: '15. ÁSZF, adatvédelem és szerzői jogi nyilatkozat',
    paragraphs: [
      'Az Általános Szerződési Feltételek meghatározza a weboldal vagy vállalkozás és az ügyfelek közötti jogokat és kötelezettségeket. Tartalmazhatja többek között a vásárlás, fizetés, szállítás, teljesítés és elállás szabályait, ezzel segítve a jogbiztonságot és a fogyasztóvédelmet. Webshopok és szolgáltatást kínáló oldalak számára különösen fontos dokumentum.',
      'Az Adatvédelmi tájékoztató leírja, hogy a weboldal hogyan kezeli a felhasználók személyes adatait a GDPR előírásai szerint. Tartalmazza az adatgyűjtés célját, az adatkezelő kilétét és a felhasználók jogait, például az adatok törléséhez, módosításához, korlátozásához vagy az adatkezelés elleni tiltakozáshoz való jogot. Minden adatkezelést végző oldal számára szükséges.',
      'A szerzői jog olyan jogi védelem, amely az eredeti, egyéni szellemi alkotásokat, például szövegeket, képeket, zenéket, filmeket, grafikai elemeket, forráskódot vagy más kreatív tartalmakat illeti meg. A szerzői jog biztosítja, hogy a szerző vagy jogosult engedélye nélkül az alkotás ne legyen jogosulatlanul másolható, terjeszthető vagy felhasználható.',
    ],
  },
  {
    title: '16. Jogi nyilatkozat a megbízói weboldalakhoz',
    items: [
      'Az Adatvédelmi tájékoztató és az Általános Szerződési Feltételek tartalma generátor segítségével készülhet. A Megbízott nem vállal felelősséget annak teljes körű jogi megfelelőségéért. Javasolt, hogy a Megbízó jogi szakértővel ellenőriztesse a dokumentumokat.',
      'A weboldalra feltöltött képek AI által generáltak lehetnek, amennyiben erről a felek így állapodnak meg vagy a projekt során ilyen képek kerülnek felhasználásra.',
      'A Megbízott nem vállal felelősséget a Megbízó által biztosított jogvédett tartalmak, képek, szövegek, logók, videók, zenék, adatbázisok vagy egyéb anyagok felhasználásából eredő esetleges jogsértésekért.',
      'A Megbízott nem vállal felelősséget a Megbízó által feltöltött, módosított vagy jóváhagyott tartalmakért, ezek jogi megfelelőségéért, pontosságáért, valamint az ezekből eredő hibákért vagy károkért.',
      'Amennyiben a Megbízó által feltöltött, módosított vagy biztosított tartalom miatt technikai hiba, működési probléma vagy javítási igény merül fel, a Megbízott jogosult a javítást az általa meghatározott óradíjon elvégezni.',
      'A fent leírtakat a Megbízó az ajánlat vagy szerződés elfogadásával tudomásul veszi és elfogadja.',
    ],
  },
  {
    title: '17. Irányadó jog és viták rendezése',
    paragraphs: [
      'A felek elsődlegesen békés, írásos egyeztetés útján rendezik vitáikat. Amennyiben ez nem vezet eredményre, a jogvita rendezésére az irányadó jogszabályok és az illetékes bíróságok szabályai alkalmazandók.',
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

export default function Terms() {
  const { trans, t } = useTranslations();
  const terms = trans?.terms ?? {};
  const sections = Array.isArray(terms.sections) ? terms.sections : termSections;

  return (
    <Layout>
      <Head title={terms.meta_title ?? t('menu.terms', 'Terms')} />
      <section className="pz-section max-w-4xl">
        <div className="pz-panel space-y-6 rounded-[2rem] p-8">
          <h1 className="pz-title text-4xl font-black">
            {terms.document_title ?? 'Általános szerződési feltételek'}
          </h1>
          <p className="text-lg leading-relaxed text-slate-300">
            {terms.document_intro ?? 'Az alábbi feltételek a Progzone webfejlesztési, design, webshop és online marketing szolgáltatásainak igénybevételére vonatkoznak.'}
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
