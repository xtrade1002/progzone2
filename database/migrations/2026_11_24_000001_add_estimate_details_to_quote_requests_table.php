<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->string('timeline_preference')->nullable();
            $table->string('deadline_reason')->nullable();
            $table->string('existing_site')->nullable();
            $table->string('product_count', 100)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->dropColumn(['timeline_preference', 'deadline_reason', 'existing_site', 'product_count']);
        });
    }
};
