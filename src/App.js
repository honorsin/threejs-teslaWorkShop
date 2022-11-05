import { useMemo, Suspense} from "react";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  BufferAttribute,
  TextureLoader,
  Color
} from "three";

import Box from './Box'

import Orbit from './components/Orbit'
import Bulb from './components/Bulb'
import Floor from './components/Floor'
import Background from './components/Background'
import ColorPicker from './components/ColorPicker'




const App = () => {
  const vertices = useMemo(
    () =>
      new BufferAttribute(new Float32Array([0, 0, 0, 0, 1, 1, 0, 1, -1]), 3),
    []
  );

  const indices = useMemo(
    () => new BufferAttribute(new Uint16Array([0, 1, 2]), 1),
    []
  );

 

  return (
    <div style={{ height: "100vh", width: "100vw" }} >
      <ColorPicker />
      <Canvas
        style={{ background: "black" }}
        camera={{ position: [7, 7, 7] }}
        shadows
      >
        <Orbit />
        <ambientLight intensity={0.2} />

        <Bulb position={[0, 3, 0]} />
        <axesHelper args={[5]} />
        <Suspense fallback={null}>
          <Box position={[-4, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Box position={[4, 1, 0]} />
        </Suspense>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
};

export default App;
