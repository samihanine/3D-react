/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/delivery.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0.2, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.lightBack} />
        <mesh geometry={nodes.mesh_0_1.geometry} material={materials.paintGreen} />
        <mesh geometry={nodes.mesh_0_2.geometry} material={nodes.mesh_0_2.material} />
        <mesh geometry={nodes.mesh_0_3.geometry} material={materials.paintWhite} />
        <mesh geometry={nodes.mesh_0_4.geometry} material={nodes.mesh_0_4.material} />
        <mesh geometry={nodes.mesh_0_5.geometry} material={materials.lightFront} />
        <mesh geometry={nodes.mesh_0_6.geometry} material={materials.window} />
      </group>
      <group position={[0, 1.5, 1.48]}>
        <mesh geometry={nodes.mesh_1.geometry} material={nodes.mesh_1.material} />
        <mesh geometry={nodes.mesh_1_1.geometry} material={nodes.mesh_1_1.material} />
      </group>
      <group position={[-0.35, 0.3, 0.61]} scale={[-1, 1, 1]}>
        <mesh geometry={nodes.mesh_2.geometry} material={nodes.mesh_2.material} />
        <mesh geometry={nodes.mesh_2_1.geometry} material={nodes.mesh_2_1.material} />
        <mesh geometry={nodes.mesh_2_2.geometry} material={nodes.mesh_2_2.material} />
      </group>
      <group position={[0.35, 0.3, 0.61]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, 1, 1]}>
        <mesh geometry={nodes.mesh_3.geometry} material={nodes.mesh_3.material} />
        <mesh geometry={nodes.mesh_3_1.geometry} material={nodes.mesh_3_1.material} />
        <mesh geometry={nodes.mesh_3_2.geometry} material={nodes.mesh_3_2.material} />
      </group>
      <group position={[-0.35, 0.3, -1.01]} scale={[-1, 1, 1]}>
        <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
        <mesh geometry={nodes.mesh_4_1.geometry} material={nodes.mesh_4_1.material} />
        <mesh geometry={nodes.mesh_4_2.geometry} material={nodes.mesh_4_2.material} />
      </group>
      <group position={[0.35, 0.3, -1.01]} rotation={[-Math.PI, 0, -Math.PI]} scale={[-1, 1, 1]}>
        <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
        <mesh geometry={nodes.mesh_5_1.geometry} material={nodes.mesh_5_1.material} />
        <mesh geometry={nodes.mesh_5_2.geometry} material={nodes.mesh_5_2.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/delivery.gltf')
