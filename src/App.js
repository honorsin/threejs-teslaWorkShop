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
import Box from './Box'
const App = () => {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ColorPicker />
      <Canvas
        style={{ background: 'black' }}
        camera={{ position: [7, 7, 7] }}
        shadows
      >
        <Orbit />
        <axesHelper args={[3]} />
        <ambientLight intensity={0.2} />
        {/* <fog attach="fog" args={['white', 1, 10]} /> */}
        <Background />
        <Physics>
          <Floor position={[0, -0.5, 0]} />
          <Draggable>
            <Bulb position={[0, 3, 0]} />
          </Draggable>
          <Cars />
        </Physics>
      </Canvas>
    </div>
  )
}

export default App