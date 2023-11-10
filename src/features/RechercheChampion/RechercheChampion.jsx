import './_rechercheChampion.sass'
import React, { useState, useEffect } from 'react';
import lol_logo from "../../assets/images/league_logo.svg"
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";


const championSkins = (championId) => {
  const numberOfSkins = 99;
  const skinURLs = [];

  for (let i = 1; i < numberOfSkins; i++) {
    const lien = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${i}.jpg`
    if (lien) {
      skinURLs.push(lien);
    }
  }

  return skinURLs;
};


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
    case "Dr. Mundo":
      return 'DrMundo';
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
  const [loading, setLoading] = useState(true);
  const { code } = useParams();
  const selectedChampion = data.find((champion) => normalizeChampionName(champion.name) === normalizeChampionName(code));
  const splash = `https://ddragon.leagueoflegends.com/cdn/13.21.1/img/champion/${normalizeChampionName(selectedChampion.name)}.png`;

  const championId = code;
  const championSkinURLs = championSkins(championId);

  useEffect(() => {
    if (selectedChampion) {
      const image = new Image();
      const encodedChampionName = normalizeChampionName(selectedChampion.name);
      const championImageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${encodedChampionName}_0.jpg`;

      image.src = championImageURL;
      image.onload = () => {
        setLoading(false); // L'image est chargée, nous pouvons arrêter l'animation de chargement
      };
    }
  }, [selectedChampion]);

  if (loading) {
    return <div class="main-item">
    <div class="static-background">
      <div class="background-masker btn-divide-left"></div>
    </div>
    
    <div class="animated-background">
      <div class="background-masker btn-divide-left"></div>
    </div>
    
    <div class="shared-dom">
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
      <div class="sub-rect pure-background"></div>
    </div>
    
    <div class="css-dom"></div>
  </div>;
  }

  if (!selectedChampion) {
    return <div>Champion non trouvé</div>;
  }

  const encodedChampionName = normalizeChampionName(selectedChampion.name);
  const championImageURL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${encodedChampionName}_0.jpg`;

  return (
    <div className="Recherche">
      <Helmet>
        <title>{code} - Informations</title>
        <meta name="description" content="Helmet application" />
        <link rel="icon" href={lol_logo} />
      </Helmet>
      <div className="recherche_img_bg">
        <img className="champion_img_bg" src={championImageURL} alt={selectedChampion} />
        <img className="champion_img_on" src={championImageURL} alt={selectedChampion} />
      </div>
      <div className='champion-info'>
        <div className='champion-icon'>
          <img src={splash} alt={selectedChampion.name} />
          <div className='testt'>
            <span>{selectedChampion.name}</span>
            <br />
            <span>{selectedChampion.title}</span>
          </div>
        </div>
      <ul className='kee'>
        {championSkinURLs.map((skinURL, index) => (
          <li key={index}>
            <img className='img' src={skinURL} alt={`Skin ${index + 1}`} />
          </li>
        ))}
      </ul>
      </div>
      <div>
      </div>
    </div>
  );
}

export default RechercheChampion;