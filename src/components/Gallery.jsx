import { Image, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { MEDIA_CONFIG, MEDIA_BASE_URL } from '../config'

export function Gallery(props) {
    const { width } = useThree((state) => state.viewport)

    return (
        <group {...props}>
            <Text fontSize={0.5} position={[0, 4, 0]} color="#c44569" anchorX="center">
                Memories
            </Text>
            <group position={[0, -1, 0]}>
                {MEDIA_CONFIG.photos.map((id, index) => (
                    <Polaroid
                        key={id}
                        url={`${MEDIA_BASE_URL}${id}`}
                        index={index}
                        total={MEDIA_CONFIG.photos.length}
                        width={width}
                    />
                ))}
            </group>
        </group>
    )
}

function Polaroid({ url, index, total, width }) {
    const ref = useRef()
    const [hovered, setHover] = useState(false)

    // Calculate spiral position
    const angle = (index / total) * Math.PI * 6 // 3 full turns
    const radius = 3 + Math.random() * 2 // spread out
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius * 0.5 // flatten depth slightly
    const y = (index / total) * 10 - 5 // vertical spread

    // Random rotation
    const rotX = Math.random() * 0.2
    const rotY = Math.random() * 0.2
    const rotZ = Math.random() * 0.2

    useFrame((state, delta) => {
        if (ref.current) {
            // bobbing motion
            ref.current.position.y = y + Math.sin(state.clock.elapsedTime + index) * 0.1

            // face center if wanted (optional)
            // ref.current.lookAt(0,0,10)

            // hover effect
            if (hovered) {
                ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
            } else {
                ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            }
        }
    })

    return (
        <group
            ref={ref}
            position={[x, y, z]}
            rotation={[rotX, -angle + Math.PI / 2, rotZ]} // Face inward roughly
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Polaroid Frame */}
            <mesh position={[0, 0, -0.01]}>
                <boxGeometry args={[1.2, 1.5, 0.05]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Photo */}
            <Image
                url={url}
                transparent
                scale={[1, 1]}
                position={[0, 0.1, 0.03]}
            />
        </group>
    )
}
