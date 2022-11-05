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
  Color
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
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const scaleUp = (mesh) => mesh.scale.set(1.5, 1.5, 1.5)

  const scaleDown = (mesh) => mesh.scale.set(1, 1, 1)

  const handlePointerDown = (e) => {
    if (window.activeMesh) {
      window.activeMesh.active = false
      scaleDown(window.activeMesh)
    }

    e.object.active = true
    scaleUp(e.object)
    window.activeMesh = e.object
  }

  const handlePointerEnter = (e) => e.object.active || scaleUp(e.object)

  const handlePointerLeave = (e) => e.object.active || scaleDown(e.object)
   
 
  return (
    <mesh ref={ref} {...props} 
    castShadow 
    onPointerDown={handlePointerDown}
    onPointerEnter={handlePointerEnter}
    onPointerLeave={handlePointerLeave}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

const Background = (props) => {
  const texture = useLoader(TextureLoader, "/autoshop.jpg");
  const { gl } = useThree();
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

  const handleClick = e => {
    if (!window.activeMesh) return
    console.log(e)

    window.activeMesh.material.color = new Color(e.target.style.backgroundColor)
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }} >
      <div style={{position: 'absolute', zIndex: 1}} >
        <div style={{backgroundColor: 'blue', height: 50, width: 50}} onClick={handleClick}>
        </div>
        <div style={{backgroundColor: 'red', height: 50, width: 50}} onClick={handleClick}>
        </div>
        <div style={{backgroundColor: 'black', height: 50, width: 50}} onClick={handleClick}>
        </div>
      </div>
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
