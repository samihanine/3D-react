import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
    const { progress } = useProgress();
    return <Html>
      <div className="loading">
        <div className="progress">
          <div style={{width: Math.round(progress) + "%"}}></div>
        </div>
      </div>
    </Html>
}
  