import './Game.scss';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber';
import { VscDebugRestart } from "react-icons/vsc";
import Loader from 'components/Loader';
import { initial_speed } from "constante";
import Content from './Content';

function Game() {
  const canvas = useRef()
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(parseInt(window.localStorage.getItem("best_score") || 0) || 0);
  const [state, setState] = useState(1);
  const [coin, setCoin] = useState(parseInt(window.localStorage.getItem("coin") || 0) || 0);
  const [speed, setSpeed] = useState(initial_speed);

  useEffect(() => {
    window.localStorage.setItem("best_score", bestScore)
  }, [bestScore]);

  useEffect(() => {
    window.localStorage.setItem("coin", coin)
  }, [coin]);
  

  return (
    <>
    <div className="main">
      <div className="head">
        <div className="score">
          <p>{score}</p>
          <p>{bestScore}</p>
        </div>

        <div className="score coin">
          {/*Math.round(speed*100)/100*/}
          {coin}
        </div>
      </div>

      {state == 1 && <div className="center pause">
        Appuyez sur espace pour jouer  
      </div>}

      {state == 2 && <div className="center">
        <p className="die">{bestScore == score ? "Meilleur score battu !" : "Perdu !"}</p>
        <p><VscDebugRestart onClick={() => setState(3)} /></p>
      </div>}
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
          setCoin={setCoin}
          speed={speed}
          setSpeed={setSpeed}
        />
      </Suspense>
    </Canvas>
    </>
  );
}

export default Game;