
import { RedirectUrl, Router } from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {removeSessionData} from "../utils/session";

const Logout = () => {
    console.log("hello")
    removeSessionData();
    Navbar();
    RedirectUrl("/");
    Router();
  };
  
  export default Logout;