<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('prices')) {
            return;
        }

        Schema::table('prices', function (Blueprint $table) {
            if (! Schema::hasColumn('prices', 'price_value')) {
                $table->decimal('price_value', 10, 2)->nullable()->after('price_label');
            }

            if (! Schema::hasColumn('prices', 'currency')) {
                $table->string('currency', 10)->nullable()->after('price_value');
            }

            if (! Schema::hasColumn('prices', 'extras')) {
                $table->string('extras')->nullable()->after('currency');
            }

            if (! Schema::hasColumn('prices', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('extras');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('prices')) {
            return;
        }

        Schema::table('prices', function (Blueprint $table) {
            if (Schema::hasColumn('prices', 'is_active')) {
                $table->dropColumn('is_active');
            }

            if (Schema::hasColumn('prices', 'extras')) {
                $table->dropColumn('extras');
            }

            if (Schema::hasColumn('prices', 'currency')) {
                $table->dropColumn('currency');
            }

            if (Schema::hasColumn('prices', 'price_value')) {
                $table->dropColumn('price_value');
            }
        });
    }
};
