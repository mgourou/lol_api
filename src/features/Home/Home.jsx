import './_home.sass'
import lol_logo from "../../assets/images/league_logo.svg"
import { Link } from 'react-router-dom';


function Home() {

  return(
    <div className="Home">
        <nav class="navbar fixed-top navbar-expand-lg bg-black navbar-dark ">
      <div class="container w-75">
      <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link className='nav-link active text-light' to={'/champions'}>Champions</Link>
            </li>
            <li class="nav-item">
              <Link className='nav-link active text-light' to={'/items'}>Items</Link>
            </li>
          </ul>
        </div>
          <Link to={'/'}><img className='test' src={lol_logo} alt="" /></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
          <li class="nav-item">
              <Link className='nav-link active text-light' to={'/esport'}>Esport</Link>
            </li>
            <li class="nav-item">
              <Link className='nav-link active text-light' to={'/contact'}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
       <div className='section1_bg'>

       </div>
    </div>
  )

}

export default Home
