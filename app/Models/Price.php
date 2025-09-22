<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        'position',
    ];

    protected $casts = [
        'features' => 'array',
        'position' => 'integer',
    ];

    /**
     * Scope a query to only include entries for the given domain and locale.
     */
    public function scopeForDomainAndLocale(Builder $query, ?string $domain, string $locale): Builder
    {
        return $query
            ->where('locale', $locale)
            ->where(function (Builder $query) use ($domain) {
                $query->whereNull('domain');

                if ($domain) {
                    $query->orWhere('domain', $domain);
                }
            });
    }
}
