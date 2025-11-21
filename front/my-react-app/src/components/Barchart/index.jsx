import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import { getActivity } from "../../services/api";

const Barchart = () => {
    /*Récupération de l'id de l'utilisateur dans l'url*/ 
    const { id } = useParams(); 
    /*State contenant les sessions activités*/ 
    const [activity, setActivity] = useState ();
    /*State pour afficher un éventuel message d'erreur*/ 
    const [error, setError] = useState(null);

    /*Appelle l'API pour récupérer les données activité pour l'id donnée et met à jour le state activité; définit un message d'erreur en cas d'échec */
    useEffect(() => {
      getActivity(id)
        .then(sessions => setActivity(sessions))
        .catch(err => setError ("Impossible de charger les données"));
    }, [id]);

  /* Tooltip personnalisé pour l'affichage au survol des barres du graphique */
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
  
  /* Affiche un message d'erreur si les données n'ont pas pu être récupérées */
  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }

  /* Affichage du graphique d'activité via Recharts */
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
        {/* Grille du graphique (ligne verticale désactivée) */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {/* Axe horizontal : jours / sessions */}
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} tickLine={false} />
        {/* Axe vertical : poids & calories, affiché à droite */}
        <YAxis orientation="right"  tickLine={false} axisLine={false} />
        {/* Tooltip personnalisé */}
        <Tooltip content={CustomTooltip}/>
         {/* Légende du graphique */}
        <Legend verticalAlign="top" align="right" iconType="circle" iconSize="8" height={65}/>
        {/* Titre interne du graphique */}
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
        {/* Barre représentant le poids */}
        <Bar dataKey="kilogram" name="Poids (kg)" fill="#282d30" radius={[3, 3, 0, 0]}  barSize={7} />
        {/* Barre représentant les calories brûlées */}
        <Bar dataKey="calories" name="Calories brûlées (kCal)" fill="#e60000" radius={[3, 3, 0, 0]}  barSize={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
