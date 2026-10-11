import { useEffect } from 'react'

// Microsoft Clarity (heatmaps + session recordings). Loads only when VITE_CLARITY_ID is set, and only
// after the page is idle so it never slows the first paint.
const Clarity = () => {
  useEffect(() => {
    const id = import.meta.env.VITE_CLARITY_ID
    if (!id || !/^[a-z0-9]+$/i.test(id) || window.clarity) return
    const load = () => {
      window.clarity =
        window.clarity ||
        function (...args) {
          ;(window.clarity.q = window.clarity.q || []).push(args)
        }
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.clarity.ms/tag/${id}`
      document.head.appendChild(s)
    }
    if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 4000 })
    else setTimeout(load, 2000)
  }, [])
  return null
}

export default Clarity
