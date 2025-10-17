import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import { getActivity } from "../../services/api";

const Barchart = () => {
    const { id } = useParams(); 
    const [activity, setActivity] = useState ();
    const [error, setError] = useState(null);

    useEffect(() => {
      getActivity(id)
        .then(sessions => setActivity(sessions))
        .catch(err => setError ("Impossible de charger les données"));
    }, [id]);


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#E60000",
            color: "white",
            padding: "10px",
            fontSize: "12px",
            fontWeight:"500",
          }}
        >
          <p>{`${payload[0].value} kg`}</p>
          <p>{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
  };
  
  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={activity}
        margin={{
          top: 45,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barGap={8}  
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} tickLine={false} />
        <YAxis orientation="right"  tickLine={false} axisLine={false} />
        <Tooltip content={CustomTooltip}/>
        <Legend verticalAlign="top" align="right" iconType="circle" iconSize="8" height={65}/>
        <Text
          x={80}  
          y={65}   
          textAnchor="middle"
          fill="#20253A"
          fontSize={15}
          fontWeight="500"
        >
         Activité quotidienne
        </Text>
        <Bar dataKey="kilogram" name="Poids (kg)" fill="#282d30" radius={[3, 3, 0, 0]}  barSize={7} />
        <Bar dataKey="calories" name="Calories brûlées (kCal)" fill="#e60000" radius={[3, 3, 0, 0]}  barSize={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
