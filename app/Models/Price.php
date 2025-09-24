<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Price extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'locale',
        'domain',
        'title',
        'description',
        'feature_heading',
        'features',
        'price_label',
        'currency',
        'extras',
        'position',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'position' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Scope: Szűrés domain + nyelv szerint.
     * Használat: Price::forDomainAndLocale($domain, $locale)->get();
     */
    public function scopeForDomainAndLocale(Builder $query, ?string $domain, string $locale): Builder
    {
        $isLocalhost = in_array($domain, ['localhost', '127.0.0.1']);

        return $query
            ->when(
                static::hasLocaleColumn(),
                fn (Builder $query) => $query->where(function ($q) use ($locale) {
                    $q->whereNull('locale')->orWhere('locale', $locale);
                })
            )
            ->when(
                !$isLocalhost,
                fn (Builder $query) => $query->where(function ($q) use ($domain) {
                    $q->whereNull('domain')->orWhere('domain', $domain);
                })
            )
            ->where('is_active', 1);
    }

    /**
     * Ellenőrzi, hogy van-e 'locale' oszlop az adatbázisban.
     */
    public static function hasLocaleColumn(): bool
    {
        static $hasLocaleColumn;

        if ($hasLocaleColumn === null) {
            $model = new static();
            $hasLocaleColumn = Schema::hasColumn($model->getTable(), 'locale');
        }

        return $hasLocaleColumn;
    }
}