// BACKEND BASE URL, you can replace it with the remote server url instead of using localhost
var baseURL = "https://researchhub.herokuapp.com/api/v1";

/* 
==============================================
User login functionality  <> START
==============================================
*/
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(`${baseURL}/auth/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        alert(result.error);
        // window.location.replace("/sign up.html")
      } else {
        alert("Logged in successfully!");

        // Store the user token the localstorage after successfull login
        localStorage.setItem("rh-token", result.data.token);
        window.location.replace("/");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
}

/* 
==============================================
User login functionality  <> END
==============================================
*/

/* 
==============================================
User signup functionality  <> START
==============================================
*/
function signup() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var firstName = document.getElementById("name").value.split(" ")[0];
  var lastName = document.getElementById("name").value.split(" ")[1];
  var institution = document.getElementById("institution").value;
  var phone = document.getElementById("phone").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("firstName", firstName);
  urlencoded.append("lastName", lastName);
  urlencoded.append("email", email);
  urlencoded.append("institution", institution);
  urlencoded.append("password", password);
  urlencoded.append("confirmPassword", confirmPassword);
  urlencoded.append("phone", phone);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(`${baseURL}/auth/signup`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        alert(result.error);
        // window.location.replace("/sign up.html")
      } else {
        alert("account created successfully!");
        window.location.replace("/login.html");
      }
    })
    .catch((error) => console.log("error", error));
}

/* 
==============================================
User signup functionality  <> END
==============================================
*/

/* 
==============================================
File upload functionality  <> START
==============================================
*/

function addDoc(docUrl) {
  var title = document.getElementById("title").value;
  var publishedAt = document.getElementById("publishedAt").value;
  var description = document.getElementById("description").value;

  var token = localStorage.getItem("rh-token");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("x-auth-token", token);

  var urlencoded = new URLSearchParams();
  urlencoded.append("title", title);
  urlencoded.append("docUrl", docUrl);
  urlencoded.append("publishedAt", publishedAt);
  urlencoded.append("description", description);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(`${baseURL}/docs/add`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.error) {
        alert(result.error);
      } else {
        alert("Doc added successfully!");
        window.location.replace("/");
      }
    })
    .catch((error) => console.log("error", error));
}

window.ajaxSuccess = function () {
  response = JSON.parse(this.responseText);
  console.log("ajaxSuccess", typeof this.responseText);
  // document.getElementById('uploaded').setAttribute("src", response["secure_url"]);
  // document.getElementById('results').innerText = this.responseText;

  var docUrl = response["secure_url"];

  // After uploading the file, add doc info in the database
  addDoc(docUrl);
};

window.AJAXSubmit = function (formElement) {
  console.log("starting AJAXSubmit");
  if (!formElement.action) {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.onload = ajaxSuccess;
  xhr.open(
    "post",
    "https://api.cloudinary.com/v1_1/victorkarangwa4/image/upload"
  );
  xhr.send(new FormData(formElement));
};

/* 
==============================================
File upload functionality  <> END
==============================================
*/

/* 
==============================================
View all research functionality  <> START
==============================================
*/

async function viewAllDocs() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    `${baseURL}/docs/`,
    requestOptions
  );
  const data = await response.json();

  return data;
}



/* 
==============================================
View specific functionality  <> START
==============================================
*/

async function viewSingleDocs() {
  const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('id');
console.log("-------->", docId)
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  var response = await fetch(
    `${baseURL}/docs/${docId}`,
    requestOptions
  );
  const data = await response.json();

  return data;
}


// JWT decoder

 function parseJwt() {
  var token = localStorage.getItem("rh-token");
  if (token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    var userPayload = JSON.parse(jsonPayload);
    console.log(userPayload);
    return userPayload;
  }
  return;
}

function logout(){
  localStorage.removeItem("rh-token");
  window.location.replace("/")
}
