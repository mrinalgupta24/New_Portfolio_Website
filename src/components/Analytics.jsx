import { useEffect } from 'react'

// Third-party analytics load only when their ID is set, and only once the page is idle,
// so they never slow down the first paint.
// Skip on localhost: analytics should only count real visitors (and Cloudflare rejects localhost).
const isLocal = () => /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)

const whenIdle = (fn) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : setTimeout(fn, 2000)

const addScript = (src, attrs = {}) => {
  const s = document.createElement('script')
  s.async = true
  s.defer = true
  s.src = src
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v))
  document.head.appendChild(s)
}

/** Microsoft Clarity: heatmaps and session recordings. */
export const Clarity = () => {
  useEffect(() => {
    const id = import.meta.env.VITE_CLARITY_ID
    if (isLocal() || !id || !/^[a-z0-9]+$/i.test(id) || window.clarity) return
    whenIdle(() => {
      window.clarity =
        window.clarity ||
        function (...args) {
          ;(window.clarity.q = window.clarity.q || []).push(args)
        }
      addScript(`https://www.clarity.ms/tag/${id}`)
    })
  }, [])
  return null
}

/** Cloudflare Web Analytics: visitors, countries, pages, referrers. Cookieless. */
export const CloudflareAnalytics = () => {
  useEffect(() => {
    const token = import.meta.env.VITE_CF_BEACON_TOKEN
    if (isLocal() || !token || !/^[a-f0-9]{32}$/i.test(token) || document.querySelector('script[data-cf-beacon]')) return
    whenIdle(() =>
      addScript('https://static.cloudflareinsights.com/beacon.min.js', { 'data-cf-beacon': JSON.stringify({ token }) })
    )
  }, [])
  return null
}
