let user;
// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar} from "bootstrap";
import { getUserSessionData } from "../utils/session.js";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector("#navbarWrapper");
  let navbar;
  user = getUserSessionData();
  if(user){
  navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-uri="/">Game rules</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/aboutUsPage">About us</a>
              </li>             
            </ul>
            <a class="navbar-brand " href="#" data-uri="/game">Watch out</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/logout">Log out</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/rank">Ranking</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  `;
  }else{
  navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-uri="/">Game rules</a>
              </li>
                        
            </ul>
            <a class="navbar-brand " href="#" data-uri="/game">Watch out</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/login">Log in</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/aboutUsPage">About us</a>
              </li> 
              
            </ul>
          </div>
        </div>
      </nav>
  `;
  }  
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
