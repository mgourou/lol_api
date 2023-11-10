import './_champions.sass'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import lol_logo from "../../assets/images/league_logo.svg"
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";


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

function Champions(props , { champion }) {
    const [champions, setChampions] = useState([]);
    const [selectedType, setSelectedType] = useState("All");
    const [selectedDipstick, setSelectedDipstick] = useState("All");
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      axios.get('https://ddragon.leagueoflegends.com/cdn/13.21.1/data/fr_FR/champion.json')
        .then(response => {
          const championData = response.data.data;
          
          const championList = Object.values(championData).map(champion => ({
            id: champion.key,
            name: champion.name,
            img: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${normalizeChampionName(champion.name)}_0.jpg`,
            tag : champion.tags[0],
            dipstick : champion.partype,
          }));
          setChampions(championList);
        })

        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des champions :', error);
        });
    }, []);


    const handleSelectChangeType = (event) => {
        setSelectedType(event.target.value);
      };

    const handleSelectChangeDipstick = (event) => {
        setSelectedDipstick(event.target.value);
      };
      const filteredData = champions.filter((champion) => {
        // Filtrer par nom de pays
        const nameMatch =
          searchText === "" ||
          champion.name.toLowerCase().includes(searchText.toLowerCase());

        // Filtrer par continent
        const typeMatch =
        selectedType === "All" || champion.tag === selectedType;

        // Filtrer par continent
        const parTypeMatch =
        selectedDipstick === "All" ||
        (selectedDipstick === "Autre" &&
        ["Mana", "Énergie", "Fureur", "Aucune"].indexOf(champion.dipstick) === -1) ||
        (selectedDipstick !== "Autre" && champion.dipstick === selectedDipstick);

        const shouldDisplay = nameMatch && typeMatch && parTypeMatch;

    return nameMatch && typeMatch && parTypeMatch && shouldDisplay;
        });



  return(
    <div className="Champions">
      <Helmet>
        <title>Champions</title>
        <meta name="description" content="Helmet application" />
        <link rel="icon" href={lol_logo} />
    </Helmet>
        <nav class="navbar fixed-top navbar-expand-lg bg-black navbar-dark ">
      <div class="container w-75">
      <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
        <Link to={'/'}><img className='test' src={lol_logo} alt="" /></Link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
              <Link className='nav-link active text-light' to={'/champions'}>Champions</Link>
            </li>
            <li class="nav-item">
              <Link className='nav-link active text-light' to={'/items'}>Items</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div className='body_champions'>
      <div className='div_input_select'>
            <input type="text" placeholder='Recherche un champion...' value={searchText} onChange={(event) => setSearchText(event.target.value)} />
            <div className='div_input_select2'>
              <select value={selectedType} onChange={handleSelectChangeType}>
                  <option value="All">Tous</option>
                  <option value="Assassin">Assassin</option>
                  <option value="Mage">Mage</option>
                  <option value="Support">Support</option>
                  <option value="Tank">Tank</option>
                  <option value="Fighter">Combattant</option>
                  <option value="Marksman">Tireur</option>
              </select>
              <select value={selectedDipstick} onChange={handleSelectChangeDipstick}>
                  <option value="All">Tous</option>
                  <option value="Énergie">Énergie</option>
                  <option value="Mana">Mana</option>
                  <option value="Fureur">Fureur</option>
                  <option value="Autre">Autre</option>
                  <option value="Aucune">Aucun</option>
              </select>
            </div>
          </div>
        <ul className='section1_champ'>
          {filteredData.map(champion => (
          <Link to={`/champions/${champion.name}`}  key={champion.id}>
              <div className='champion-item'>
                  <li className='champion-img'><img src={champion.img} alt={champion.name} /></li>
                  <li className='champion-name'>{champion.name}</li>
              </div>
          </Link>
          ))}
        </ul>
          </div>
    </div>
  )

}

export default Champions
