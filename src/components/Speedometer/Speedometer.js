import "./Speedometer.scss";
import { useEffect } from 'react';

export default function Speedometer(props) {

  const speed = props.speed || 50;

    useEffect(() => {
      //$("#speedbox-score").css("transform","rotate("+speed+"deg)");
    }, []);

    return <div class="gauge" style={{width: "200px"}}>
    <div class="percentage"></div>
    <div class="mask"></div>
    <span class="value">26%</span>
</div>
}
  