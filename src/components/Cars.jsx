import Draggable from '../components/Draggable'
import Model from '../components/Model'
import BoundingBox from '../components/BoundingBox'

export default function Cars({ visibleBoundingBoxes }) {
  return (
    <>
      <Draggable transformGroup>
        <BoundingBox
          position={[4, 4, 0]}
          dims={[3, 2, 6.1]}
          offset={[0, -0.4, 0.75]}
          visible={visibleBoundingBoxes}
        >
          <Model path="/tesla_model_3/scene.gltf" scale={[0.01, 0.01, 0.01]} />
        </BoundingBox>
      </Draggable>
      <Draggable transformGroup>
        <BoundingBox
          position={[-4, 4, 0]}
          dims={[3, 2, 6.8]}
          offset={[0, -0.8, 0.2]}
          visible={visibleBoundingBoxes}
        >
          <Model path="/tesla_model_S/scene.gltf" scale={[0.8, 0.8, 0.8]} />
        </BoundingBox>
      </Draggable>
      <Model
        path="/mech_drone/scene.gltf"
        scale={[6, 6, 6]}
        rotation={[0, Math.PI, 0]}
      />
    </>
  )
}
