import Dao from './dao.js';

module.exports = class BrukerDao extends Dao {
  lagNyBruker(json, callback) {
    const tabell = [json.epost, json.passord, json.kommune_id];
    super.query('INSERT INTO bruker VALUES(DEFAULT,?,?,?)', tabell, callback);
  }

  finnBruker_id(json, callback) {
    let epost = [json.epost];
    super.query('SELECT bruker_id FROM bruker WHERE epost=?', epost, callback);
  }

  lagNyPrivatBruker(json, callback) {
    let self = this;
    self.finnBruker_id(json, (status, data) => {
      if (data[0].length == 0) {
        self.lagNyBruker(json, (status, data) => {
          console.log(status);
          super.query(
            'INSERT INTO privat VALUES(?,?,?)',
            [data.insertId, json.fornavn, json.etternavn],
            callback
          );
        });
      } else {
        callback(403, {error: 'E-post eksisterer allerede.'});
      }
    });
    
  }

  lagNyAnsattBruker(json, callback) {
    let self = this;
    self.lagNyBruker(json, (status, data) => {
      self.finnBrukerid(json, (status, data) => {
        super.query(
          'INSERT INTO ansatt VALUES(?,?,?,?)',
          [res.json(data), json.fornavn, json.etternavn, json.telefon],
          callback
        );
      });
    });
  }

  lagNyBedriftBruker(json, callback) {
    let self = this;
    self.lagNyBruker(json, (status, data) => {
      self.finnBrukerid(json, (status, data) => {
        super.query(
          'INSERT INTO bedrift VALUES(?,?,?)',
          [res.json(data), json.orgnr, json.navn, json.telefon],
          callback
        );
      });
    });
  }

  lagNyAdminBruker(json, callback) {
    let self = this;
    self.lagNyBruker(json, (status, data) => {
      self.finnBrukerid(json, (status, data) => {
        super.query(
          'INSERT INTO admin VALUES(?,?,?)',
          [res.json(data), json.telefon, json.navn],
          callback
        );
      });
    });
  }

  hentBruker(json, callback) {
    let tabell = [json.epost];
    console.log(tabell + 'bruker dao');
    super.query('SELECT * FROM bruker WHERE epost=?', tabell, callback);
  }

  hentBrukere(callback) {
    super.query('SELECT * FROM bruker', [], callback);
  }

  endrePassord(json, callback) {
    const tabell = [json.passord, json.epost];
    super.query('UPDATE bruker SET passord=? WHERE epost=?', tabell, callback);
  }
};
