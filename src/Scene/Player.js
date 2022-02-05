
import usePersonControls from '../hooks/usePersonControls';
import models from '../models';
import { useEffect } from 'react';

function Player(props) {
    const ctrl = usePersonControls();
    const { state, setState, player, camera } = props;
  
    useEffect(() => {
      if (ctrl.left && player.current.position.x > -5.15 && state === 0) {
        player.current.position.x -= 2;
        if (camera.current) camera.current.position.x -= 2;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }
      if (ctrl.right && player.current.position.x < 2.85 && state === 0) {
        player.current.position.x += 2;
        if (camera.current) camera.current.position.x += 2;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }

      
  
      if (ctrl.jump) {
        if (state === 0) setState(1);
        else if (state === 1) setState(0);
        else if (state === 2) setState(3);
      } 
    }, [ctrl]);
  
    return (
      <mesh ref={player} rotation-x={0} position={[-1.15, 1.1, 2.5]}  {...props}>
        {models["race"]}
      </mesh>
    )
}

export default Player;