import { useProgress } from '@react-three/drei'

export function Loading() {
    const { progress } = useProgress()
    if (progress === 100) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ffdae0] z-50 text-[#c44569] font-bold text-xl">
            Loading Memories... {Math.round(progress)}%
        </div>
    )
}
