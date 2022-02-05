
import usePersonControls from '../hooks/usePersonControls';
import models from '../models';
import { useEffect } from 'react';

function Player(props) {
    const ctrl = usePersonControls();
    const { state, setState, player } = props;
  
    useEffect(() => {
      if (ctrl.left && player.current.position.x > -5.15 && state === 0) {
        player.current.position.x -= 2;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }
      if (ctrl.right && player.current.position.x < 2.85 && state === 0) {
        player.current.position.x += 2;
        player.current.position.x = Math.round(player.current.position.x*100)/100
      }
  
      if (ctrl.jump && state !== 2) setState(state === 0 ? 1 : 0);
    }, [ctrl]);
  
    return (
      <mesh ref={player} rotation-x={0} position={[-1.15, 1.1, 2.5]}  {...props}>
        {models["race"]}
      </mesh>
    )
}

export default Player;