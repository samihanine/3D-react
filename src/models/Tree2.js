/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/tree2.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh1_Group1_Model_1.geometry} material={materials.Alternate_Dirt} />
      <mesh geometry={nodes.Mesh1_Group1_Model_1_1.geometry} material={materials.Grass} />
    </group>
  )
}

useGLTF.preload('/models/tree2.gltf')
