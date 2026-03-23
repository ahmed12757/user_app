import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// Auto-update service worker with debugging
registerSW({ 
  immediate: true,
  onRegistered(r) {
    console.log('✅ PWA: Service Worker Registered:', r);
  },
  onRegisterError(error) {
    console.error('❌ PWA: Service Worker Registration Error:', error);
  }
})

// Global Error Catching for Mobile Debugging
window.onerror = function(msg, url, line, col, error) {
  console.error("🚫 App Error:", msg, "at", url, ":", line);
  const errorMsg = document.createElement('div');
  errorMsg.style.cssText = 'position:fixed;top:0;left:0;background:red;color:white;z-index:99999;padding:10px;font-size:12px;width:100%;';
  errorMsg.innerHTML = "Error: " + msg + " at " + line;
  document.body.appendChild(errorMsg);
  return false;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
