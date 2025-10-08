<?php

namespace Database\Seeders;

use App\Models\DomainSetting;
use Illuminate\Database\Seeder;

class DomainSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'domain' => null,
                'contact_email' => 'info@progzone.hu',
            ],
            [
                'domain' => 'progzone.hu',
                'contact_email' => 'info@progzone.hu',
            ],
            [
                'domain' => 'progzone.de',
                'contact_email' => 'info@progzone.de',
            ],
            [
                'domain' => 'bitbau.ch',
                'contact_email' => 'info@bitbau.ch',
            ],
        ];

        foreach ($settings as $setting) {
            DomainSetting::query()->updateOrCreate(
                ['domain' => $setting['domain']],
                ['contact_email' => $setting['contact_email']]
            );
        }
    }
}
