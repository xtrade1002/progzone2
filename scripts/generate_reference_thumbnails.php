<?php

declare(strict_types=1);

$projectRoot = $argv[1] ?? dirname(__DIR__);
$outputRoot = $argv[2] ?? $projectRoot . '/public';
$config = json_decode(file_get_contents(__DIR__ . '/../resources/reference-previews.json'), true, 512, JSON_THROW_ON_ERROR);
$images = [];
$lightboxes = [];

foreach (glob($projectRoot . '/resources/lang/*.json') ?: [] as $file) {
    $translations = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);

    foreach ($translations['references']['projects'] ?? [] as $project) {
        $group = ($project['categoryKey'] ?? null) === 'websites' || ($project['type'] ?? null) === 'link'
            ? 'website'
            : 'gallery';
        $variants = [$project];

        foreach ($project['domainOverrides'] ?? [] as $override) {
            $variants[] = array_replace($project, $override);
        }

        foreach ($variants as $variant) {
            $image = $variant['image'] ?? '';
            $lightbox = $variant['lightboxImage'] ?? $image;
            if (str_starts_with($image, '/img/')) {
                $images[$image] = array_unique([...($images[$image] ?? []), ...$config[$group]['widths']]);
            }
            if (str_starts_with($lightbox, '/img/')) {
                $lightboxes[$lightbox] = true;
            }
        }
    }
}

function writePreview(GdImage $source, string $file, int $width, int $height, int $quality): void
{
    $preview = imagecreatetruecolor($width, $height);
    imagealphablending($preview, false);
    imagesavealpha($preview, true);
    imagecopyresampled($preview, $source, 0, 0, 0, 0, $width, $height, imagesx($source), imagesy($source));

    $directory = dirname($file);
    if (! is_dir($directory)) {
        mkdir($directory, 0775, true);
    }
    if (! imagewebp($preview, $file, $quality) || ! is_file($file) || filesize($file) === 0) {
        throw new RuntimeException("Unable to write {$file}");
    }
    imagedestroy($preview);
}

$count = 0;
foreach (array_unique([...array_keys($images), ...array_keys($lightboxes)]) as $image) {
    $original = $projectRoot . '/public' . $image;
    if (! is_file($original)) {
        fwrite(STDERR, "Missing original: {$image}\n");
        continue;
    }

    $source = imagecreatefromstring(file_get_contents($original));
    if ($source === false) {
        fwrite(STDERR, "Unreadable original: {$image}\n");
        continue;
    }

    $width = imagesx($source);
    $height = imagesy($source);
    $base = $outputRoot . $config['directory'];
    $path = preg_replace('/\.[^.]+$/', '.webp', substr($image, strlen('/img/')));

    foreach ($images[$image] ?? [] as $size) {
        writePreview($source, "{$base}/{$size}/{$path}", $size, max(1, (int) round($height * $size / $width)), 70);
        $count++;
    }

    if (isset($lightboxes[$image])) {
        $scale = min(1, 1600 / max($width, $height));
        writePreview($source, "{$base}/large/{$path}", (int) round($width * $scale), (int) round($height * $scale), 84);
        $count++;
    }

    imagedestroy($source);
}

printf("Generated %d optimized reference images.\n", $count);
