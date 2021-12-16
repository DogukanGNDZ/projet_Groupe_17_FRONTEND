/**
 * Render the HomePage
 */

const HomePage = () => { 
  const pageDiv = document.querySelector("#page");
  
  pageDiv.innerHTML = "Régle du jeux : <br> les regles sont assez simple vous controllez un personnage <br> et vous devez traversez une route remplis de vehicule de tout genre pour recuperer trois piece est le ramener dans votre coffre. ";
};

export default HomePage;
