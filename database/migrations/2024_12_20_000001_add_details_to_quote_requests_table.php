<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->text('reference_sites')->nullable()->after('message');
            $table->string('target_audience')->nullable()->after('reference_sites');
            $table->string('languages', 100)->nullable()->after('target_audience');
            $table->text('features')->nullable()->after('languages');
            $table->string('content_source')->nullable()->after('features');
            $table->text('billing_info')->nullable()->after('content_source');
            $table->string('payment_method', 100)->nullable()->after('billing_info');
            $table->string('support')->nullable()->after('payment_method');
            $table->string('hosting_domain')->nullable()->after('support');
            $table->text('integrations')->nullable()->after('hosting_domain');
            $table->text('marketing')->nullable()->after('integrations');
            $table->text('legal')->nullable()->after('marketing');
            $table->string('priority')->nullable()->after('legal');
        });
    }

    public function down(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->dropColumn([
                'reference_sites',
                'target_audience',
                'languages',
                'features',
                'content_source',
                'billing_info',
                'payment_method',
                'support',
                'hosting_domain',
                'integrations',
                'marketing',
                'legal',
                'priority',
            ]);
        });
    }
};
