import { RedirectUrl } from "../Router/Router";

let aboutUsPage = `<div class="container-fluid panneau-aboutus">
  <ul class="cadre-panneau-aboutus">
    <li>We are a group of 4 students from Paul Lambin Institute (<a href ="https://www.vinci.be/fr/">IPL</a>). As part of the Web2 course, we were meant to create a website using JS.
    We decided to create a small game to provide entertainment. The goal is to collect as much coins as possible and put them in a safety chest.</li>
    <li>dogukan.gunduz@student.vinci.be</li>
    <li>maxime.ferriere@student.vinci.be</li>
    <li>mateusz.krawczykowicz@student.vinci.be</li>     
    <li>jerome.devaux@student.vinci.be</li>
  </ul>
  </div>`;

const AboutUsPage = () => {
    const page = document.querySelector("#page");
    page.innerHTML = aboutUsPage;
}

export default AboutUsPage;