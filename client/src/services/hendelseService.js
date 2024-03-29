import api from './api';

class HendelseService {
  hentAlleHendelser() {
    return api.get('/api/hendelser');
  }

  hentHendelserForKommune(kommune_id) {
      return api.get('/api/kommuner/hendelser/'+kommune_id);
  }

  hentEnHendelse(hendelse_id) {
    return api.get('/api/hendelser/' + hendelse_id);
  }

  oppdaterHendelse(oppdatertHendelse) {
    return api.put('/api/hendelser/:hendelse_id', oppdatertHendelse);
  }

  slettHendelse(hendelse_id) {
    let token = sessionStorage.getItem('pollett');
    if(token) {
      return api.delete('/api/hendelser/'+hendelse_id, {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  slettHendelseKategori(hendelse_id){
    let token = sessionStorage.getItem('pollett');
    if(token) {
      return api.delete('/api/hendelser/hendelseskategorier/'+hendelse_id,{headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  filtrerHendelserPaaKategori(hek_id) {
    return api.get('/api/hendelser/kategorier/'+hek_id);
  }

  filtrerHendelserPaaKommune(k_id) {
    return api.get('/api/hendelser/kommuner/:kommune_id'+k_id);
  }

  hentAlleHovedkategorier() {
    return api.get('/api/hendelser/hoved/kategorier');
  }

  hentAlleKategorier(){
    return api.get('/api/hendelseskat');
  }

  opprettHendelseskategori(json) {
    let token = sessionStorage.getItem('pollett');
    if(token) {
      return api.post('/api/hendelser/hendelseskategorier', json, {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  oppdaterHendelseskategori(json, hek_id) {
    let token = sessionStorage.getItem('pollett');
    if(token) {
      return api.put('/api/hendelser/hendelseskategorier/'+hek_id, json, {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  abonner(hendelse_id) {
    let token = sessionStorage.getItem('pollett');
    if (token) {
      return api.post('/api/hendelser/' + hendelse_id + '/abonnement',null , {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  ikkeAbonner(hendelse_id) {
    let token = sessionStorage.getItem('pollett');
    if (token) {
      return api.delete('/api/hendelser/' + hendelse_id + '/abonnement', {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

  oppdaterHendelseskategori(hek_id) {
    let token = sessionStorage.getItem('pollett');
    if(token) {
      return api.delete('/api/hendelser/hendelseskategorier/'+hek_id, {headers: {'x-access-token': 'Bearer ' + token}});
    } else {
      return null;
    }
  }

}

export let hendelseService = new HendelseService();