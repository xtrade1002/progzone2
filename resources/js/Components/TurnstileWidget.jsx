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
  const { t } = useTranslations();

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
          callback: (token) => onVerify?.(token),
          'expired-callback': () => onExpire?.(),
          'error-callback': () => {
            setFailed(true);
            onExpire?.();
          },
          theme: 'light',
        });
      })
      .catch(() => {
        setFailed(true);
        onExpire?.();
      });

    return () => {
      cancelled = true;

      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire]);

  useEffect(() => {
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
      onExpire?.();
    }
  }, [resetKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div ref={containerRef} />
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
