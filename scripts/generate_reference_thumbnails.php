<?php

declare(strict_types=1);

$projectRoot = dirname(__DIR__);
$languageFiles = glob($projectRoot . '/resources/lang/*.json') ?: [];
$images = [];

foreach ($languageFiles as $languageFile) {
    $translations = json_decode((string) file_get_contents($languageFile), true);
    $projects = $translations['references']['projects'] ?? [];

    if (! is_array($projects)) {
        continue;
    }

    foreach ($projects as $project) {
        $image = is_array($project) ? ($project['image'] ?? null) : null;

        if (is_string($image) && str_starts_with($image, '/img/')) {
            $images[$image] = true;
        }
    }
}

if (! function_exists('imagewebp')) {
    fwrite(STDERR, "The PHP GD WebP extension is required.\n");
    exit(1);
}

$generated = 0;
$sourceBytes = 0;
$thumbnailBytes = 0;

foreach (array_keys($images) as $publicPath) {
    $relativePath = substr($publicPath, strlen('/img/'));
    $sourcePath = $projectRoot . '/public/img/' . $relativePath;
    $thumbnailRelativePath = preg_replace('/\.[^.]+$/', '.webp', $relativePath);
    $thumbnailPath = $projectRoot . '/public/img/reference-thumbs/' . $thumbnailRelativePath;

    if (! is_file($sourcePath) || ! is_string($thumbnailRelativePath)) {
        fwrite(STDERR, "Skipped missing image: {$publicPath}\n");
        continue;
    }

    $imageInfo = getimagesize($sourcePath);

    if ($imageInfo === false) {
        fwrite(STDERR, "Skipped unreadable image: {$publicPath}\n");
        continue;
    }

    [$sourceWidth, $sourceHeight, $imageType] = $imageInfo;
    $source = match ($imageType) {
        IMAGETYPE_JPEG => imagecreatefromjpeg($sourcePath),
        IMAGETYPE_PNG => imagecreatefrompng($sourcePath),
        IMAGETYPE_WEBP => imagecreatefromwebp($sourcePath),
        default => false,
    };

    if ($source === false) {
        fwrite(STDERR, "Skipped unsupported image: {$publicPath}\n");
        continue;
    }

    $scale = min(1, 960 / $sourceWidth, 720 / $sourceHeight);
    $targetWidth = max(1, (int) round($sourceWidth * $scale));
    $targetHeight = max(1, (int) round($sourceHeight * $scale));
    $thumbnail = imagecreatetruecolor($targetWidth, $targetHeight);

    imagealphablending($thumbnail, false);
    imagesavealpha($thumbnail, true);
    $transparent = imagecolorallocatealpha($thumbnail, 0, 0, 0, 127);
    imagefilledrectangle($thumbnail, 0, 0, $targetWidth, $targetHeight, $transparent);
    imagecopyresampled(
        $thumbnail,
        $source,
        0,
        0,
        0,
        0,
        $targetWidth,
        $targetHeight,
        $sourceWidth,
        $sourceHeight
    );

    if (! is_dir(dirname($thumbnailPath))) {
        mkdir(dirname($thumbnailPath), 0775, true);
    }

    imagewebp($thumbnail, $thumbnailPath, 72);
    imagedestroy($thumbnail);
    imagedestroy($source);

    $generated++;
    $sourceBytes += filesize($sourcePath) ?: 0;
    $thumbnailBytes += filesize($thumbnailPath) ?: 0;
}

printf(
    "Generated %d thumbnails: %.2f MB -> %.2f MB\n",
    $generated,
    $sourceBytes / 1024 / 1024,
    $thumbnailBytes / 1024 / 1024
);
