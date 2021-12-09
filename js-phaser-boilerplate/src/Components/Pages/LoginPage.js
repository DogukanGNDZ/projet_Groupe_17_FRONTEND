import Navbar from "../Navbar/Navbar";
import { Router } from "../Router/Router";

let login =`<head>
<title>Login Page</title>
<!--Made with love by Mutiullah Samim -->

<!--Bootsrap 4 CDN-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

<!--Fontawesome CDN-->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

<!--Custom styles-->
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<div class="container">
<div class="d-flex justify-content-center h-100">
    <div class="card">
        <div class="card-header">
            <h3>Log In</h3>
        </div>
        <div class="card-body">
            <form id = "formlogin>
                <div class="input-group form-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                    </div>
                    <input id="username" type="text" class="form-control" placeholder="username">
                    
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

function LoginPage() {
    let page = document.querySelector("#page");
    page.innerHTML = login;
    let loginForm = document.querySelector("#formLogin");
    console.log(loginForm);
    const user = getUserSessionData();
  if (user) {
    // re-render the navbar for the authenticated user
    console.log("je suis connecté !");
    RedirectUrl("/game");
    Navbar(user);
  } else {
    loginForm.addEventListener("submit", onLogin);
  }
}

const onLogin = (e) => {
    e.preventDefault();
    let email = document.getElementById("username");
    let password = document.getElementById("password");
  
    let user = {
      username: document.getElementById("username").value,
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
    console.log("logé");
    console.log("onUserLogin:", userData);
    console.log(userData);
    const user = { ...userData, isAutenticated: true };
    setUserSessionData(user);
    Navbar();
    RedirectUrl("/game");
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