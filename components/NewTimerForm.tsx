// File: components/NewTimerForm.tsx
import { useState } from 'react'

export default function NewTimerForm({ onAddTimer }: { onAddTimer: (name: string, duration: number) => void }) {
    const [name, setName] = useState('Workout')
    const [hours, setHours] = useState('0')
    const [minutes, setMinutes] = useState('25')
    const [seconds, setSeconds] = useState('0')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0)
        if (name.trim() && totalSeconds > 0) {
            onAddTimer(name.trim(), totalSeconds)
            setName('')
            setHours('')
            setMinutes('')
            setSeconds('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-800 shadow-md rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-4">Add New Timer</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Timer Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="e.g., Work Timer, Break Timer"
                    required
                />
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
                <div className="px-2 w-full sm:w-1/3 mb-4 sm:mb-0">
                    <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
                    <input
                        id="hours"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        min="0"
                    />
                </div>
                <div className="px-2 w-full sm:w-1/3 mb-4 sm:mb-0">
                    <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
                    <input
                        id="minutes"
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        min="0"
                        max="59"
                    />
                </div>
                <div className="px-2 w-full sm:w-1/3">
                    <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
                    <input
                        id="seconds"
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        min="0"
                        max="59"
                    />
                </div>
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Add Timer
            </button>
        </form>
    )
}