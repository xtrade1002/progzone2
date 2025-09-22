<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FormController extends Controller
{
    /**
     * Handle the incoming quote request form submission.
     */
    public function storeQuoteRequest(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'service' => ['required', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'timeline' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'privacy' => ['accepted'],
        ]);

        $data['privacy'] = true;

        QuoteRequest::create($data);

        return redirect()
            ->back()
            ->with('success', __('flash_quote_success'));
    }

    /**
     * Handle the incoming contact form submission.
     */
    public function storeContactMessage(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        ContactMessage::create($data);

        return redirect()
            ->back()
            ->with('success', __('flash_contact_success'));
    }
}
