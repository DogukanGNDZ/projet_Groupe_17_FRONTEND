import { RedirectUrl } from "../Router/Router";

let aboutUsPage = `<div class="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    <li>a définir</li>
    <li> a complèter</li>
    <li> a complèter</li>
    <li> a complèter</li>     
    <li> a complèter</li>
  </ul>
  </div>`;

const AboutUsPage = () => {
    const page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;