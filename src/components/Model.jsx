import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE  from 'three'

export default function Model({ path, ...props }) {
  const model = useLoader(GLTFLoader, path)

  model.scene.traverse(child => {
    if (child.isMesh) {
        child.caseShadow = true;
        child.receiveShadow = true;
        child.material.side = THREE.FrontSide
    }
  })
  return <primitive {...props} object={model.scene} />
}
