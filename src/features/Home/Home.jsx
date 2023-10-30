import './_home.sass'
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {
    const [champions, setChampions] = useState([]);
  
    useEffect(() => {
      axios.get('https://ddragon.leagueoflegends.com/cdn/13.21.1/data/fr_FR/champion.json')
        .then(response => {
          const championData = response.data.data;
          const championList = Object.values(championData).map(champion => ({
            id: champion.key,
            name: champion.name,
            img: `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${champion.image.full}`,
          }));
          setChampions(championList);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des champions :', error);
        });
    }, []);
  return(
    <div className="Home">
       <h1>Liste des champions de League of Legends </h1>
       <div className='section1_bg'>

       </div>
      <ul className='section1_champ'>
        {champions.map(champion => (
        <div key={champion.id}>
          <li >{champion.name}</li>
          <li><img src={champion.img} alt={champion.name} /></li>
        </div>
        ))}
      </ul>
    </div>
  )

}

export default Home
