import { Text, Float } from '@react-three/drei'

export function Hero() {
    return (
        <group position={[0, 0, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    fontSize={1.5}
                    color="#ff6b9d"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, 1, 0]}
                >
                    Happy Birthday
                    <meshStandardMaterial emissive="#ff6b9d" emissiveIntensity={0.2} toneMapped={false} />
                </Text>
                <Text
                    fontSize={0.5}
                    color="#c44569"
                    anchorX="center"
                    anchorY="middle"
                    position={[0, -0.5, 0]}
                >
                    A Special Day for Someone Special
                </Text>
            </Float>

            <Text
                fontSize={0.2}
                position={[0, -3, 0]}
                color="#000000"
                anchorX="center"
                anchorY="bottom"
            >
                Scroll to explore ↓
            </Text>
        </group>
    )
}
