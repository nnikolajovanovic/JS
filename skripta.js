export class Geografija {
    // konstruktor

    constructor(u,c) {   // koja osoba kreira pojam, i u kojoj kategoriji se upisuje pojam
        this.korisnik = u;
        this.kategorija = c;
        this.inputs = db.collection('pojmovi');
    }

    //seteri

    set username(u) {
        this._username = u;
    }

    set cathegory(u) {
        this._cathegory = u;
    }
    //geteri

    get username() {
        return this._username;
    }
    get cathegory() {
        return this._cathegory;
    }

    // update username

    updateUsername(newUsername){
        this.korisnik = newUsername;
        localStorage.setItem('korisnik','newUsername')    
    }

    
    async addInput(mess){

        let dateTmp = newDate();
        //kreiramo dokument kojim ćemo dodati bazu
        let input = {
            pojam: mess,
            pocetno_slovo: 
            kategorija: this.cathegory,
            korisnik: this.username,
            vreme: firebase.firestore.Timestamp.fromDate(dateTmp)
        }

        // dodamo chat bazi

        let response = await this.inputs.add('input');
        return response;
    }

}
