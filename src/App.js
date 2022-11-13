import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'

import ColorPicker from './components/ColorPicker'
import Orbit from './components/Orbit'
import Bulb from './components/Bulb'
import Background from './components/Background'
import Draggable from './components/Draggable'
import Floor from './components/Floor'
import Model from './components/Model'
import BoundingBox from './components/BoundingBox'
import Cars from './components/Cars'
import CameraControls from './components/CameraControls'
import CameraButtons from './components/CameraButtons'
import Box from './Box'
const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ColorPicker />
      <CameraButtons />
      <Canvas
        style={{ background: 'black' }}
        camera={{ position: [7, 7, 7] }}
        shadows
      >
        <CameraControls />
        <Orbit />
        <axesHelper args={[3]} />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[6, 3, 0]}
          intensity={2}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
          shadow-radius={10}
        />
        {/* <fog attach="fog" args={['white', 1, 10]} /> */}
        <Background />
        <Physics>
          <Floor position={[0, -0.5, 0]} />
          <Draggable>
            <Bulb position={[-6, 3, 0]} />
            <Bulb position={[0, 3, 0]} />
            <Bulb position={[6, 3, 0]} />
          </Draggable>
          <Cars />
        </Physics>
      </Canvas>
    </div>
  )
}


export default App