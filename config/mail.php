<?php

$normalizeMailScheme = static function (...$values): ?string {
    foreach ($values as $value) {
        if (! is_string($value) || trim($value) === '') {
            continue;
        }

        $scheme = strtolower(trim($value));

        return match ($scheme) {
            'ssl', 'smtps' => 'smtps',
            'tls', 'starttls', 'smtp' => 'smtp',
            default => $scheme,
        };
    }

    return null;
};

return [

    /*
    |--------------------------------------------------------------------------
    | Default Mailer
    |--------------------------------------------------------------------------
    |
    | This option controls the default mailer that is used to send all email
    | messages unless another mailer is explicitly specified when sending
    | the message. All additional mailers can be configured within the
    | "mailers" array. Examples of each type of mailer are provided.
    |
    */

    'default' => env('MAIL_MAILER', 'log'),

    /*
    |--------------------------------------------------------------------------
    | Mailer Configurations
    |--------------------------------------------------------------------------
    |
    | Here you may configure all of the mailers used by your application plus
    | their respective settings. Several examples have been configured for
    | you and you are free to add your own as your application requires.
    |
    | Laravel supports a variety of mail "transport" drivers that can be used
    | when delivering an email. You may specify which one you're using for
    | your mailers below. You may also add additional mailers if needed.
    |
    | Supported: "smtp", "sendmail", "mailgun", "ses", "ses-v2",
    |            "postmark", "resend", "log", "array",
    |            "failover", "roundrobin"
    |
    */

    'mailers' => [

        'smtp' => [
            'transport' => 'smtp',
            'scheme' => $normalizeMailScheme(env('MAIL_SCHEME'), env('MAIL_ENCRYPTION')),
            'url' => env('MAIL_URL'),
            'host' => env('MAIL_HOST', '127.0.0.1'),
            'port' => env('MAIL_PORT', 2525),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => null,
            'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
        ],

        'mailjet' => [
            'transport' => 'smtp',
            'scheme' => $normalizeMailScheme(env('MAILJET_SCHEME'), env('MAIL_SCHEME'), env('MAIL_ENCRYPTION')),
            'url' => env('MAILJET_URL', env('MAIL_URL')),
            'host' => env('MAILJET_HOST', 'in-v3.mailjet.com'),
            'port' => env('MAILJET_PORT', 587),
            'username' => env('MAILJET_USERNAME', env('MAIL_USERNAME')),
            'password' => env('MAILJET_PASSWORD', env('MAIL_PASSWORD')),
            'timeout' => env('MAILJET_TIMEOUT'),
            'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST)),
        ],

        'progzone_de' => [
            'transport' => 'smtp',
            'scheme' => $normalizeMailScheme(env('MAIL_SCHEME_PROGZONE_DE'), env('MAIL_SCHEME'), env('MAIL_ENCRYPTION')),
            'url' => env('MAIL_URL_PROGZONE_DE', env('MAIL_URL')),
            'host' => env('MAIL_HOST_PROGZONE_DE', env('MAIL_HOST', '127.0.0.1')),
            'port' => env('MAIL_PORT_PROGZONE_DE', env('MAIL_PORT', 2525)),
            'username' => env('MAIL_USERNAME_PROGZONE_DE', env('MAIL_USERNAME')),
            'password' => env('MAIL_PASSWORD_PROGZONE_DE', env('MAIL_PASSWORD')),
            'timeout' => env('MAIL_TIMEOUT_PROGZONE_DE'),
            'local_domain' => env('MAIL_EHLO_DOMAIN_PROGZONE_DE', env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST))),
        ],

        'progzone_hu' => [
            'transport' => 'smtp',
            'scheme' => $normalizeMailScheme(env('MAIL_SCHEME_PROGZONE_HU'), env('MAIL_SCHEME'), env('MAIL_ENCRYPTION')),
            'url' => env('MAIL_URL_PROGZONE_HU', env('MAIL_URL')),
            'host' => env('MAIL_HOST_PROGZONE_HU', env('MAIL_HOST', '127.0.0.1')),
            'port' => env('MAIL_PORT_PROGZONE_HU', env('MAIL_PORT', 2525)),
            'username' => env('MAIL_USERNAME_PROGZONE_HU', env('MAIL_USERNAME')),
            'password' => env('MAIL_PASSWORD_PROGZONE_HU', env('MAIL_PASSWORD')),
            'timeout' => env('MAIL_TIMEOUT_PROGZONE_HU'),
            'local_domain' => env('MAIL_EHLO_DOMAIN_PROGZONE_HU', env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST))),
        ],

        'bitbau_ch' => [
            'transport' => 'smtp',
            'scheme' => $normalizeMailScheme(env('MAIL_SCHEME_BITBAU_CH'), env('MAIL_SCHEME'), env('MAIL_ENCRYPTION')),
            'url' => env('MAIL_URL_BITBAU_CH', env('MAIL_URL')),
            'host' => env('MAIL_HOST_BITBAU_CH', env('MAIL_HOST', '127.0.0.1')),
            'port' => env('MAIL_PORT_BITBAU_CH', env('MAIL_PORT', 2525)),
            'username' => env('MAIL_USERNAME_BITBAU_CH', env('MAIL_USERNAME')),
            'password' => env('MAIL_PASSWORD_BITBAU_CH', env('MAIL_PASSWORD')),
            'timeout' => env('MAIL_TIMEOUT_BITBAU_CH'),
            'local_domain' => env('MAIL_EHLO_DOMAIN_BITBAU_CH', env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'http://localhost'), PHP_URL_HOST))),
        ],

        'ses' => [
            'transport' => 'ses',
        ],

        'postmark' => [
            'transport' => 'postmark',
            // 'message_stream_id' => env('POSTMARK_MESSAGE_STREAM_ID'),
            // 'client' => [
            //     'timeout' => 5,
            // ],
        ],

        'resend' => [
            'transport' => 'resend',
        ],

        'sendmail' => [
            'transport' => 'sendmail',
            'path' => env('MAIL_SENDMAIL_PATH', '/usr/sbin/sendmail -bs -i'),
        ],

        'log' => [
            'transport' => 'log',
            'channel' => env('MAIL_LOG_CHANNEL'),
        ],

        'array' => [
            'transport' => 'array',
        ],

        'failover' => [
            'transport' => 'failover',
            'mailers' => [
                'smtp',
                'log',
            ],
            'retry_after' => 60,
        ],

        'roundrobin' => [
            'transport' => 'roundrobin',
            'mailers' => [
                'ses',
                'postmark',
            ],
            'retry_after' => 60,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Global "From" Address
    |--------------------------------------------------------------------------
    |
    | You may wish for all emails sent by your application to be sent from
    | the same address. Here you may specify a name and address that is
    | used globally for all emails that are sent by your application.
    |
    */

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
        'name' => env('MAIL_FROM_NAME', 'Example'),
    ],

    'domain_mailers' => [
        'progzone.de' => [
            'mailer' => env('MAIL_MAILER_PROGZONE_DE', 'progzone_de'),
            'recipient' => env('MAIL_RECIPIENT_PROGZONE_DE', 'info@progzone.de'),
            'from' => [
                'address' => env('MAIL_FROM_ADDRESS_PROGZONE_DE', env('MAIL_FROM_ADDRESS', 'info@progzone.de')),
                'name' => env('MAIL_FROM_NAME_PROGZONE_DE', env('MAIL_FROM_NAME', 'Progzone')),
            ],
        ],
        'progzone.hu' => [
            'mailer' => env('MAIL_MAILER_PROGZONE_HU', 'progzone_hu'),
            'recipient' => env('MAIL_RECIPIENT_PROGZONE_HU', 'info@progzone.hu'),
            'from' => [
                'address' => env('MAIL_FROM_ADDRESS_PROGZONE_HU', env('MAIL_FROM_ADDRESS', 'info@progzone.hu')),
                'name' => env('MAIL_FROM_NAME_PROGZONE_HU', env('MAIL_FROM_NAME', 'Progzone')),
            ],
        ],
        'bitbau.ch' => [
            'mailer' => env('MAIL_MAILER_BITBAU_CH', 'bitbau_ch'),
            'recipient' => env('MAIL_RECIPIENT_BITBAU_CH', 'info@bitbau.ch'),
            'from' => [
                'address' => env('MAIL_FROM_ADDRESS_BITBAU_CH', env('MAIL_FROM_ADDRESS', 'info@bitbau.ch')),
                'name' => env('MAIL_FROM_NAME_BITBAU_CH', env('MAIL_FROM_NAME', 'Bitbau')),
            ],
        ],
    ],

    'default_domain_mailer' => [
        'domain' => env('MAIL_DEFAULT_DOMAIN', 'progzone.de'),
        'recipient' => env('MAIL_RECIPIENT_DEFAULT', 'info@progzone.de'),
        'mailer' => env('MAIL_MAILER_DEFAULT', env('MAIL_MAILER', 'smtp')),
        'from' => [
            'address' => env('MAIL_FROM_ADDRESS_DEFAULT', env('MAIL_FROM_ADDRESS', 'info@progzone.de')),
            'name' => env('MAIL_FROM_NAME_DEFAULT', env('MAIL_FROM_NAME', 'Progzone')),
        ],
    ],

];
