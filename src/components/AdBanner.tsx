import { useEffect } from 'react'

export default function AdBanner() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('Adsense error:', e)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2027677499153572"  // Replace with your ID
      data-ad-slot="6577277365"           // Replace with your Ad slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

