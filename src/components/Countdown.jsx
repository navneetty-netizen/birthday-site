import { Text, Float } from '@react-three/drei'
import { useState, useEffect } from 'react'
import { TARGET_DATE } from '../config'

export function Countdown(props) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const difference = +TARGET_DATE - +new Date()
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
        return timeLeft
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <group {...props}>
            <Text fontSize={0.5} position={[0, 2, 0]} color="#c44569">
                Counting Down to January 11
            </Text>

            <group position={[0, 0, 0]}>
                <Counter value={timeLeft.days} label="Days" position={[-3, 0, 0]} />
                <Counter value={timeLeft.hours} label="Hours" position={[-1, 0, 0]} />
                <Counter value={timeLeft.minutes} label="Minutes" position={[1, 0, 0]} />
                <Counter value={timeLeft.seconds} label="Seconds" position={[3, 0, 0]} />
            </group>
        </group>
    )
}

function Counter({ value, label, position }) {
    return (
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2} position={position}>
            <group>
                <Text fontSize={1} color="#ff6b9d" anchorX="center" anchorY="middle">
                    {String(value).padStart(2, '0')}
                </Text>
                <Text fontSize={0.2} position={[0, -0.8, 0]} color="#000" anchorX="center">
                    {label}
                </Text>
            </group>
        </Float>
    )
}
