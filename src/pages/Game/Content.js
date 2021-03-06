import './Game.scss';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei'
import JSConfetti from 'js-confetti'

import { generateMap, generateBlocks } from 'service/generate';
import Player from 'scene/Player';
import DisplayDecor from 'scene/Decor';
import Background from 'scene/Background';
import { distance, initial_speed } from "constante";

const jsConfetti = new JSConfetti();

let count = 0;
let count_speed = 0;
let date = Date.now();;

function Content(props) {
  const camera = useRef();
  const player = useRef();
  const { state, setState, score, setScore, bestScore, setBestScore, setCoin, speed, setSpeed } = props;
  const [decors, setDecors] = useState(generateMap());
  
  
  const reset = () => {
    setSpeed(initial_speed);
    setDecors(generateMap());
    setScore(0);
    camera.current.position.z = 4;
    player.current.position.z = 2.2;
    player.current.position.x = -1.15;
    camera.current.position.x = -1.15;
    setState(1);
  }
  
  
  const die = () => {
    const audio = new Audio('/audio/crash.mp3')
    audio.volume = 0.3;
    audio.play();
    setState(2);
    if (score > bestScore) {
      setBestScore(score);
      jsConfetti.addConfetti({});

    }
  }

  useEffect(() => {
    if (state == 3) {
      reset();
    }
  }, [state])

  const collision = () => {
    const near_obstacles = [...decors].filter(item => {
      const gap = Math.abs(Math.abs(item.position[2]) - Math.abs(player.current?.position?.z-1));
      return item.obstacle && item.x == player.current?.x && gap < 1.5;
    })
    if (near_obstacles.length) die();
    const near_coin = [...decors].find(item => {
      const gap = Math.abs(Math.abs(item.position[2]) - Math.abs(player.current?.position?.z-1));
      
      return item.coin && item.x == player.current?.x && gap < 1.5;
    });

    if (near_coin) {
      near_coin.position[2] = 100;
      setCoin(old => old + 1);
      setDecors(old => [...old.filter(item => item != near_coin)]);
      new Audio('/audio/coin.mp3').play();
    }
  }

  useFrame(() => {
    if (/*Date.now() > date + 20 &&*/ state == 0) {
      date = Date.now();
      if (player.current) player.current.position.z -= speed;
      if (camera.current) camera.current.position.z -= speed;
      count += speed;
      count = Math.round(count*1000)/1000;
      count_speed += 1;

      collision();

      
      if (count_speed == 10) {
        count_speed = 0;
        if (speed < 2 && speed > 0) setSpeed(old => old + 0.0005)
      }
    }

    if (count > 3 || count + speed > 3) {
      count = count-3;
      
      const numbers_z = decors.map(item => item.position[2]);
      const min_z = Math.min(...numbers_z);
      const max_z = Math.max(...numbers_z);
      const old_decors = [...decors].filter(item => item.position[2] != max_z);

      old_decors.push(...generateBlocks({ z: min_z - 3 }));
      setDecors([...old_decors]);

      setScore(old => old + 1);
    }
  });

  return <>
    <PerspectiveCamera ref={camera} position={[-1.15,4.5,4]} rotation={[-0.64,0,0]} fov={100} makeDefault={true} />

    <Player player={player} state={state} setState={setState} camera={camera} />

    <DisplayDecor decors={decors} />
    <ambientLight intensity={0.0001} />
    <Background camera={camera} speed={speed} />
    <mesh position={[0, 0,(camera?.current?.position?.z || 0)]}>
      <mesh position={[-16.15, 1, 0]}>
        <boxGeometry args={[20, 1, distance * 2 + 10]} />
        <meshStandardMaterial color={'#b8ed87'} />
      </mesh>

      <mesh position={[14.15, 1, 0]}>
        <boxGeometry args={[20, 1, distance * 2 + 10]} />
        <meshStandardMaterial color={'#b8ed87'} />
      </mesh>

      <mesh position={[-1, 1.3, 0]}>
        <boxGeometry args={[10, 0, distance + 50]} />
        <meshStandardMaterial color={'#fff'} />
      </mesh>
    </mesh>


    <Environment preset="sunset" background />
  </>
}

export default Content;