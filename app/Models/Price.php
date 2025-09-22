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
            ->when(
                static::hasLocaleColumn(),
                fn (Builder $query) => $query->where('locale', $locale)
            )
            ->where(function (Builder $query) use ($domain) {
                $query->whereNull('domain');

                if ($domain) {
                    $query->orWhere('domain', $domain);
                }
            });
    }

    /**
     * Determine if the prices table contains the locale column.
     */
    protected static function hasLocaleColumn(): bool
    {
        static $hasLocaleColumn;

        if ($hasLocaleColumn === null) {
            $model = new static();

            $hasLocaleColumn = Schema::hasColumn($model->getTable(), 'locale');
        }

        return $hasLocaleColumn;
    }
}
