import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "../Components/Layout.jsx";
import useTranslations from "../lib/useTranslations.js";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Infos() {
  const { trans, t } = useTranslations();
  const infos = trans?.infos ?? {};

  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //  Weboldalak
  const webItems = [
    {
      title: "Mi az a domain és hosting szolgáltatás?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A <strong>domain név</strong> (pl. <code>example.com</code>) olyan,
            mint a ház címe. Ha valaki beírja a böngészőbe, ezen keresztül talál
            rá a weboldaladra.
          </p>
          <p>
            A <strong>hosting (tárhely)</strong> pedig maga a ház: az a hely,
            ahol a weboldalad fájljai (szövegek, képek, adatbázis) vannak
            eltárolva.
          </p>
          <p>
             A domain és a hosting együtt szükséges ahhoz, hogy a weboldalad
            mindenki számára elérhető legyen. Ha az egyik hiányzik, nem fog
            működni.
          </p>
        </div>
      ),
    },
    {
      title: "Mi a különbség a WordPress és az egyedileg fejlesztett weboldalak között?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A <strong>WordPress</strong> egy kész rendszer, amit milliók
            használnak. Ez olyan, mint egy előre felépített ház, amit belül
            átrendezhetsz: választhatsz sablont és kiegészítőket. Gyorsabb és
            olcsóbb, de kevésbé rugalmas.
          </p>
          <p>
            Az <strong>egyedi fejlesztésű weboldal</strong> viszont a nulláról,
            teljesen rád szabva készül el. Ez olyan, mint egy saját tervezésű
            villa: pontosan azt kapod, amit szeretnél, de több időt és pénzt
            igényel.
          </p>
          <p>
             Röviden: a WordPress a „kész ház”, az egyedi fejlesztés pedig a
            „saját építésű otthon”.
          </p>
        </div>
      ),
    },
    {
      title: "Miért szükséges a WordPress weboldalak karbantartása?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A WordPress olyan, mint egy okostelefon: rendszeresen frissíteni
            kell, különben elavul és veszélyes lesz.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Frissítések</strong>: a rendszer, sablonok és bővítmények
              új verziói biztonságosabbá teszik az oldalt.
            </li>
            <li>
              <strong>Biztonság</strong>: ha nem frissíted, könnyen feltörhetik
              az oldalad.
            </li>
            <li>
              <strong>Teljesítmény</strong>: a frissítésekkel az oldal gyakran
              gyorsabb lesz.
            </li>
            <li>
              <strong>Hibák megelőzése</strong>: a régi bővítmények gyakran
              összeakadnak.
            </li>
          </ul>
          <p>
             A karbantartás olyan, mint az autószerviz: ha nem viszed időben,
            előbb-utóbb lerobban.
          </p>
        </div>
      ),
    },
    {
      title: "Miért kerül többe egy egyedileg fejlesztett weboldal, mint egy WordPress oldal?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Az egyedi fejlesztés több munkaidőt és szakértelmet igényel, ezért
            magasabb az ára.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Minden funkciót a nulláról készítünk</strong>, nincs kész
              sablon.
            </li>
            <li>
              <strong>Teljesen személyre szabott</strong>, pontosan az igényeid
              szerint.
            </li>
            <li>
              <strong>Biztonságosabb és gyorsabb</strong>, mivel nincs tele
              felesleges bővítményekkel.
            </li>
            <li>
              <strong>Tartós befektetés</strong>, hosszú távon könnyebben
              bővíthető.
            </li>
          </ul>
          <p>
             Ez olyan, mint az <strong>IKEA bútor</strong> és az{" "}
            <strong>asztalos által készített egyedi bútor</strong> közötti
            különbség.
          </p>
        </div>
      ),
    },
    {
      title: "Mi az a SEO és miért fontos?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A <strong>SEO</strong> (keresőoptimalizálás) segít abban, hogy a
            Google jobban szeresse a weboldalad. Így a keresésekben előrébb
            kerülsz, és több ember talál rád anélkül, hogy fizetned kellene a
            kattintásokért.
          </p>
          <p>
             Röviden: a SEO olyan, mint egy ingyenes reklámtábla a Google-ben.
          </p>
        </div>
      ),
    },
    {
      title: "Mennyibe kerül egy weboldal hosszú távon?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A weboldal nem egyszeri kiadás. Vannak folyamatos költségei is:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Domain díj</strong>: évente fizetendő, néhány ezer–tízezer
              forint.
            </li>
            <li>
              <strong>Tárhely díj</strong>: a szerver fenntartása, általában
              havi vagy éves előfizetés.
            </li>
            <li>
              <strong>Karbantartás</strong>: frissítések, hibajavítások,
              biztonsági mentések.
            </li>
            <li>
              <strong>Fejlesztések</strong>: ha új funkciókra van szükség.
            </li>
          </ul>
          <p>
             Ez olyan, mint egy autó: nem csak a vásárlás számít, hanem a
            benzin, a biztosítás és a szervizelés is.
          </p>
        </div>
      ),
    },
  ];

  // 📈 Marketing
  const marketingItems = [
    {
      title: "Miből állnak a marketing költségek?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A marketing költségei több részből tevődnek össze, nem csak a
            hirdetésekből.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Hirdetési költség</strong>: amit közvetlenül a Google-nek,
              Facebooknak vagy más platformnak fizetsz.
            </li>
            <li>
              <strong>Kampánykezelés</strong>: a szakember vagy ügynökség
              munkadíja, aki kezeli a hirdetéseket.
            </li>
            <li>
              <strong>Tartalomgyártás</strong>: szövegek, képek, videók
              elkészítése.
            </li>
            <li>
              <strong>Eszközök</strong>: e-mail marketing szoftverek, SEO
              eszközök, analitikai programok előfizetése.
            </li>
          </ul>
          <p>
             Vagyis a marketing olyan, mint egy gépezet: nem csak a reklámra
            költünk, hanem a háttérmunkára is.
          </p>
        </div>
      ),
    },
    {
      title: "Mi a különbség a Google Ads és a Facebook hirdetés között?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            A <strong>Google Ads</strong> akkor jelenik meg, amikor valaki épp
            keres valamit. Például ha beírja, hogy „fodrász Budapest”, rögtön
            hirdetéseket lát.
          </p>
          <p>
            A <strong>Facebook hirdetés</strong> inkább érdeklődést kelt. Olyan
            embereket ér el, akik nem biztos, hogy most keresik a szolgáltatást,
            de érdekelheti őket.
          </p>
          <p>
             Röviden: a Google a vásárlás előtti pillanatot célozza, a
            Facebook a figyelemfelkeltést.
          </p>
        </div>
      ),
    },
  ];

  // 🔒 Biztonság
  const securityItems = [
    {
      title: "Miért fontos a weboldal biztonsága?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Egy nem biztonságos weboldalt könnyen feltörhetnek, aminek súlyos
            következményei lehetnek:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Ügyféladatok, jelszavak ellopása.</li>
            <li>Rosszindulatú reklámok, vírusok elhelyezése.</li>
            <li>Az oldalad letiltása a Google-ben.</li>
          </ul>
          <p>
             Egy biztonságos weboldal olyan, mint egy lakat a bolt ajtaján:
            védi a vállalkozásodat és az ügyfelek bizalmát.
          </p>
        </div>
      ),
    },
    {
      title: "Miért kell adatvédelmi nyilatkozat és ÁSZF?",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Ezek jogilag kötelező dokumentumok, de az ügyfelek bizalmát is
            növelik.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Adatvédelmi nyilatkozat (GDPR)</strong>: leírja, mire
              használod a felhasználók adatait.
            </li>
            <li>
              <strong>ÁSZF</strong>: főleg webshopoknál szükséges, szabályozza a
              vásárlás menetét, garanciát, elállást.
            </li>
          </ul>
          <p>
             Ezek nélkül nem csak bírságot kaphatsz, de a látogatók sem fognak
            benned bízni.
          </p>
        </div>
      ),
    },
  ];

  // Segédfüggvény a lenyílókhoz
  const renderSection = (title, items, startIndex) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center text-[#00f7ff] mb-6 drop-shadow-[0_0_10px_#00f7ff]">
        {title}
      </h2>
      <div className="divide-y divide-gray-700">
        {items.map((item, index) => {
          const itemIndex = startIndex + index;
          return (
            <div key={itemIndex}>
              <button
                className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-[#FF007A] hover:text-[#00f7ff] transition"
                onClick={() => toggleItem(itemIndex)}
              >
                <span>{item.title}</span>
                {openIndex === itemIndex ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === itemIndex && (
                <div className="pb-6 pt-2">{item.content}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Layout>
      <Head title={infos.meta_title ?? t("menu.infos", "Infos")} />
      <section className="max-w-6xl mx-auto px-6 py-20">
        {renderSection("Weboldalak", webItems, 0)}
        {renderSection("Marketing", marketingItems, webItems.length)}
        {renderSection(
          "Biztonság",
          securityItems,
          webItems.length + marketingItems.length
        )}
      </section>
    </Layout>
  );
}