<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quote_requests', function (Blueprint $table): void {
            $table->string('menu_items', 100)->nullable()->after('target_audience');
        });
    }

    public function down(): void
    {
        Schema::table('quote_requests', function (Blueprint $table): void {
            $table->dropColumn('menu_items');
        });
    }
};
