
import usePersonControls from '../hooks/usePersonControls';
import models from '../models';
import { useEffect } from 'react';
import { center } from "../constante";
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
function Player(props) {
    const ctrl = usePersonControls();
    const { state, setState, player, camera } = props;
  
    useEffect(() => {
      if (player.current && !player.current.x && player.current.x != 0) player.current.x = 2;
      
      if (ctrl.left && player.current.x > 0 && state === 0) {
        player.current.x -= 1;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }
      if (ctrl.right && player.current.x < center.length-1 && state === 0) {
        player.current.x += 1;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }

      if (ctrl.jump) {
        if (state === 0) setState(1);
        else if (state === 1) setState(0);
        else if (state === 2) setState(3);
      } 
    }, [ctrl]);

    useFrame(() => {
      if (player.current) {
        const p = player.current.position;
        const vec = new THREE.Vector3(center[player.current.x],p.y,p.z)
        player.current.position.lerp(vec, 0.2);

        if (camera.current) {
          camera.current.position.x = p.x;
          //camera.current.position.z = p.z + 1;
          //camera.current.position.y = 4.5;
        }
      }
      
    })
  
    return (
      <mesh ref={player} rotation-x={0} position={[-1.15, 1.1, 2.5]}  {...props}>
        {models["race"]}
      </mesh>
    )
}

export default Player;