import api from './api';

class BrukerService {

  lagNyBruker(nyBruker) {
    console.log('lage');
    return api.post('/api/lagNyBruker', nyBruker);
    return api.post('/api/brukere', nyBruker);
  }

  lagNyPrivatBruker(nyPrivatBruker) {
    return api.post('/api/brukere/privat', nyPrivatBruker);
  } 

  endrePassord(nyInformasjon) {
    console.log('endre');
    return api.post('/api/resett-passord', nyInformasjon);
  }

  loggInn(informasjon) {
    console.log('asdad');
    return api.post('/api/sjekkPassord', informasjon);
  }

  glemtPassord(input){
    console.log('brukerservice');
    return api.get('/api/glemt-passord/',input);
  }
  
  hentbrukere(){
    console.log('hente brukere');
    return api.get('/api/hentbrukere');
  }
}

export let brukerService = new BrukerService();

