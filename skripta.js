export class Geografija {
    // konstruktor

    constructor(k) {   // koja osoba kreira pojam, i u kojoj kategoriji se upisuje pojam
        this.korisnik = k;
        this.inputs = db.collection('zgeografija');
    }

    //seteri

    set username(u) {
        this._username = u;
    }

    //geteri

    get username() {
        return this._username;
    }

    // update username

    updateUsername(newUsername){
        this.korisnik = newUsername;
        localStorage.setItem('username','newUsername')    
    }

    
    // Prvo slovo
    firstLetter(string) {
        let str = string.slice(0, 1);
        return str;
    }

    // Provera vrednosti inputa
    stringCheck(str) {
        let newStr = str
            //brisanje space-a i tab-a
            .replace(/\s+/g, '')
            //brisanje svih specijalnih karaktera
            .replace(/[^a-zđščžć]+/gi, '')
            //veliko prvo slovo
            .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
            .replace(/^[^ ]/g,match=>(match.toUpperCase()));
        return newStr;
        }
    // Dodavanje pojma u firebase
    async newTerm(kategorija, p) {
        let pojam = this.stringCheck(p);
        let time = new Date();
        //kreiranje dokumenta koji će biti dodat firebase-u
        let newInput = {
            pocetnoSlovo: this.firstLetter(pojam),
            korisnik: this.korisnik,
            kategorija: kategorija,
            pojam: pojam,
            vreme: firebase.firestore.Timestamp.fromDate(time)
        };
        
        let response = await this.inputs.add(newDoc);
        return response;
    }

    // Provera da li pojavm već postoji
    checkIfExists(kategorija, p, callback) {
        let flag = true;
        let pojam = this.stringCheck(p);
        this.inputs
            .where('kategorija', '==', kategorija)
            .where('pojam', '==', pojam)
            .get()
            .then( snapshot => {
                snapshot.docs.forEach( doc => {
                    if(doc.data()) {
                        flag = false;
                    }
                });
                callback(flag);
            })
            .catch( error => {
               console.log(error);
            });
    }
    
}
