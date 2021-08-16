// import * as THREE from 'three'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Provider } from 'jotai'
import { Environment, Stage, OrbitControls } from '@react-three/drei'
import MusicBox from './MusicBox'

export default function App() {
  return (
    <Provider>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={['#e7e2dd']} />
        <fog attach="fog" args={['#e7e2dd', 10, 50]} />
        <Suspense fallback={null}>
          <Environment path="/cube" />
          {/* <Stage> will center and light the contents, create ground-shadows, and zoom the camera */}
          <Stage environment={null} intensity={1} contactShadowOpacity={1} shadowBias={-0.0015}>
            <MusicBox />
          </Stage>
        </Suspense>
        <mesh rotation-x={-Math.PI / 2} scale={100}>
          <planeGeometry />
          <meshStandardMaterial color="#e7e2dd" transparent depthWrite={false} />
        </mesh>
        <OrbitControls autoRotate enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 2.8} />
      </Canvas>
      <div id="controls">
        <button id="open" disabled>
          Open Box
        </button>
        <button id="close" disabled>
          Close Box
        </button>
      </div>
    </Provider>
  )
}
