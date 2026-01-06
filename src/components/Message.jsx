import { Text } from '@react-three/drei'

export function Message(props) {
    return (
        <group {...props}>
            {/* 3D Visuals for message section provided by HTML overlay mostly */}
            <Text fontSize={0.5} position={[0, 2, 0]} color="#c44569" anchorX="center">
                Just for You
            </Text>
        </group>
    )
}
