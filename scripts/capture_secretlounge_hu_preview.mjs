import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { request } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';

const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const outputPath = path.resolve('public/img/secretlounge-hu-preview.png');
const userDataDir = path.join(tmpdir(), `secretlounge-hu-capture-${Date.now()}`);
const port = 9227;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function jsonGet(url) {
  return new Promise((resolve, reject) => {
    request(url, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject).end();
  });
}

async function waitForTab() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const tabs = await jsonGet(`http://127.0.0.1:${port}/json`);
      const tab = tabs.find((item) => item.type === 'page' && item.webSocketDebuggerUrl);
      if (tab) {
        return tab;
      }
    } catch {
      await delay(250);
    }
  }

  throw new Error('Chrome DevTools tab was not available.');
}

function createCdpClient(webSocketUrl) {
  const socket = new WebSocket(webSocketUrl);
  let id = 0;
  const callbacks = new Map();

  socket.addEventListener('message', (event) => {
    const payload = JSON.parse(event.data);
    const callback = callbacks.get(payload.id);
    if (!callback) {
      return;
    }

    callbacks.delete(payload.id);
    if (payload.error) {
      callback.reject(new Error(payload.error.message));
    } else {
      callback.resolve(payload.result);
    }
  });

  return {
    ready: new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    }),
    send(method, params = {}) {
      id += 1;
      socket.send(JSON.stringify({ id, method, params }));

      return new Promise((resolve, reject) => {
        callbacks.set(id, { resolve, reject });
      });
    },
    close() {
      socket.close();
    },
  };
}

await mkdir(path.dirname(outputPath), { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  '--window-size=1440,1100',
  'about:blank',
], {
  stdio: 'ignore',
});

try {
  const tab = await waitForTab();
  const cdp = createCdpClient(tab.webSocketDebuggerUrl);
  await cdp.ready;

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      localStorage.setItem('eroticmassage_age_confirmed', 'yes');
      localStorage.setItem('erosmassage.language', 'hu');
      document.cookie = 'erosmassage_language=hu; path=/; max-age=31536000; SameSite=Lax';
    `,
  });
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send('Page.navigate', { url: 'https://secretlounge.hu/hu' });
  await delay(6500);

  const screenshot = await cdp.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
  });
  await writeFile(outputPath, Buffer.from(screenshot.data, 'base64'));
  cdp.close();
} finally {
  chrome.kill('SIGTERM');
}

console.log(outputPath);
