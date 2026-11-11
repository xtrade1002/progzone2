<?php

namespace App\Support;

class ReferencePreviews
{
    public static function preload(array $page, string $host): ?array
    {
        if (($page['component'] ?? null) !== 'References') {
            return null;
        }

        $props = $page['props'];
        $category = $props['category'] ?? null;
        $projects = $props['trans']['references']['projects'] ?? [];
        if ($category !== null) {
            $projects = array_filter($projects, fn ($project) => ($project['categoryKey'] ?? null) === $category);
        } else {
            $websites = array_filter($projects, fn ($project) => self::isWebsite($project));
            $projects = $websites ?: $projects;
        }

        $project = reset($projects);
        if (! $project) {
            return null;
        }

        $project = array_replace($project, $project['domainOverrides'][$host] ?? []);
        $image = $project['image'] ?? '';
        if (! str_starts_with($image, '/img/')) {
            return null;
        }

        $config = json_decode(file_get_contents(resource_path('reference-previews.json')), true, 512, JSON_THROW_ON_ERROR);
        $group = $config[self::isWebsite($project) ? 'website' : 'gallery'];
        $path = preg_replace('/\.[^.]+$/', '.webp', substr($image, strlen('/img/')));
        $srcset = [];
        foreach ($group['widths'] as $width) {
            $url = "{$config['directory']}/{$width}/{$path}";
            if (! is_file(public_path(ltrim($url, '/')))) {
                return null;
            }
            $srcset[] = "{$url} {$width}w";
        }

        return ['srcset' => implode(', ', $srcset), 'sizes' => $group['sizes']];
    }

    private static function isWebsite(array $project): bool
    {
        return ($project['categoryKey'] ?? null) === 'websites' || ($project['type'] ?? null) === 'link';
    }
}
