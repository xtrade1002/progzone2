<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome')->name('home');
Route::view('/about-me', 'welcome')->name('aboutme');
Route::view('/services', 'welcome')->name('services');
Route::view('/prices', 'welcome')->name('prices');
Route::view('/references', 'welcome')->name('references');
Route::view('/studies', 'welcome')->name('studies');
Route::view('/contact', 'welcome')->name('contact');
Route::view('/privacy', 'welcome')->name('privacy');
Route::view('/terms', 'welcome')->name('terms');
Route::view('/impressum', 'welcome')->name('impressum');

