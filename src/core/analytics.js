function getUTMParams () {
  const searchParams = new URLSearchParams(window.location.search)

  return {
    utm_source: searchParams.get('utm_source') || 'direct',
    utm_medium: searchParams.get('utm_medium') || 'none',
    utm_campaign: searchParams.get('utm_campaign') || 'none'
  }
}

function getReferrer () {
  if (!document.referrer) {
    return {
      referrer: 'none',
      referrer_host: 'none'
    }
  }

  try {
    const url = new URL(document.referrer)
    return {
      referrer: document.referrer,
      referrer_host: url.hostname
    }
  } catch {
    return {
      referrer: document.referrer,
      referrer_host: 'invalid'
    }
  }
}

function getBaseContext () {
  return {
    path: window.location.pathname,
    hash: window.location.hash ? 'present' : 'empty',
    language_ui: document.documentElement.lang || 'unknown',
    ...getUTMParams(),
    ...getReferrer()
  }
}

export function trackEvent (event, metadata = {}) {
  if (typeof window === 'undefined' || typeof window.sa_event !== 'function') return

  window.sa_event(event, {
    ...getBaseContext(),
    ...metadata
  })
}

export function trackVisitStart (metadata = {}) {
  if (typeof window === 'undefined') return

  trackEvent('visit_start', {
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    ...metadata
  })
}
