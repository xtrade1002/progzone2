<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('prices')) {
            return;
        }

        $fallbackLocale = config('app.fallback_locale', 'hu');

        if (! Schema::hasColumn('prices', 'locale')) {
            Schema::table('prices', function (Blueprint $table) use ($fallbackLocale) {
                $table->string('locale', 5)->default($fallbackLocale)->after('slug');
            });
        }

        if (Schema::hasColumn('prices', 'locale')) {
            DB::table('prices')
                ->whereNull('locale')
                ->update(['locale' => $fallbackLocale]);
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('prices')) {
            return;
        }

        if (Schema::hasColumn('prices', 'locale')) {
            Schema::table('prices', function (Blueprint $table) {
                $table->dropColumn('locale');
            });
        }
    }
};
