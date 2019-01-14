import axios from 'axios';
axios.interceptors.response.use((response) => response.data);

class BrukerService {

  lagNyBruker(nyBruker) {
    return axios.post('/api/lagNyBruker', nyBruker);
  }

  endrePassord(nyInformasjon) {
    return axios.post('/api/lagNyBruker', nyInformasjon);
  }

  loggInn(informasjon) {
    return axios.post('/sjekkPassord', informasjon);
  }
  
}

export let brukerService = new BrukerService();
/*
class Bruker {
  bruker_id;
  constructor(
    epost,
    passord,
    kommune_id
  ) {
    this.epost = epost;
    this.passord = passord;
    this.kommune_id = kommune_id;
  }
}

module.exports = class Privat extends Bruker {
  constructor(
    epost,
    passord,
    kommune_id,
    fornavn,
    etternavn
  ) {
    super(epost, passord, kommune_id);
    this.fornavn = fornavn;
    this.etternavn = etternavn; 
  }
}

module.exports = class Ansatt extends Bruker {
  constructor(
    epost,
    passord,
    fornavn, 
    etternavn,
    telefon
  ) {
    super(epost, passord, kommune_id);
    this.fornavn = fornavn;
    this.etternavn = etternavn; 
    this.telefon = telefon;
  }
}

<<<<<<< HEAD

export class Bedrift extends Bruker  {
=======
module.exports = class Bedrift extends Bruker () {
>>>>>>> a253fa4d738c1f1b15527d0df31a3c775f5e9bf4
  constructor(
    epost,
    passord,
    kommune_id,
    orgnr, 
    navn,
    telefon
  ) {
    super(epost, passord, kommune_id);
    this.orgnr = orgnr;
    this.navn = navn; 
    this.telefon = telefon;
  }
}

<<<<<<< HEAD
export class Admin extends Bruker  {
=======
module.exports = class Admin extends Bruker () {
>>>>>>> a253fa4d738c1f1b15527d0df31a3c775f5e9bf4
  constructor(
    epost,
    passord,
    kommune_id,
    telefon, 
    navn
  ) {
    super(epost, passord, kommune_id);
    this.telefon = telefon;
    this.navn = navn;
  }
*/