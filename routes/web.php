<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\LocaleController;
use App\Support\LocalizedRoutes;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

foreach (LocalizedRoutes::PAGE_ROUTES as $name => $localizedRoute) {
    foreach (array_unique($localizedRoute['paths']) as $path) {
        $action = $localizedRoute['controller']
            ?? fn () => Inertia::render($localizedRoute['component']);

        Route::get($path, $action);
    }
}

Route::post('/quote-request', [FormController::class, 'storeQuoteRequest'])->name('quote-request.store');
Route::post('/contact-message', [FormController::class, 'storeContactMessage'])->name('contact-message.store');
Route::post('/locale', [LocaleController::class, 'update'])->name('locale.update');

Route::fallback(fn () => Inertia::render('Home'));
