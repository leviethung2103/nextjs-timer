'use client'

import { useState, useEffect } from 'react'
import TimerList from '../components/TimerList'
import NewTimerForm from '../components/NewTimerForm'

export default function Home() {
  const [timers, setTimers] = useState<Array<{ id: number; name: string; duration: number; timeLeft: number; isRunning: boolean }>>([])

  useEffect(() => {
    // Initialize default timers
    const defaultTimers = [
      { id: 1, name: "Workout", duration: 25 * 60, timeLeft: 25 * 60, isRunning: false },
      { id: 2, name: "Relax", duration: 5 * 60, timeLeft: 5 * 60, isRunning: false }
    ]
    setTimers(defaultTimers)
  }, [])

  const addTimer = (name: string, duration: number) => {
    setTimers([...timers, { id: Date.now(), name, duration, timeLeft: duration, isRunning: false }])
  }

  const updateTimer = (id: number, updates: Partial<{ timeLeft: number; isRunning: boolean }>) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, ...updates } : timer
    ))
  }

  const deleteTimer = (id: number) => {
    setTimers(timers.filter(timer => timer.id !== id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Multi-Timer App</h1>
      <NewTimerForm onAddTimer={addTimer} />
      <TimerList timers={timers} updateTimer={updateTimer} deleteTimer={deleteTimer} />
    </main>
  )
}