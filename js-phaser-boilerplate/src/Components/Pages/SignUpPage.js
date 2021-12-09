import Navbar from "../Navbar/Navbar";
import { Router } from "../Router/Router";
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
                    <input type="text" class="form-control" placeholder="username">
                    
                </div>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input type="password" class="form-control" placeholder="password">
                </div>
                <div class="form-group">
                    <input type="submit" value="Sign up" class="btn float-right login_btn">
                </div>
            </form>
        </div>
    </div>
</div>
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
        RedirectUrl("/game");
        Navbar(user);
    } else {
        registerForm.addEventListener("submit", onRegister);
    }

    const onRegister = (e) => {
        e.preventDefault();
        let user = {
          username: document.getElementById("username").value,
          email: document.getElementById("emailRegister").value,
          password: document.getElementById("passwordRegister").value,
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
      
      const onUserRegistration = (userData) => {
        console.log("onUserRegistration", userData);
        const user = { ...userData, isAutenticated: true };
        setUserSessionData(user);
        Navbar();
        RedirectUrl("/game");
        Router();
      };
}


export default SignUpPage;