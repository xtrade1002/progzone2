<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Services\MailjetService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FormController extends Controller
{
    public function __construct(private MailjetService $mailjet)
    {
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
