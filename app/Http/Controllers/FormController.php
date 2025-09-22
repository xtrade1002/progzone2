<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Services\MailjetService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function __construct(private MailjetService $mailjet)
    {
    }

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
            'reference_sites' => ['nullable', 'string'],
            'target_audience' => ['nullable', 'string', 'max:255'],
            'languages' => ['nullable', 'string', 'max:100'],
            'features' => ['nullable', 'string'],
            'content_source' => ['nullable', 'string', 'max:255'],
            'billing_info' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:100'],
            'support' => ['nullable', 'string', 'max:255'],
            'hosting_domain' => ['nullable', 'string', 'max:255'],
            'integrations' => ['nullable', 'string'],
            'marketing' => ['nullable', 'string'],
            'legal' => ['nullable', 'string'],
            'priority' => ['nullable', 'string', 'max:255'],
            'privacy' => ['accepted'],
        ]);

        $data['privacy'] = true;

        QuoteRequest::create($data);

        $this->mailjet->sendQuoteRequestNotification($data);

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

        $this->mailjet->sendContactMessageNotification($data);

        return redirect()
            ->back()
            ->with('success', __('flash_contact_success'));
    }
}
