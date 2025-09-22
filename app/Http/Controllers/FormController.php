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
            'privacy' => ['accepted'],
        ]);

        $data['privacy'] = true;

        QuoteRequest::create($data);

        $this->mailjet->sendQuoteRequestNotification($data);

        return redirect()
            ->back()
            ->with('success', 'Köszönjük, ajánlatkérésedet rögzítettük!');
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
            ->with('success', 'Üzenetedet sikeresen elküldtük!');
    }
}
