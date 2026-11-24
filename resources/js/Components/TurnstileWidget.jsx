import React, { useEffect, useRef, useState } from 'react';
import useTranslations from '../lib/useTranslations.js';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', resolve, { once: true });
    script.addEventListener('error', reject, { once: true });
    document.head.appendChild(script);
  });
}

export default function TurnstileWidget({ siteKey, onVerify, onExpire, resetKey = 0 }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const callbacks = useRef({ onVerify, onExpire });
  callbacks.current = { onVerify, onExpire };
  const { locale, t } = useTranslations();
  const language = locale?.split(/[-_]/)[0];
  const turnstileLanguage = ['de', 'en', 'hu'].includes(language) ? language : 'auto';

  useEffect(() => {
    if (!siteKey || !containerRef.current) {
      return undefined;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => callbacks.current.onVerify?.(token),
          'expired-callback': () => callbacks.current.onExpire?.(),
          'error-callback': () => {
            setFailed(true);
            callbacks.current.onExpire?.();
          },
          theme: 'dark',
          size: 'normal',
          language: turnstileLanguage,
        });
      })
      .catch(() => {
        setFailed(true);
        callbacks.current.onExpire?.();
      });

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, turnstileLanguage]);

  useEffect(() => {
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
      callbacks.current.onExpire?.();
    }
  }, [resetKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="turnstile-widget flex flex-col items-start gap-2">
      <div className="turnstile-widget__frame" ref={containerRef} />
      {failed && (
        <p className="text-xs text-red-400">
          {t(
            'turnstile.load_failed',
            'Cloudflare verification did not load. Please refresh the page.',
          )}
        </p>
      )}
    </div>
  );
}
