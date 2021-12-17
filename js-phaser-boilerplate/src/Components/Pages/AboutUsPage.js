import { RedirectUrl } from "../Router/Router";

let aboutUsPage = ` 
  <div class=\"container-about-us container_slide slide_down \"> <br> <h1 >About us :</h1><br>
    <h4>
    Bonjour,<br>
    Nous sommes 4 étudiants en informatique de gestion,<br>
    qui avons eu l'idée de faire un jeu pour notre projet de JavaScript.<br>     
    Contact : <br><br>
    GUNDUZ Dogukan<br>
    dogukan.gunduz@student.vinci.be <br><br>
    KRAWCZYKOWICZ Mateusz <br>
    mateusz.krawczykowicz@student.vinci.be <br><br>
    DEVAUX Jérôme <br>
    jerome.devaux@student.vinci.be <br><br>
    FERRIERE Maxime <br>
    maxime.ferriere@student.vinci.be <br>
    </h4>
  </div>

  <div class=\"infinite\">
    <div class=\"shadow-road\"></div>
  </div>
`;

/*
 <div id="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    
     Bonjour,<br>
     Nous sommes 4 étudiants en informatique de gestion,<br>
     qui avons eu l'idée de faire un jeu pour notre projet de JavaScript.<br>     
     Contact : <br>
     GUNDUZ Dogukan<br>
     dogukan.gunduz@student.vinci.be<br>



  </ul>
  </div> */
const AboutUsPage = () => {
    const page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;