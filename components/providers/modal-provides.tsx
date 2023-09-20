'use client'

import { CreateServerModal } from '@/components/modals/create-server-modal'
import React, { useState, useEffect } from 'react'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CreateServerModal />
    </>
  )
}