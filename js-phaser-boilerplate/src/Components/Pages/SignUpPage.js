import Navbar from "../Navbar/Navbar";
import { Router } from "../Router/Router";

let signup =`<head>
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
                    <input type="submit" value="Login" class="btn float-right login_btn">
                </div>
            </form>
        </div>
        <div class="card-footer">
        <div class="d-flex justify-content-center links">
        This website respect the General Data Protection Regulation (GDPR)
        </div>
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
        loginForm.addEventListener("submit", onRegister);
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