import { Link } from 'react-router-dom';
import './Home.scss';
import { Canvas } from '@react-three/fiber';
import { useState, useRef, useEffect } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    function Box(props) {
        const ref = useRef()

        useFrame(() => {
            let p = ref.current.position;
            //p.x += 0.01;
        
        })
        return (
          <mesh
            {...props}
            ref={ref}
            scale={1.5}
            onClick={() => { navigate(props.url) }}
            >

            <RoundedBox args={[2, 0.8, 0.25]} radius={0.1}>
                <meshLambertMaterial attach="material" color={props.color} />
            </RoundedBox>

            <Text position={[0,0,0.21]} color="white" anchorX="center" scale={3} anchorY="middle">
                {props.text}
            </Text>
          </mesh>
        )
    }

    return <div className="home">

        <Canvas>
            <pointLight intensity={1.4} position={[0, 0, 20]} />
            <Box url={"/"} color={"rgb(80, 191, 255)"} text="Jouer" position={[0,1.5,0]} />
            <Box url={"/shop"} color={"rgb(255, 166, 82)"}  text="Boutique" position={[0,0,0]} />
            <Box url={"/"} color={"rgb(255, 103, 103)"} text="Scores" position={[0,-1.5,0]} />
        </Canvas>

    </div>
}

export default Home;