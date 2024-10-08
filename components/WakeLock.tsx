'use client'

import { useEffect } from 'react'

export default function WakeLock({ isRunning }: { isRunning: boolean }) {
    useEffect(() => {
        let wakeLock: WakeLockSentinel | null = null;

        const requestWakeLock = async () => {
            if (isRunning && 'wakeLock' in navigator) {
                try {
                    wakeLock = await navigator.wakeLock.request('screen')
                } catch (err) {
                    console.error(`Failed to request wake lock: ${err}`)
                }
            }
        }

        requestWakeLock()

        return () => {
            if (wakeLock) {
                wakeLock.release()
                    .catch(err => console.error(`Failed to release wake lock: ${err}`))
            }
        }
    }, [isRunning])

    return null
}
