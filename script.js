import {Geografija} from "./skripta.js"

let formUsername = document.querySelector('#formUsername');
let inputUsername = document.querySelector('#inputUsername');




let g = new Geografija(grad, username());


//Promena korisničkog imena
formUsername.addEventListener('submit', e => {
    e.preventDefault();
    let newUsername = inputUsername.value;
    g.updateUsername(newUsername);
    formUpdateUsername.reset();
});

console.log(localStorage.username);