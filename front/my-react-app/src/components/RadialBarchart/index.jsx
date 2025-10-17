import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Label } from 'recharts';
import { getScore } from "../../services/api";

const style = {
  top: '26%',
  left: '20%',
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  fontSize: '15px',
  fontWeight: '500',
};

const Radialbarchart = () => {
    const { id } = useParams();
    const [score, setScore] = useState ();
    const [error, setError] = useState(null);

    useEffect(() => {
      getScore(id)
        .then(data => setScore(data))
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
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={score} startAngle={90} endAngle={220} >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            fill="#FF0000"
            cornerRadius={10}
          />
          <Label
            content={() => {
              return (
                <text
                  x={140} 
                  y={160} 
                  textAnchor="start"         
                  dominantBaseline="middle"  
                  fill="#282D30" 
                  fontSize={26}
                  fontWeight="700"
                >
                  {score?.length > 0  && score[0].value}%{" "}
                    <tspan x={140} dy="20" fill="gray" fontSize={16}>
                      de votre objectif
                    </tspan> 
                </text>
              );
            }}
          />
          <Legend  iconSize={0} layout="vertical" verticalAlign="top" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    );
};

export default Radialbarchart ;
