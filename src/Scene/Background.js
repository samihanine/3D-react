import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'

const Background = (props) => {
    const myTexture = useTexture("https://ditto.tv/wp-content/uploads/2020/03/AdobeStock_299834872.jpg");
    //const myTexture = useTexture("/images/sunset.jpg");
    const img = useRef();

    useFrame(() => {
      if (img.current) {
        if (props.camera.current) img.current.position.z = props.camera.current.position.z;
        img.current.rotation.y += 0.0002;
        img.current.rotation.x += 0.0002;
      }
    })
  
    return (
      <mesh ref={img} position={[0, 0, 0]}>
          <sphereGeometry attach="geometry" args={[500, 60, 60]} />
          <meshBasicMaterial
            attach="material"
            map={myTexture}
            side={THREE.DoubleSide}
          />
      </mesh>
    );
}

export default Background;