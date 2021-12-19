import Navbar from "../Navbar/Navbar";
import { Router, Redirect } from "../Router/Router";
import { getUserSessionData, setUserSessionData } from "../utils/session";
import { API_URL } from "../utils/server";

/***************************************************************************************
*    Title: "Elegant Login Page"
*    Author: SamimOnline
*    Availability: https://bootsnipp.com/snippets/vl4R7
*
***************************************************************************************/
let login =`<head>
<title>Login Page</title>
</head>
<body>
<div class="container">
<div class="d-flex justify-content-center h-100">
<div class="card">  
        <div class="card-header">
            <h3>Log In</h3>
        </div>
        <div class="card-body">
            <form id ="formlogin">
                <div class="input-group form-group" id="group_input">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input id="email" type="text" class="form-control" placeholder="email">
                    
                </div>
                <div class="input-group form-group" id="group_input">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                    </div>
                    <input id="password" type="password" class="form-control" placeholder="password">
                </div>
                <div class="form-group">
                    <input type="submit" value="Login" class="btn float-right login_btn">
                </div>
            </form>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-center links">
                Don't have an account?<a href="signup">Sign Up</a>
            </div>
        </div>
    </div>
</div>
</div>
</body>`


/*let login =` <br><div class=\"center\"> <br> <h1 style=\"color:#ffbf00\">Log in : </h1>
<br> <h3>a </h3> </div>
<form id ="formlogin">
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
        <input type="submit" value="Login" class="btn float-right login_btn">
    </div>
</form>
`*/

function LoginPage() {
    let page = document.querySelector("#page");
    page.innerHTML = login;
    let loginForm = document.querySelector("#formlogin");
    console.log(loginForm);
    const user = getUserSessionData();
  if (user) {
    // re-render the navbar for the authenticated user
    console.log("je suis connecté !");
    Redirect("/game");
    Navbar(user);
  } else {
    loginForm.addEventListener("submit", onLogin);
  }
}

const onLogin = (e) => {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
  
    let user = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
  
    fetch(API_URL + "users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error code : " + response.status + " : " + response.statusText
          );
        return response.json();
      })
      .then((data) => onUserLogin(data))
      .catch((err) => onError(err));
  };
  
  const onUserLogin = (userData) => {
    console.log("onUserLogin:", userData);
    console.log(userData);
    const user = { ...userData, isAutenticated: true };
    setUserSessionData(user);
    Navbar();
    Redirect("/game");
    Router();
  };
  
  const onError = (err) => {
    let messageBoard = document.querySelector("#messageBoard");
    let errorMessage = "";
    if (err.message.includes("401")) errorMessage = "Wrong username or password.";
    else errorMessage = err.message;
    messageBoard.innerText = errorMessage;
    messageBoard.classList.add("d-block");
    console.log(messageBoard);
  };

export default LoginPage;