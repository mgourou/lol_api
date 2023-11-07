import './_app.sass';
import { useRoutes  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './features/Home/Home';
import RechercheChampion from './features/RechercheChampion/RechercheChampion';
import RechercheItem from './features/RechercheItem/RechercheItem';
import Champions from './features/Champions/Champions';
import Summoner from './features/Summoner/Summoner';
import Items from './features/Items/Items';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://ddragon.leagueoflegends.com/cdn/13.21.1/data/fr_FR/champion.json')
      .then(response => {
        const championData = response.data.data;
        
        const championList = Object.values(championData).map(champion => ({
          id: champion.key,
          name: champion.name,
          img: `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${champion.image.full}`,
          tag : champion.tags[0],
          dipstick : champion.partype,
        }));
        setData(championList);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération de la liste des champions :', error);
      });
  }, []);

  const routes = useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/champions',
      element: <Champions data={data}/>,
    },
    {
      path: '/champions/:code',
      element: <RechercheChampion data={data}/>,
    },
    {
      path: '/items',
      element: <Items/>,
    },
    {
      path: '/items/:code',
      element: <RechercheItem/>,
    },
    {
      path: '/summoner',
      element: <Summoner/>,
    },
    {
      path: '*',
      element: <h1>404 - Page not found</h1>,
    },
  ]);
  return (
    <div className='App'>
      {routes}
    </div>
  );
}

export default App;
