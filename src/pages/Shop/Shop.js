import './Shop.scss';
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber';
import Loader from 'components/Loader';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import models from 'models';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Background from 'scene/Background';
import { useFrame } from '@react-three/fiber';

const cars = [ 
    {
        key: "race",
        price: 0,
        img: "https://img.icons8.com/color/480/ffffff/f1-race-car-top-veiw.png"
    },
    {
        key: "taxi",
        price: 500,
        img: "https://img.icons8.com/fluency/480/ffffff/taxi.png"
    },
    {
        key: "delivery",
        price: 1000,
        img: "https://img.icons8.com/officel/1600/ffffff/delivery.png"
    }
]

const my_cars = [ "race" ]

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
      () => {
        const controls = new OrbitControls(camera, gl.domElement);
  
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => {
          controls.dispose();
        };
      },
      [camera, gl]
    );
    return null;
  };

const DisplayCar = (props) => {
    const { car_key } = props;
    const car = useRef();

    useFrame(() => {
        if (car.current) car.current.rotation.y += 0.005;
    })

    return <mesh position={[0, -1, 0]} {...props} ref={car}>
        {models[car_key]}
    </mesh>
}

function Shop() {
  const canvas = useRef()
  const [car, setCar] = useState(cars[0].key);

  return (
    <>
    <div className="shop">
        <div className="choice">
            {cars.map((item, index) => <div onClick={() => setCar(item.key)}>
                
                <p>{item.key}</p>
                <img width={40} src={item.img} />
                {!my_cars.includes(item.key) && <button>Buy {item.price}$</button>}
            </div>)}
        </div>
        
    </div>

    <Canvas ref={canvas}>
      <Suspense fallback={<Loader />}>
        <CameraController />
        <ambientLight intensity={0.001} />

  
        <DisplayCar car_key={car} />
        <Environment preset="sunset" background />
        <Background />
      </Suspense>
    </Canvas>
    </>
  );
}

export default Shop;