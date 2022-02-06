import models from '../models';
import { getRandomItem } from '../utils/array';
import { distance } from '../constante';
import { Sphere } from '@react-three/drei';
const trees = [ models["tree1"], models["tree2"] ]
const obstacles = [ models["delivery"], models["tractor"], models["taxi"], models["delivery_flat"] ];

export function generateMap() {
    let array = [];
    for(let i = 9; i>-distance; i-= 3) {
      array.push(...generateBlocks({ z: i, start: true }));
    }
    return array;
}

export function generateBlocks(props) {
    const sides = [-20,-18,-16.5,-14.5,-12.5,-10.5,-8.5,-6.5,7,9,11,13,15,17, 18.5, 20];
    const center = [-5.15,-3.15,-1.15,0.85,2.85];
    const road = [-4,-2,0,2,4].map(item => ({ Model: models["road"], position: [item, 0, props.z] }));
  
    let ground = [];
  
    ground.push({ Model: getRandomItem(trees), position: [getRandomItem(sides), 1.35, props.z] });
  
    const digit = props.z.toString()[props.z.toString().length-1];
    if (!props.start && ["1","5","2"].includes(digit)) {
      ground.push({ 
        Model: <mesh rotation-y={Math.PI/2}  {...props}>{getRandomItem(obstacles)}</mesh>, 
        position: [getRandomItem(center), 1.2, props.z],
        obstacle: true
      });
    } else if (!props.start && ["3"].includes(digit)) {
        
        ground.push({ 
            Model: <mesh position={[0,0,0]} rotation-z={Math.PI/2} rotation-x={Math.PI/2}>
                {models["cheese"]}
            </mesh>, 
            position: [getRandomItem(center), 2, props.z],
            coin: true
        });
        
    }
  
    ground.push(...road);
    return ground;
}