import Navbar from "../Navbar/Navbar";
import { Router,Redirect} from "../Router/Router";
import { getUserSessionData, setUserSessionData } from "../utils/session";
import { API_URL } from "../utils/server";


let signup =`<head>
<title>Login Page</title>
</head>
<body>
<div class="container">
<div class="d-flex justify-content-center h-100">
    <div class="card">
        <div class="card-header">
            <h3>Sign Up</h3>
        </div>
        <div class="card-body">
            <form id="formsignup">
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input id="username" type="text" class="form-control" placeholder="username">
                    
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input id="email" type="text" class="form-control" placeholder="email">
                    
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input id="password" type="password" class="form-control" placeholder="password">
                </div>
                <div class="form-group">
                <button class="buttonRegister btn btn-warning" id="buttonRegister type="submit">Register</button>
                
                </div>
            </form>
        </div>
    </div>
</div>
<div class="alert alert-danger mt 2 d-none" id="messageBoard"> </div><span id="errorMessage"> </span>
</div>
</body>`

function SignUpPage() {
    let page = document.querySelector("#page");
    page.innerHTML = signup;
    let registerForm = document.querySelector("#formsignup");
    console.log(registerForm);
    registerForm.addEventListener("submit", onRegister);
    const user = getUserSessionData();
    if (user) {
        // re-render the navbar for the authenticated user
        console.log("je suis connecté !");
        Redirect("/game");
        Navbar(user);
    } else {
        console.log("bon chemin");
        registerForm.addEventListener("submit", onRegister);
    }

    function onRegister(e) {
        e.preventDefault();
        console.log("coucou");
        let user = {
          username: document.getElementById("username").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };
      
        fetch(API_URL + "users/", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) throw new Error("Error code : " + response.status + " : " + response.statusText);
            return response.json();
          })
          .then((data) => onUserRegistration(data))
          .catch((err) => onError(err));
      };
      
      function onUserRegistration(userData) {
        console.log("onUserRegistration", userData);
        const user = { ...userData, isAutenticated: true };
        setUserSessionData(user);
        Navbar();
        Redirect("/game");
        Router();
      };

      function onError(err){
        let messageBoard = document.querySelector("#messageBoard");
        let errorMessage = "";
        if (err.message.includes("401")) errorMessage = "Wrong username or password.";
        else errorMessage = err.message;
        messageBoard.innerText = errorMessage;
        messageBoard.classList.add("d-block");
        console.log(messageBoard);
      };

}


export default SignUpPage;