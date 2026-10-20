  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'

  // Apply saved theme before rendering the application
const savedTheme = localStorage.getItem("theme") || "light";

const resolvedTheme =
  savedTheme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : savedTheme;

document.documentElement.setAttribute("data-theme", resolvedTheme);

// Keep global font size fixed at 115%
document.documentElement.setAttribute("data-font-size", "large");
document.documentElement.style.setProperty("--font-scale", "1.15");
document.documentElement.style.removeProperty("zoom");

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
