import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getPerformance } from "../../services/api";

const Radarchart= () => {
    const { id } = useParams();
    const [performance, setPerformance] = useState () 
    const [error, setError] = useState(null);

    useEffect(() => {
      getPerformance(id)
        .then(kind => setPerformance(kind))
        .catch(err => setError("Impossible de charger les données"));
    }, [id]);

    
  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }
 
  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance}>
          <rect width="100%" height="100%"  fill="#282D30" rx={15} ry={15} />
          <PolarGrid  radialLines={false} stroke="#ffffff"  />
          <PolarAngleAxis dataKey="subject"  tick={{ fill: "white", fontSize: 10 }}  tickSize={8}/>
          <Radar name="Performance" dataKey="value"  fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
};

export default Radarchart;
