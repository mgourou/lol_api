import './_rechercheChampion.sass'
import React from 'react';

import { useParams} from 'react-router-dom';


function normalizeChampionName(name) {
  // Remplacez les caractères spéciaux, par exemple, les espaces par des tirets bas (_),
  // supprimez les accents et ajoutez une majuscule au début.
  const normalizedName = name.replace(/ /g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/^(.)/, c => c.toUpperCase());

  // Exceptions pour certains champions
  switch (name) {
    case 'LeBlanc':
      return 'Leblanc';

    case "Cho'Gath":
      return 'Chogath';
    case "Aurelion Sol":
      return 'AurelionSol';
    case "Bel'Veth":
      return 'Belveth';
    case "Jarvan IV":
      return 'JarvanIV';
    case "Kai'Sa":
      return 'Kaisa';
    case "Kha'Zix":
      return 'Khazix';
    case "Kog'Maw":
      return 'KogMaw';
    case "K'Santé":
      return 'KSante';
    case "Lee Sin":
      return 'LeeSin';
    case "Maître Yi":
      return 'MasterYi';
    case "Miss Fortune":
      return 'MissFortune';
    case "Wukong":
      return 'MonkeyKing';
    case "Nunu et Willump":
      return 'Nunu';
    case "Rek'Sai":
      return 'RekSai';
    case "Renata Glasc":
      return 'Renata';
    case "Séraphine":
      return 'Seraphine';
    case "Tahm Kench":
      return 'TahmKench';
    case "Twisted Fate":
      return 'TwistedFate';
    case "Vel'Koz":
      return 'Velkoz';
    case "Xin Zhao":
        return 'XinZhao';
    case "Zoé":
        return 'Zoe';
    default:
      return normalizedName;
  }
}



function RechercheChampion({ data }, props) {
    
  const { code } = useParams();
  const selectedChampion = data.find(champion => normalizeChampionName(champion.name) === normalizeChampionName(code));
      if (!selectedChampion) {
        return <div>Champion non trouvé</div>
    }
    
    const encodedChampionName = normalizeChampionName(selectedChampion.name);
    const championImageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${encodedChampionName}_0.jpg`;


    return (
        <div className='Recherche'>
            <h1>{selectedChampion.name}</h1>
            <img src={championImageURL} alt={selectedChampion} />
        </div>
        )
}


export default RechercheChampion;