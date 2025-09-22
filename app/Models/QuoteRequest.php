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
        'privacy',
    ];

    protected $casts = [
        'privacy' => 'boolean',
    ];
}
