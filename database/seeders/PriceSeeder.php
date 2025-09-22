<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entries = [
            // Hungarian
            [
                'slug' => 'wordpress-website',
                'locale' => 'hu',
                'title' => 'Weboldal készítés (WordPress)',
                'description' => "Gyors, költséghatékony és könnyen szerkeszthető megoldás modern dizájnnal és SEO-val.\nAz ár függ például az oldalak számától, a design típusától, a tartalomkezeléstől, a karbantartástól stb.\n\nA projekt fő része fix áras, a plusz igények óradíj szerint (10.000 Ft / óra) kerülnek elszámolásra.",
                'feature_heading' => 'Az ár NEM tartalmazza:',
                'features' => [
                    'Domain név (kb. 3.000 Ft/év)',
                    'Tárhely (kb. 10.000 Ft/év)',
                    'Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft egyszeri vagy éves díj)',
                    'Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)',
                ],
                'price_label' => '150.000 Ft-tól',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'hu',
                'title' => 'Webshop készítés (WooCommerce)',
                'description' => "Professzionális online bolt integrált fizetéssel, szállítással, akciókezeléssel és többnyelvűséggel.\nAz ár függ például a termékek számától, a fizetési és szállítási integrációktól, a design típusától, az automatizáció és karbantartás igényétől stb.\n\nA projekt fő része fix áras, a plusz igények óradíj szerint (10.000 Ft / óra) kerülnek elszámolásra.",
                'feature_heading' => 'Az ár NEM tartalmazza:',
                'features' => [
                    'Domain név (kb. 3.000 Ft/év)',
                    'Tárhely (kb. 10.000 Ft/év)',
                    'Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft egyszeri vagy éves díj)',
                    'Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)',
                ],
                'price_label' => '200.000 Ft-tól',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'hu',
                'title' => 'Egyedileg fejlesztett weboldal',
                'description' => "Speciális funkciókkal, maximális rugalmassággal és bővíthetőséggel.\nAz ár függ például a kért funkciók bonyolultságától, az integrációktól, a rendszer méretétől, a design egyediségétől és a karbantartási igényektől stb.\n\nA projekttől függően lehet fix áras, vagy óradíj szerinti (10.000 Ft / óra) elszámolás.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Fix ár / 10.000 Ft/óra',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'hu',
                'title' => 'Marketing',
                'description' => "Google Ads, Facebook és Instagram kampányok, SEO és tartalomkészítés a bevételeid növeléséhez.\nAz ár a kampányok számától, típusától és bonyolultságától függ.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => '30.000 Ft-tól/hó + hirdetési költség',
                'position' => 4,
            ],

            // German
            [
                'slug' => 'wordpress-website',
                'locale' => 'de',
                'title' => 'WordPress-Webseite',
                'description' => "Schnelle, kostengünstige und leicht zu bearbeitende Lösung mit modernem Design und SEO.\nDer Preis hängt zum Beispiel von der Anzahl der Seiten, dem Design, der Inhaltsverwaltung, der Wartung usw. ab.\n\nDer Hauptteil des Projekts hat einen Festpreis, zusätzliche Wünsche werden nach Stunden abgerechnet (10.000 Ft / Stunde).",
                'feature_heading' => 'Der Preis beinhaltet nicht:',
                'features' => [
                    'Domainname (ca. 3.000 Ft / Jahr)',
                    'Hosting (ca. 10.000 Ft / Jahr)',
                    'Premium-Themes und Plugins (optional, ca. 20.000-50.000 Ft einmalig oder jährlich)',
                    'Individuell entwickelte Funktionen (z. B. Terminbuchung, automatische Rechnungen usw.)',
                ],
                'price_label' => 'Ab 150.000 Ft',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'de',
                'title' => 'WooCommerce-Onlineshop',
                'description' => "Professioneller Onlineshop mit integrierten Zahlungen, Versand, Aktionsverwaltung und Mehrsprachigkeit.\nDer Preis hängt zum Beispiel von der Produktanzahl, den Zahlungs- und Versandintegrationen, dem Design, dem Automatisierungs- und Wartungsaufwand usw. ab.\n\nDer Hauptteil des Projekts hat einen Festpreis, zusätzliche Wünsche werden nach Stunden abgerechnet (10.000 Ft / Stunde).",
                'feature_heading' => 'Der Preis beinhaltet nicht:',
                'features' => [
                    'Domainname (ca. 3.000 Ft / Jahr)',
                    'Hosting (ca. 10.000 Ft / Jahr)',
                    'Premium-Themes und Plugins (optional, ca. 20.000-50.000 Ft einmalig oder jährlich)',
                    'Individuell entwickelte Funktionen (z. B. Terminbuchung, automatische Rechnungen usw.)',
                ],
                'price_label' => 'Ab 200.000 Ft',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'de',
                'title' => 'Individuelle Webentwicklung',
                'description' => "Spezielle Funktionen mit maximaler Flexibilität und Erweiterbarkeit.\nDer Preis richtet sich nach der Komplexität der gewünschten Funktionen, den Integrationen, der Systemgröße, der Individualität des Designs, dem Wartungsbedarf usw.\n\nJe nach Projekt arbeiten wir mit einem Festpreis oder rechnen nach Stunden ab (10.000 Ft / Stunde).",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Festpreis / 10.000 Ft pro Stunde',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'de',
                'title' => 'Online-Marketing',
                'description' => "Google Ads sowie Facebook- und Instagram-Kampagnen, SEO und Content-Erstellung zur Steigerung deiner Umsätze.\nDer Preis richtet sich nach Anzahl, Art und Komplexität der Kampagnen.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Ab 30.000 Ft / Monat + Werbebudget',
                'position' => 4,
            ],

            // English
            [
                'slug' => 'wordpress-website',
                'locale' => 'en',
                'title' => 'WordPress Website',
                'description' => "Fast, cost-effective and easy-to-edit solution with modern design and SEO.\nPricing depends on factors like the number of pages, design style, content management, maintenance, etc.\n\nThe main scope of the project has a fixed price, additional requests are billed at an hourly rate (HUF 10,000 / hour).",
                'feature_heading' => 'The price does not include:',
                'features' => [
                    'Domain name (approx. HUF 3,000 / year)',
                    'Hosting (approx. HUF 10,000 / year)',
                    'Premium themes and plugins (optional, approx. HUF 20,000-50,000 one-off or annual fee)',
                    'Custom-built features (e.g. appointment booking, automated invoicing, etc.)',
                ],
                'price_label' => 'From HUF 150,000',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'en',
                'title' => 'WooCommerce Online Store',
                'description' => "Professional online store with integrated payments, shipping, promotion management and multilingual support.\nPricing depends on factors like the number of products, payment and shipping integrations, design style, automation and maintenance needs, etc.\n\nThe main scope of the project has a fixed price, additional requests are billed at an hourly rate (HUF 10,000 / hour).",
                'feature_heading' => 'The price does not include:',
                'features' => [
                    'Domain name (approx. HUF 3,000 / year)',
                    'Hosting (approx. HUF 10,000 / year)',
                    'Premium themes and plugins (optional, approx. HUF 20,000-50,000 one-off or annual fee)',
                    'Custom-built features (e.g. appointment booking, automated invoicing, etc.)',
                ],
                'price_label' => 'From HUF 200,000',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'en',
                'title' => 'Custom Web Development',
                'description' => "Special functionality with maximum flexibility and scalability.\nPricing depends on the complexity of the requested features, integrations, system size, design uniqueness, maintenance needs, etc.\n\nDepending on the project we can work with a fixed fee or hourly billing (HUF 10,000 / hour).",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Fixed price / HUF 10,000 per hour',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'en',
                'title' => 'Marketing',
                'description' => "Google Ads, Facebook and Instagram campaigns, SEO and content creation to grow your revenue.\nPricing depends on the number, type and complexity of the campaigns.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'From HUF 30,000 / month + ad spend',
                'position' => 4,
            ],
        ];

        foreach ($entries as $entry) {
            Price::updateOrCreate(
                [
                    'slug' => $entry['slug'],
                    'locale' => $entry['locale'],
                    'domain' => $entry['domain'] ?? null,
                ],
                $entry,
            );
        }
    }
}
