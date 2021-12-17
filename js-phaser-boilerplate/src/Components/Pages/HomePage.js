/**
 * Render the HomePage
 */

const HomePage = () => { 
  const pageDiv = document.querySelector("#page");

  
  pageDiv.innerHTML = " <div class=\"watchout\"> <span>WATCHOUT!</span> </div> <div class=\"center\"> <br> <h1 style=\"color:#77dd77\">Les règles du jeux : </h1><br> <h3>Vous controllez un personnage avec les flèches sur votre clavier. Le but du jeux est de recuperer les plus de pieces sans se faire toucher par les différents véhicules qui se trouvent sur la route. Les pieces récuperées doivent etre ramenées dans le coffrequi se trouve au tout debut de la map pour que les prochaines pièces réaparessent. Bonne chance ! </h3> </div>      <div class=\"traffic-lights shape\"><div class=\"shadow\"></div><div class=\"light red\"></div><div class=\"light amber\"></div><div class=\"light green\"></div></div>     <div class=\"traffic-lights-r shape\"><div class=\"shadow\"></div><div class=\"light red\"></div><div class=\"light amber\"></div><div class=\"light green\"></div></div> ";
};

export default HomePage;
