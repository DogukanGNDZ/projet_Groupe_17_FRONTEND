import'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css"; // If you prefer to style your app with vanilla CSS rather than with Bootstrap
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'


import Navbar from "./Components/Navbar/Navbar";
import { Router } from "./Components/Router/Router";

Navbar();

Router(); // The router will automatically load the root page
