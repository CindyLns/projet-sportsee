import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getPerformance } from "../../services/api";

const Radarchart= () => {
    /*Récupération de l'id de l'utilisateur dans l'url*/ 
    const { id } = useParams();
    /*State pour stocker les performances de l'utilisateur*/ 
    const [performance, setPerformance] = useState () 
    /*State pour afficher un éventuel message d'erreur*/ 
    const [error, setError] = useState(null);

    /*Appelle l'API pour récupérer les données performances de l'utilisateur pour l'id donnée et met à jour le state des performances de l'utilisateu ; définit un message d'erreur en cas d'échec */
    useEffect(() => {
      getPerformance(id)
        .then(kind => setPerformance(kind))
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
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performance}>
          {/* Background gris pour le fond du diagramme */}
          <rect width="100%" height="100%"  fill="#282D30" rx={15} ry={15} />
           {/* Grille du diagramme */}
          <PolarGrid  radialLines={false} stroke="#ffffff"  />
          {/* Libellés autour du radar  */}
          <PolarAngleAxis dataKey="subject"  tick={{ fill: "white", fontSize: 10 }}  tickSize={8}/>
          {/* Surface représentant le niveau de performance */}
          <Radar name="Performance" dataKey="value"  fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
};

export default Radarchart;
