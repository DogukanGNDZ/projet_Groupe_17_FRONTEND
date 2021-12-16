/**
 * Render the HomePage
 */

const HomePage = () => { 
  const pageDiv = document.querySelector("#page");
  
  pageDiv.innerHTML = "Les règles sont assez simple : <br> Vous controllez un personnage avec les flèches sur votre clavier. <br> Le but du jeux est de recuperer les plus de pieces sans se faire toucher par les différents véhicules qui se trouvent sur la route. Les pieces récuperées doivent etre ramenées dans le coffre qui se trouve au tout debut de la map pour que les prochaines pièces réaparessent. <br> Bonne chance !";
};

export default HomePage;
