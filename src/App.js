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
import Lights from './components/Lights'
import PhysicalFloor  from './components/PhysicalFloor'
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
        <Lights />
        {/* <fog attach="fog" args={['white', 1, 10]} /> */}
        <Background />
        <Physics>
          <PhysicalFloor position={[0, -0.5, 0]} />
          <Cars />
        </Physics>
      </Canvas>
    </div>
  )
}



export default App