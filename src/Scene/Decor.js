function DisplayDecor (props) {
    return props.decors.map((item, index) => {
      return <mesh scale={1} rotation-y={Math.PI/2} position={item.position} key={index}>
        {item.Model}
      </mesh>
    })
}

export default DisplayDecor;