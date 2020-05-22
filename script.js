// Importovanje classa

import {Geografija} from "./skripta.js"


let geo = new Geografija(localStorage.username);


// DOM elementi
let formInput = document.getElementById('formInput');
let formNewUsername = document.getElementById('formNewUsername');
let divUpdatedUsername = document.getElementById('divUpdatedUsername');
let divNewTerm = document.getElementById('divNewTerm');


// Promena username-a
formNewUsername.addEventListener('submit', e => {
    e.preventDefault();
    let newUsername =  document.getElementById('newUsername').value;
    //validacija username-a
    let inputText = /^(?!\s*$).+/;
    if(inputText.test(newUsername) &&
        newUsername != "" &&
        newUsername != null) {
        geo.updateUsername(newUsername);
        formNewUsername.reset();
        divUpdatedUsername.style.color = 'green';
        divUpdatedUsername.textContent = 'Username uspešno promenjen: ' + newUsername;
    } else {
        divUpdatedUsername.style.color = 'red';
        divUpdatedUsername.textContent = 'Polje "username" ne sme biti prazno!';
    }
});

// Dodavanje pojma
formInput.addEventListener('submit', e => {
    e.preventDefault();
    let kategorija = document.getElementById('kategorija').value;
    let pojam = document.getElementById('newItem').value;
    let pattern = /^(?!\s*$).+/;
    if(pattern.test(pojam) &&
        pojam != "" &&
        pojam != null) {
        geo.checkIfExists(kategorija, pojam, data => {
            if(data) {
                geo.newTerm(kategorija, pojam);
                formInput.reset();
                divNewTerm.style.color = 'green';
                divNewTerm.textContent = 'Uspešno dodat pojam: ' + pojam;
            } else {
                formInput.reset();
                divNewTerm.style.color = 'red';
                divNewTerm.textContent = 'Polje ' + pojam + ' već postoji!';
            }
        });
    } else {
        divNewTerm.style.color = 'red';
        divNewTerm.textContent = 'Polje "pojam" ne sme biti prazno!';
    }
});


