import { AJIO_BASE_URL } from '@/constants'

export function buildAjioUrl(path: string = '', utmParams?: Record<string, string>) {
  const url = new URL(path, AJIO_BASE_URL)
  url.searchParams.set('utm_source', 'azorte_website')
  url.searchParams.set('utm_medium', 'referral')
  url.searchParams.set('utm_campaign', 'azorte_digital_flagship')

  if (utmParams) {
    Object.entries(utmParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  return url.toString()
}
