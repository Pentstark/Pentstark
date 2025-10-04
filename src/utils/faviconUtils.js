// Utility function to update the favicon
export const updateFavicon = (useCase) => {
  if (!useCase) {
    // Reset to default favicon
    const favicon = document.getElementById('favicon');
    if (favicon) {
      favicon.href = '/favicon.svg';
    }
    return;
  }

  // Map use case labels to favicon filenames
  const faviconMap = {
    'AI Prompt Leak': 'ai-prompt-leak.ico',
    'Priv. Escalation': 'priv-escalation.ico',
    'XSS/XSRF': 'xss-xsrf.ico',
    'Auth Bypass': 'auth-bypass.ico',
    'Data Exfiltration': 'data-exfiltration.ico',
    'Prompt Injection': 'prompt-injection.ico',
    'Supply Chain Attack': 'supply-chain-attack.ico'
  };

  const favicon = document.getElementById('favicon');
  if (favicon && faviconMap[useCase]) {
    favicon.href = `/favicons/${faviconMap[useCase]}`;
  }
};
