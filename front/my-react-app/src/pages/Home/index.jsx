import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Aside from '../../components/Aside'
import Barchart from '../../components/Barchart'
import Linechart from '../../components/Linechart'
import Radarchart from '../../components/Radarchart'
import Radialbarchart from '../../components/RadialBarchart'
import Keydata from '../../components/Keydata'
import { getDatas } from "../../services/api";

function Home() {
    /*Récupération de l'id de l'utilisateur dans l'url*/ 
    const { id } = useParams(); 
    /*State pour stocker les données utilisateur*/ 
    const [user, setuser] = useState ()
    /*State pour afficher un éventuel message d'erreur*/ 
    const [error, setError] = useState(null);

    /*Appelle l'API pour récupérer les données utilisateur pour l'id donnée et met à jour le state utilisateur; définit un message d'erreur en cas d'échec */ 
    useEffect(() => {
    getDatas(id)
        .then(userData => setuser(userData))
        .catch(() => setError ("Impossible de charger les données utilisateur"));
        
        }, [id]);

    return (
        <div className='home-container'>
             <Aside />
            <div className='dashboard'>
                <h1>Bonjour <span className='red_content'>{user?.userInfos?.firstName}</span></h1>
                <span>Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
                <div className='dashboard-content'>
                    <div className='chart'>
                        <Barchart />
                        <Linechart />
                        <Radarchart />
                        <Radialbarchart />
                    </div>
                    <div className='aside_key'>
                        <Keydata />
                    </div>
                </div>
            </div>

        </div>

    )
    
    
}

export default Home