import './App.scss';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment,  Html, useProgress, PerspectiveCamera } from '@react-three/drei'
import { generateMap, generateBlocks } from './service/generate';
import Player from './Scene/Player';
import DisplayDecor from './Scene/Decor';
import Background from './Scene/Background';

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

let count = 0;
let count_speed = 0;
let date = Date.now();;

function Content(props) {
  const camera = useRef();
  const player = useRef();
  const { state, setState, score, setScore, bestScore, setBestScore } = props;
  const [decors, setDecors] = useState(generateMap());
  const [speed, setSpeed] = useState(0.65);
  

  const reset = () => {
    setSpeed(0.65);
    setDecors(generateMap());
    setScore(0);
    camera.current.position.z = 4;
    player.current.position.z = 2.2;
    player.current.position.x = -1.15;
  }
  
  const die = () => {
    setState(2);
  }

  useFrame(() => {
    
    if (Date.now() > date + 10 && state == 0) {
      date = Date.now();
      if (camera.current) camera.current.position.z -= speed;
      if (player.current) player.current.position.z -= speed;
      count += speed;
      count = Math.round(count*1000)/1000;
      count_speed += 1;

      const near_obstacles = [...decors].filter(item => {
        const gap = Math.abs(Math.abs(item.position[2]) - Math.abs(player.current?.position?.z-1));
        return item.position[0] == player.current?.position?.x && gap < 1.5;
      })
      if (near_obstacles.length) die();
    }

    if (count_speed == 5) {
      count_speed = 0;
      if (speed < 2 && speed > 0) setSpeed(old => old + 0.0004)
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
      if (score >= bestScore) setBestScore(score)
    }
  });

  return <>
    <PerspectiveCamera ref={camera} position={[-1.1, 4.5, 4]} rotation={[-0.64,0,0]} fov={100} makeDefault={true} />

    <Player player={player} state={state} setState={setState} setSpeed={setSpeed} speed={speed} />

    <DisplayDecor decors={decors} />
    <ambientLight intensity={0.0001} />
    <Background camera={camera} speed={speed} />

    <Environment preset="sunset" background />
  </>
}

function App() {
  const canvas = useRef()
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(parseInt(window.localStorage.getItem("best_score") || 0));
  const [state, setState] = useState(1);

  useEffect(() => {
    window.localStorage.setItem("best_score", bestScore)
  }, [bestScore]);

  return (
    <>
    <div className="main">
      
      <div className="score">
        {score}
      </div>

      <div className="score best">
        {bestScore}
      </div>
    </div>

    <Canvas ref={canvas}>
      <Suspense fallback={<Loader />}>
        <Content 
          state={state} 
          setState={setState} 
          score={score} 
          setScore={setScore} 
          bestScore={bestScore}
          setBestScore={setBestScore} 
        />
      </Suspense>
    </Canvas>
    </>
  );
}

export default App;
