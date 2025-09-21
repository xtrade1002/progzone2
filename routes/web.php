<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about-me', fn () => Inertia::render('AboutMe'))->name('aboutme');
Route::get('/services', fn () => Inertia::render('Services'))->name('services');
Route::get('/prices', fn () => Inertia::render('Prices'))->name('prices');
Route::get('/references', fn () => Inertia::render('References'))->name('references');
Route::get('/infos', fn () => Inertia::render('Infos'))->name('infos');
Route::get('/quote', fn () => Inertia::render('QuoteRequest'))->name('quote');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/privacy', fn () => Inertia::render('Privacy'))->name('privacy');
Route::get('/terms', fn () => Inertia::render('Terms'))->name('terms');
Route::get('/impressum', fn () => Inertia::render('Impressum'))->name('impressum');

Route::fallback(fn () => Inertia::render('Home'));