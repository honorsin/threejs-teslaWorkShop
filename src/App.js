import { Suspense, useMemo, useRef } from "react";
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
  DoubleSide,
  TextureLoader,
  WebGLCubeRenderTarget,
} from "three";

extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
};

const Box = (props) => {
  const ref = useRef();
  const texture = useLoader(TextureLoader, "/wood.jpg");
  useFrame(() => {
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref} {...props} castShadow>
      <sphereBufferGeometry args={[1, 100, 100]}/>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

const Background = (props) => {
  const texture = useLoader(TextureLoader, "/autoshop.jpg");
  const {gl} = useThree();
  const formatted = new WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture);

  return <primitive attach="background" object={texture} />;
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

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
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        style={{ background: "black" }}
        camera={{ position: [3, 3, 3] }}
        shadows
      >

        <Orbit />
        <ambientLight intensity={0.2} />

        <Bulb position={[0, 3, 0]} />
        <axesHelper args={[5]} />
        <Suspense fallback={null}>
          <Box position={[0, 1.5, 0]} />
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
