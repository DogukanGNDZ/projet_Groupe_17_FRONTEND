import { RedirectUrl } from "../Router/Router";

let aboutUsPage = `

  <div class=\"center\"> <br> <h1 style=\"color:#ffbf00\">About us :</h1><br>
    <h4>
    Bonjour,<br>
    Nous sommes 4 étudiants en informatique de gestion,<br>
    qui avons eu l'idée de faire un jeu pour notre projet de JavaScript.<br>     
    Contact : <br>
    GUNDUZ Dogukan<br>
    dogukan.gunduz@student.vinci.be<br>
    KRAWCZYKOWICZ Mateusz<br>
    Mateusz.krawczykowicz@student.vinci.be<br>
    </h4>
  
  </div>



<div id="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    
     Bonjour,<br>
     Nous sommes 4 étudiants en informatique de gestion,<br>
     qui avons eu l'idée de faire un jeu pour notre projet de JavaScript.<br>     
     Contact : <br>
     GUNDUZ Dogukan<br>
     dogukan.gunduz@student.vinci.be<br>

     

  </ul>
  </div>`;

const AboutUsPage = () => {
    const page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;