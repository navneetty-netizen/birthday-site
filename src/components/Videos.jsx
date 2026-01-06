import { Text } from '@react-three/drei'
import { MEDIA_CONFIG, MEDIA_BASE_URL } from '../config'

export function Videos(props) {
    return (
        <group {...props}>
            <Text fontSize={0.5} position={[0, 2, 0]} color="#c44569" anchorX="center">
                Special Moments
            </Text>

            {/* Using HTML overlay for videos to ensure controls work reliably */}
            {/* In 3D we show placeholders or just rely on HTML overlay in parent */}
            <Text fontSize={0.2} position={[0, 0, 0]} color="#000">
                (Scroll down to see videos)
            </Text>
        </group>
    )
}
