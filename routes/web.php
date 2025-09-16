<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'app');

Route::view('/home', 'app')->name('home');
Route::view('/about-me', 'app')->name('aboutme');
Route::view('/services', 'app')->name('services');
Route::view('/prices', 'app')->name('prices');
Route::view('/references', 'app')->name('references');
Route::view('/studies', 'app')->name('studies');
Route::view('/contact', 'app')->name('contact');
Route::view('/privacy', 'app')->name('privacy');
Route::view('/terms', 'app')->name('terms');
Route::view('/impressum', 'app')->name('impressum');

Route::fallback(fn () => view('app'));
