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
                'description' => "Gyors, költséghatékony és könnyen szerkeszthető megoldás modern dizájnnal és SEO-val.\nAz ár függ például az oldalak számától, a design típusától, a tartalomkezeléstől és a karbantartástól.",
                'feature_heading' => 'Az ár NEM tartalmazza:',
                'features' => [
                    'Domain név (kb. 3.000 Ft/év)',
                    'Tárhely (kb. 10.000 Ft/év)',
                    'Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft)',
                    'Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)',
                ],
                'price_label' => '150.000 Ft-tól',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'hu',
                'title' => 'Webshop készítés (WooCommerce)',
                'description' => "Professzionális online bolt integrált fizetéssel, szállítással, akciókezeléssel és többnyelvűséggel.\nAz ár függ például a termékek számától, a fizetési és szállítási integrációktól, a design típusától és az automatizációs igényektől.",
                'feature_heading' => 'Az ár NEM tartalmazza:',
                'features' => [
                    'Domain név (kb. 3.000 Ft/év)',
                    'Tárhely (kb. 10.000 Ft/év)',
                    'Prémium sablonok és bővítmények (opcionális, kb. 20.000-50.000 Ft)',
                    'Egyedi fejlesztésű funkciók (pl. időpontfoglaló, automatikus számlázás, stb.)',
                ],
                'price_label' => '200.000 Ft-tól',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'hu',
                'title' => 'Egyedileg fejlesztett weboldal',
                'description' => "Speciális funkciókkal, maximális rugalmassággal és bővíthetőséggel.\nA pontos ár függ a kért funkciók bonyolultságától, az integrációktól és a rendszer méretétől.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Fix ár / 10.000 Ft/óra',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'hu',
                'title' => 'Marketing',
                'description' => 'Google Ads, Facebook és Instagram kampányok, SEO és tartalomkészítés a bevételeid növeléséhez.',
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
                'description' => "Schnelle, kosteneffiziente und leicht zu pflegende Lösung mit modernem Design und SEO.\nDer Preis hängt z. B. von der Seitenanzahl, dem Design, der Inhaltsbetreuung und der Wartung ab.",
                'feature_heading' => 'Der Preis beinhaltet nicht:',
                'features' => [
                    'Domain (ca. 10 € / Jahr)',
                    'Hosting (ca. 30 € / Jahr)',
                    'Premium-Themes und Plugins (optional, ca. 50-130 €)',
                    'Individuelle Funktionen (z. B. Terminbuchung, automatische Rechnungen usw.)',
                ],
                'price_label' => 'Ab 400 €',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'de',
                'title' => 'WooCommerce-Onlineshop',
                'description' => "Professioneller Onlineshop mit integrierten Zahlungen, Versand, Angebotsaktionen und Mehrsprachigkeit.\nDer Preis hängt z. B. von der Anzahl der Produkte, den Zahlungs- und Versandintegrationen, dem Design und den Automatisierungen ab.",
                'feature_heading' => 'Der Preis beinhaltet nicht:',
                'features' => [
                    'Domain (ca. 10 € / Jahr)',
                    'Hosting (ca. 30 € / Jahr)',
                    'Premium-Themes und Plugins (optional, ca. 50-130 €)',
                    'Individuelle Funktionen (z. B. Terminbuchung, automatische Rechnungen usw.)',
                ],
                'price_label' => 'Ab 650 €',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'de',
                'title' => 'Individuelle Webentwicklung',
                'description' => "Spezielle Funktionen mit maximaler Flexibilität und Skalierbarkeit.\nDer endgültige Preis richtet sich nach Funktionsumfang, Integrationen und Projektgröße.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Festpreis / 45 € pro Stunde',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'de',
                'title' => 'Online-Marketing',
                'description' => 'Google Ads, Facebook- und Instagram-Kampagnen, SEO und Content-Erstellung für mehr Umsatz.',
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Ab 120 € / Monat + Werbebudget',
                'position' => 4,
            ],

            // English
            [
                'slug' => 'wordpress-website',
                'locale' => 'en',
                'title' => 'WordPress Website',
                'description' => "Fast, budget-friendly and easy to edit solution with modern design and SEO.\nPricing depends on the number of pages, the chosen design, content management and maintenance needs.",
                'feature_heading' => 'The price does not include:',
                'features' => [
                    'Domain name (approx. €10 / year)',
                    'Hosting (approx. €30 / year)',
                    'Premium themes and plugins (optional, approx. €50-130)',
                    'Custom-developed features (e.g. booking systems, automated invoicing, etc.)',
                ],
                'price_label' => 'From €400',
                'position' => 1,
            ],
            [
                'slug' => 'woocommerce-store',
                'locale' => 'en',
                'title' => 'WooCommerce Online Store',
                'description' => "Professional online store with integrated payments, shipping, promotions and multilingual support.\nPricing depends on the number of products, payment and shipping integrations, design complexity and automation needs.",
                'feature_heading' => 'The price does not include:',
                'features' => [
                    'Domain name (approx. €10 / year)',
                    'Hosting (approx. €30 / year)',
                    'Premium themes and plugins (optional, approx. €50-130)',
                    'Custom-developed features (e.g. booking systems, automated invoicing, etc.)',
                ],
                'price_label' => 'From €650',
                'position' => 2,
            ],
            [
                'slug' => 'custom-website',
                'locale' => 'en',
                'title' => 'Custom Web Development',
                'description' => "Special features with maximum flexibility and scalability.\nThe final quote depends on functionality, integrations and the overall project scope.",
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'Fixed price / €45 per hour',
                'position' => 3,
            ],
            [
                'slug' => 'marketing',
                'locale' => 'en',
                'title' => 'Marketing',
                'description' => 'Google Ads, Facebook and Instagram campaigns, SEO and content creation to grow your revenue.',
                'feature_heading' => null,
                'features' => null,
                'price_label' => 'From €120 / month + ad spend',
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
