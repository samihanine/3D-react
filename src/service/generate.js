import models from '../models';
import { getRandomItem } from '../utils/array';

const trees = [ models["tree1"], models["tree2"] ]
const obstacles = [ models["delivery"], models["tractor"], models["taxi"], models["delivery_flat"] ];

export function generateMap() {
    let array = [];
    for(let i = 9; i>-80; i-= 3) {
      array.push(...generateBlocks({ z: i, start: true }));
    }
    return array;
}

export function generateBlocks(props) {
    const sides = [-16.5,-14.5,-12.5,-10.5,-8.5,-6.5,7,9,11,13,15,17];
    const center = [-5.15,-3.15,-1.15,0.85,2.85];
    const road = [-4,-2,0,2,4].map(item => ({ Model: models["road"], position: [item, 0, props.z] }));
    const grass = [...sides].map(item => ({ Model: models["grass"], position: [item, 1, props.z] }));
  
    let ground = [];
  
    ground.push({ Model: getRandomItem(trees), position: [getRandomItem(sides), 1.5, props.z] });
  
    const digit = props.z.toString()[props.z.toString().length-1];
    if (!props.start && ["1","3","5","2"].includes(digit)) {
      ground.push({ 
        Model: <mesh rotation-y={Math.PI/2}  {...props}>{getRandomItem(obstacles)}</mesh>, 
        position: [getRandomItem(center), 1.1, props.z],
        obstacle: true
      });
    }
  
    ground.push(...road);
    ground.push(...grass);
    return ground;
}