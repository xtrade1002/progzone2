<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('locale', 5);
            $table->string('domain')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('feature_heading')->nullable();
            $table->json('features')->nullable();
            $table->string('price_label')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->unique(['slug', 'locale', 'domain']);
            $table->index(['locale', 'domain']);
            $table->index('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
