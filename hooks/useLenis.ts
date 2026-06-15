'use client'

import { useContext } from 'react'
import { LenisContext } from '@/providers/LenisProvider'

export function useLenis() {
  const context = useContext(LenisContext)
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider')
  }
  return context
}
