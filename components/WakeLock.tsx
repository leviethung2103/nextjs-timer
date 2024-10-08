'use client'

import { useEffect, useState } from 'react'

export default function WakeLock({ isRunning }: { isRunning: boolean }) {
    const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)

    useEffect(() => {
        const requestWakeLock = async () => {
            if (isRunning && 'wakeLock' in navigator) {
                try {
                    const lock = await navigator.wakeLock.request('screen')
                    setWakeLock(lock)
                } catch (err) {
                    console.error(`Failed to request wake lock: ${err}`)
                }
            }
        }

        requestWakeLock()

        return () => {
            if (wakeLock) {
                wakeLock.release()
                setWakeLock(null)
            }
        }
    }, [isRunning])

    return null
}