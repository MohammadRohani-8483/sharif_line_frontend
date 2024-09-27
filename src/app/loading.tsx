'use client'
import React from 'react'
import LoadingLootie from '@/public/json/Animation - 1722235363617 (1).json'
import dynamic from 'next/dynamic'

const LottieLoader = dynamic(() => import('react-lottie-loader'), { ssr: false, loading: () => <></> })

export default function Loading() {
  return <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}>
    <LottieLoader style={{ width: 350, height: 350 }} animationData={LoadingLootie} />
  </div>
}
