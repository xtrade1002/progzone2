-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gép: db
-- Létrehozás ideje: 2025. Sze 24. 09:45
-- Kiszolgáló verziója: 8.0.43
-- PHP verzió: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `progzone2`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `phone`, `message`, `created_at`, `updated_at`) VALUES
(1, 'teszt', 'hegedusbetti90@gmail.com', '12345678', 'teszt', '2025-09-22 07:17:34', '2025-09-22 07:17:34');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `prices`
--

CREATE TABLE `prices` (
  `id` int UNSIGNED NOT NULL,
  `domain` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` int UNSIGNED NOT NULL DEFAULT '0',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price_label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_value` decimal(10,2) DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'HUF',
  `extras` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `prices`
--

INSERT INTO `prices` (`id`, `domain`, `position`, `title`, `description`, `price_label`, `price_value`, `currency`, `extras`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'progzone.hu', 1, 'wordpress', NULL, '150.000 Ft-tól', 150000.00, 'Ft', '-tól', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(2, 'progzone.hu', 2, 'woocommerce', NULL, '200.000 Ft-tól', 200000.00, 'Ft', '-tól', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(3, 'progzone.hu', 3, 'egyedifejlesztes', NULL, '100.000 Ft-tól', 100000.00, 'Ft', '-tól', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(4, 'progzone.hu', 4, 'marketing', NULL, '30.000 Ft-tól / hó', 30000.00, 'Ft', '/ hó', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(5, 'progzone.hu', 5, 'arculat', NULL, '100.000 Ft-tól', 100000.00, 'Ft', '-tól', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(6, 'progzone.hu', 6, 'domain', NULL, '3.000 Ft / év', 3000.00, 'Ft', '/ év', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(7, 'progzone.hu', 7, 'hosting', NULL, '10.000 Ft / év', 10000.00, 'Ft', '/ év', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(8, 'progzone.hu', 8, 'plugin', NULL, '20.000 Ft-tól / év', 20000.00, 'Ft', '/ év', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(9, 'progzone.hu', 9, 'extraFunctionsDev', NULL, '10.000 Ft / óra', 10000.00, 'Ft', '/ óra', 1, '2025-09-22 19:00:33', '2025-09-22 19:00:33'),
(46, 'progzone.hu', 1, 'wordpress_website', NULL, '150.000 Ft-tól', 150000.00, 'Ft', '-tól', 1, '2025-09-24 05:54:55', '2025-09-24 05:54:55'),
(47, 'progzone.hu', 2, 'woocommerce', NULL, '200.000 Ft-tól', 200000.00, 'Ft', '-tól', 1, '2025-09-24 05:54:55', '2025-09-24 05:54:55'),
(48, 'progzone.hu', 3, 'custom', NULL, 'Fix ár / 10.000 Ft/óra', 10000.00, 'Ft', '/ óra', 1, '2025-09-24 05:54:55', '2025-09-24 05:54:55'),
(49, 'progzone.hu', 4, 'marketing', NULL, '30.000 Ft-tól/hó + hirdetési költség', 30000.00, 'Ft', '/ hó', 1, '2025-09-24 05:54:55', '2025-09-24 05:54:55'),
(58, 'progzone.de', 1, 'wordpress', NULL, 'ab 800', 800.00, 'EUR', '', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(59, 'progzone.de', 2, 'woocommerce', NULL, 'ab 2999', 2999.00, 'EUR', '', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(60, 'progzone.de', 3, 'egyedifejlesztes', NULL, 'ab 100', 100.00, 'EUR', '/ Std', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(61, 'progzone.de', 4, 'marketing', NULL, 'ab 400', 400.00, 'EUR', '/ Monat', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(62, 'progzone.de', 5, 'arculat', NULL, '', NULL, 'EUR', '', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(63, 'progzone.de', 6, 'domain', NULL, 'ca 10', 10.00, 'EUR', '/ Jahr', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(64, 'progzone.de', 7, 'hosting', NULL, 'ca 30', 30.00, 'EUR', '/ Jahr', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(65, 'progzone.de', 8, 'plugin', NULL, 'ab 40-200', 40.00, 'EUR', '/ Jahr', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(66, 'progzone.de', 9, 'extraFunctionsDev', NULL, '100', 100.00, 'EUR', '/ Std', 1, '2025-09-24 06:07:25', '2025-09-24 06:07:25'),
(67, 'bitbau.ch', 1, 'wordpress', NULL, 'ab 1500', 1500.00, 'CHF', '', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(68, 'bitbau.ch', 2, 'woocommerce', NULL, 'ab 4999', 4999.00, 'CHF', '', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(69, 'bitbau.ch', 3, 'egyedifejlesztes', NULL, 'ab 150', 150.00, 'CHF', '/ Std', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(70, 'bitbau.ch', 4, 'marketing', NULL, 'ab 800', 800.00, 'CHF', '/ Monat', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(71, 'bitbau.ch', 5, 'arculat', NULL, '', NULL, 'CHF', '', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(72, 'bitbau.ch', 6, 'domain', NULL, 'ca 20', 20.00, 'CHF', '/ Jahr', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(73, 'bitbau.ch', 7, 'hosting', NULL, 'ca 50', 50.00, 'CHF', '/ Jahr', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(74, 'bitbau.ch', 8, 'plugin', NULL, 'ab 40-200', 40.00, 'CHF', '/ Jahr', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25'),
(75, 'bitbau.ch', 9, 'extraFunctionsDev', NULL, '150', 150.00, 'CHF', '/ Std', 1, '2025-09-24 06:08:25', '2025-09-24 06:08:25');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `price_extras`
--

CREATE TABLE `price_extras` (
  `id` int UNSIGNED NOT NULL,
  `price_id` int UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `price_label` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- A tábla adatainak kiíratása `price_extras`
--

INSERT INTO `price_extras` (`id`, `price_id`, `label`, `price_label`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'domain_price', '3.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(2, 1, 'hosting_price', '10.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(3, 1, 'plugin_price', '20.000–50.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(4, 1, 'hourly_rate', '10.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(5, 2, 'domain_price', '3.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(6, 2, 'hosting_price', '10.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(7, 2, 'plugin_price', '20.000–50.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(8, 2, 'hourly_rate', '10.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(9, 3, 'hourly_rate', '10.000', 1, '2025-09-24 05:55:12', '2025-09-24 05:55:12'),
(10, 5, 'domain_price', 'ca. 10 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(11, 5, 'hosting_price', 'ca. 30 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(12, 5, 'plugin_price', '40–200 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(13, 5, 'hourly_rate', '100 €/Std.', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(14, 6, 'domain_price', 'ca. 10 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(15, 6, 'hosting_price', 'ca. 30 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(16, 6, 'plugin_price', '40–200 €/Jahr', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(17, 6, 'hourly_rate', '100 €/Std.', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(18, 7, 'hourly_rate', '100 €/Std.', 1, '2025-09-24 05:57:28', '2025-09-24 05:57:28'),
(19, 9, 'domain_price', 'ca. 20 CHF/Jahr', 1, '2025-09-24 05:57:39', '2025-09-24 05:57:39'),
(20, 9, 'hosting_price', 'ca. 50 CHF/Jahr', 1, '2025-09-24 05:57:39', '2025-09-24 05:57:39'),
(21, 9, 'plugin_price', '40–200 CHF/Jahr', 1, '2025-09-24 05:57:39', '2025-09-24 05:57:39'),
(22, 9, 'hourly_rate', '150 CHF/Std.', 1, '2025-09-24 05:57:39', '2025-09-24 05:57:39');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `quote_requests`
--

CREATE TABLE `quote_requests` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_sites` text COLLATE utf8mb4_unicode_ci,
  `target_audience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `languages` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `features` text COLLATE utf8mb4_unicode_ci,
  `content_source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billing_info` text COLLATE utf8mb4_unicode_ci,
  `payment_method` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `support` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hosting_domain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `integrations` text COLLATE utf8mb4_unicode_ci,
  `marketing` text COLLATE utf8mb4_unicode_ci,
  `legal` text COLLATE utf8mb4_unicode_ci,
  `priority` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `privacy` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `quote_requests`
--

INSERT INTO `quote_requests` (`id`, `name`, `email`, `phone`, `company`, `service`, `budget`, `timeline`, `message`, `reference_sites`, `target_audience`, `languages`, `features`, `content_source`, `billing_info`, `payment_method`, `support`, `hosting_domain`, `integrations`, `marketing`, `legal`, `priority`, `privacy`, `created_at`, `updated_at`) VALUES
(1, 'teszt', 'xtrade1002@gmail.com', '1627040899', 'teszt', 'weboldal', '0-200', 'teszt', 'teszt', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-09-22 07:17:05', '2025-09-22 07:17:05'),
(2, 'Teszt', 'teszt@teszt.hu', '01234678', 'xtrade', 'webshop', '200-500', '2025', 'dnbcjkdsbvkjbd', 'jncjkdnvkj', 'cdcjnnk', 'cjkc', 'bjwkbkevk', 'ndvnc', 'teszt', 'cnkjanc', 'teszt', 'teszt', 'teszt', 'teszt', 'teszt', 'teszt', 1, '2025-09-23 16:18:30', '2025-09-23 16:18:30');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `price_extras`
--
ALTER TABLE `price_extras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_price_extras` (`price_id`);

--
-- A tábla indexei `quote_requests`
--
ALTER TABLE `quote_requests`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT a táblához `price_extras`
--
ALTER TABLE `price_extras`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT a táblához `quote_requests`
--
ALTER TABLE `quote_requests`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `price_extras`
--
ALTER TABLE `price_extras`
  ADD CONSTRAINT `fk_price_extras` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
