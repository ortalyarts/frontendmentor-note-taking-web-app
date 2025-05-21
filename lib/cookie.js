
// If only need to set the color theme

//   export function setThemeCookie(theme) {
//     console.log('Setting theme cookie:', theme);
  
//     // Set cookie
//     document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
  
//     // Optional: update <html> class immediately for smoother UX
//     const root = document.documentElement;
//     root.classList.remove('light', 'dark');
//     if (theme === 'system') {
//       const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       root.classList.add(isDark ? 'dark' : 'light');
//     } else {
//       root.classList.add(theme);
//     }
//   }

// Set font / color theme cookies
export function setPreferencesCookie({ theme, font }) {
    if (theme) {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
    }
    if (font) {
      document.cookie = `font=${font}; path=/; max-age=31536000`;
    }
  
    // Apply theme immediately
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  
    // Apply font immediately
    root.classList.remove('sansSerif', 'serif', 'monospace');
    if (font) {
      root.classList.add(font);
    }
  }