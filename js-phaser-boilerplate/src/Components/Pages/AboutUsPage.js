import { RedirectUrl } from "../Router/Router";

let aboutUsPage = `<div class="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    
     Bonjour,<br>
     Nous sommes 4 étudiants en informatique de gestion,<br>
     qui avons eu l'idée de faire un jeu pour notre projet de JavaScript.<br>     
     Contact : <br>
  </ul>
  </div>`;

const AboutUsPage = () => {
    const page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;