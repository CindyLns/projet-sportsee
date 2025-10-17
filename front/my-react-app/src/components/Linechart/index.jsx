import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LineChart, Line, XAxis, Tooltip, Text, ResponsiveContainer, ReferenceArea } from 'recharts';
import { getAverage } from "../../services/api";

function Linechart() {
    const { id } = useParams(); 
    const [average, setAverage] = useState () 
    const [activeIndex, setActiveIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      getAverage(id)
        .then(sessions => setAverage(sessions))
        .catch(err => setError("Impossible de charger les données"));
    }, [id]);


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            color: "#000000",
            padding: "12px",
            fontSize: "12px",
            fontWeight:"500",
          }}
        >
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
  };
  const handleMouseMove = (state) => {
    if (state.isTooltipActive) {
      if (state.activeTooltipIndex !== activeIndex) {
        setActiveIndex(state.activeTooltipIndex);
      }
    } else if (activeIndex !== null) {
      setActiveIndex(null);
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
      <LineChart
        width={500}
        height={300}
        data={average}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 20,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <rect width="100%" height="100%"  fill="#E60000" rx={15} ry={15} />
        {activeIndex !== null && average.length > 0 && (
          <ReferenceArea
            x1={average[activeIndex].name}
            x2={average[average.length - 1].name}
            strokeOpacity={0}
            fill="rgba(0,0,0,0.2)"
          />
        )}
        <XAxis dataKey="name" tickLine={false} axisLine={false}  tick={{ fill: '#FFFFFF', opacity: '0.5' }} padding={{ left: 10, right: 10 }}   tickFormatter={(value) => {const days = ["L", "M", "M", "J", "V", "S", "D"]; return days[parseInt(value, 10) - 1]; }}/>
        <Tooltip content={CustomTooltip}/>
        <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={2} dot={false} />
        <Text x={20} y={40} fill="#FFFFFF" opacity={0.5} fontSize={15} fontWeight={500}>
          Durée moyenne des sessions
        </Text>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linechart;
