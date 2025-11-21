import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Label } from 'recharts';
import { getScore } from "../../services/api";

/*Style utilisé pour positionner le texte du Legend*/ 
const style = {
  top: '26%',
  left: '20%',
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
  fontSize: '15px',
  fontWeight: '500',
};

const Radialbarchart = () => {
    /*Récupération de l'id de l'utilisateur dans l'url*/ 
    const { id } = useParams();
    /*State contenant le score */ 
    const [score, setScore] = useState ();
    /*State pour afficher un éventuel message d'erreur*/ 
    const [error, setError] = useState(null);

    /*Appelle l'API pour récupérer les données score global de l'utilisateur pour l'id donnée et met à jour le state score global de l'utilisateur ; définit un message d'erreur en cas d'échec */
    useEffect(() => {
      getScore(id)
        .then(data => setScore(data))
        .catch(err => setError("Impossible de charger les données"));
    }, [id]);

  /* Affiche un message d'erreur si les données n'ont pas pu être récupérées */
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
          {/* Barre principale représentant le score de l'utilisateur */}
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
            fill="#FF0000"
            cornerRadius={10}
          />
          {/* Texte au centre du graphique indiquant le score */}
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
