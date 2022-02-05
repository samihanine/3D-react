/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/grass.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh1_Group1_Model.geometry} material={materials.Grass} />
    </group>
  )
}

useGLTF.preload('/models/grass.gltf')