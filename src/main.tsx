import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Security & Privacy Console Sanitizer: Prevents sensitive data, API keys,
// stack traces, or database errors from leaking into DevTools Console area
if (typeof window !== 'undefined') {
  const isSensitive = (args: unknown[]): boolean => {
    try {
      const msg = args
        .map((a) => {
          if (typeof a === 'string') return a;
          if (a instanceof Error) return `${a.name} ${a.message}`;
          return JSON.stringify(a);
        })
        .join(' ');
      return /firebase|firestore|api[_-]?key|token|credential|auth|permission|secret|AIzaSy|password/i.test(
        msg
      );
    } catch {
      return false;
    }
  };

  const origError = console.error;
  const origWarn = console.warn;
  const origLog = console.log;
  const origDebug = console.debug;

  console.error = (...args: unknown[]) => {
    if (isSensitive(args)) return;
    origError.apply(console, args);
  };

  console.warn = (...args: unknown[]) => {
    if (isSensitive(args)) return;
    origWarn.apply(console, args);
  };

  console.debug = (...args: unknown[]) => {
    if (isSensitive(args)) return;
    origDebug.apply(console, args);
  };

  console.log = (...args: unknown[]) => {
    if (isSensitive(args)) return;
    origLog.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
