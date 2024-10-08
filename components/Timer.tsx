import { useEffect, useState } from 'react'
import WakeLock from './WakeLock'

type TimerProps = {
    id: number
    name: string
    duration: number
    timeLeft: number
    isRunning: boolean
    updateTimer: (id: number, updates: Partial<{ timeLeft: number; isRunning: boolean }>) => void
    deleteTimer: (id: number) => void
}

export default function Timer({ id, name, duration, timeLeft, isRunning, updateTimer, deleteTimer }: TimerProps) {
    const [showFirework, setShowFirework] = useState(false)

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                updateTimer(id, { timeLeft: timeLeft - 1 })
            }, 1000)
        } else if (timeLeft === 0) {
            updateTimer(id, { isRunning: false })
            setShowFirework(true)
            setTimeout(() => setShowFirework(false), 5000) // Hide firework after 3 seconds
        }

        return () => clearInterval(interval)
    }, [isRunning, timeLeft, id, updateTimer])

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleStart = () => updateTimer(id, { isRunning: true })
    const handleStop = () => updateTimer(id, { isRunning: false })
    const handleReset = () => {
        updateTimer(id, { timeLeft: duration, isRunning: false })
        setShowFirework(false)
    }

    return (
        <div className="border p-4 rounded-lg shadow-md w-full max-w-sm relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>
            <div className="flex justify-between">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleStart}
                    disabled={isRunning || timeLeft === 0}
                >
                    Start
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleStop}
                    disabled={!isRunning}
                >
                    Stop
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleReset}
                >
                    Reset
                </button>
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={() => deleteTimer(id)}
                >
                    Delete
                </button>
            </div>
            <WakeLock isRunning={isRunning} />
        </div>
    )
}