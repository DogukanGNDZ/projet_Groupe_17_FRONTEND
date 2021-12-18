/**
 * Render the HomePage
 */
import { Router, Redirect } from "../Router/Router";

const HomePage = () => { 
  const pageDiv = document.querySelector("#page");

  
  pageDiv.innerHTML = ` 
  <div class=\"watchout\"> 
    <span class=\"watchout-2\">
      WATCHOUT!
    </span> 
  </div> 
  <div class=\"center\"><br>

    <h1 style=\"color:#77dd77y\">
      Les règles du jeu : 
    </h1><br> 

    <h3>
      Vous controllez un personnage avec les flèches sur votre clavier. Le but du jeu est de récupérer les plus de pièces sans se faire toucher par les différents véhicules qui se trouvent sur la route. Les pièces récupérées doivent être ramenées dans le coffre qui se trouve au tout début de la map pour que les prochaines pièces réaparessent. Bonne chance ! 
    </h3> 

  </div>  

  <div class=\"traffic-lights shape\">
    <div class=\"shadow\"></div>
    <div class=\"light red\"></div>
    <div class=\"light amber\"></div>
    <div class=\"light green\"></div>
  </div>  

  <div class=\"traffic-lights-r shape\">
    <div class=\"shadow\"></div>
    <div class=\"light red\"></div>
    <div class=\"light amber\"></div>
    <div class=\"light green\"></div>
  </div> 
  
  <span id="playAgain" type="submit" class=\"btn-play\"><a href="game"></a></span>
  `;

  
};

export default HomePage;
