<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service',
        'budget',
        'timeline',
        'message',
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
        'privacy',
    ];

    protected $casts = [
        'privacy' => 'boolean',
    ];
}
