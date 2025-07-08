// Login 

//First get the user inputs
let logIn = document.getElementById("login");
let userEstatus = document.getElementById("estatus");
let loader = document.getElementById("loader");

// Use an add event listener to check te login
logIn.addEventListener('click', (e) => {
    e.preventDefault()
    let emailIn = document.getElementById("email").value;
    let passIn = document.getElementById("password").value;
    //This will call a function with the parameters email and password
    userValidation(emailIn, passIn)
})

async function userValidation(email, password) {
    try {
        //Lets do a petition type get to see te users
        let response = await fetch("http://localhost:3000/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        // If the user was finded, the system will aprove it.
        let data = await response.json();
        const validation = data.find(u => u.email === email)
        // When the user was validated, the system will do a guardian with localstorage.
        if (validation && validation.password === password) {
            localStorage.setItem("user", JSON.stringify(validation))
            userEstatus.innerHTML = `<p>Nice tu see you again, ${validation.name}!</p>`
            loader.style.display = "block"
            setTimeout(() => {
                window.location.href="../../adminpages/stadistics/stadistics.html";
            }, 3000);
        } else {
            // if the user doesn't exist, the system will show an alert.
            userEstatus.innerHTML = `<p style= "color: red">Train again, summoner...</p>`
        }

    } catch (error) {
        console.error(`Your method has a problem: ${error}`);
    };

}
