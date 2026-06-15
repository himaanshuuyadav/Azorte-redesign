'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void, query: string): () => void {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(callback, query),
    () => window.matchMedia(query).matches,
    () => false,
  )
}
