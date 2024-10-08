import Timer from '@/components/Timer'

type TimerData = {
    id: number
    name: string
    duration: number
    timeLeft: number
    isRunning: boolean
}

type TimerListProps = {
    timers: TimerData[]
    updateTimer: (id: number, updates: Partial<{ timeLeft: number; isRunning: boolean }>) => void
    deleteTimer: (id: number) => void
}

export default function TimerList({ timers, updateTimer, deleteTimer }: TimerListProps) {
    return (
        <div className="space-y-4">
            {timers.map((timer) => (
                <Timer
                    key={timer.id}
                    {...timer}
                    updateTimer={updateTimer}
                    deleteTimer={deleteTimer}
                />
            ))}
        </div>
    )
}