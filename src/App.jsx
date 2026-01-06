import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ScrollControls } from '@react-three/drei'
import Experience from './Experience'
import { Loading } from './components/Loading'

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        style={{ background: '#000000' }} // Fallback
      >
        <color attach="background" args={['#ffdae0']} />
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.3}>
            <Experience />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loading />
    </>
  )
}

export default App
