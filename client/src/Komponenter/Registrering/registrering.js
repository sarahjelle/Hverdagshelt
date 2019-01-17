import * as React from 'react';
import {Component} from 'react-simplified';
import {brukerService} from '../../services/brukerService';
import {PageHeader} from '../../Moduler/header/header';
import {Privat} from '../../objekter.js';
import {KommuneInput} from '../../Moduler/kommuneInput/kommuneInput';

export class Registrering extends Component {
  brukerInput = {
    fornavn: '',
    etternavn: '',
    epost: '',
    passord: '',
    bekreftPass: '',
  };
  passAdvarsel = '';
  advarsel = '';
  kommune;

  constructor(props) {
    super(props);
    this.kommune = React.createRef();
  }

  render() {
    return (
      <div>
      <PageHeader history={this.props.history}/>
      <h1 className="text-center text-capitalize display-4">Registrering</h1>
      <div className="container">
        <div className = "row">
          <div className="col">
            <div className="form-group">
              <label>Fornavn:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Fornavn"
                value={this.brukerInput.fornavn}
                onChange={this.endreVerdi}
                name="fornavn"
                required={true}
              />
            </div>
          </div>
            <div className="col">
              <div className="form-group">
                <label>Etternavn:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Etternavn"
                  value={this.brukerInput.etternavn}
                  onChange={this.endreVerdi}
                  name="etternavn"
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>E-post:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="E-post"
                  value={this.brukerInput.epost}
                  onChange={this.endreVerdi}
                  name="epost"
                  required={true}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Skriv inn din kommune: </label>
                <KommuneInput ref={this.kommune} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Passord:</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.brukerInput.passord}
                  onChange={this.endreVerdi}
                  name="passord"
                  required={true}
                />
                <small id="passHjelp" className="form-text text-muted">
                  Passordet må være minst 8 tegn langt
                </small>
                <label>{this.passAdvarsel}</label>
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Bekreft passord:</label>
                <input
                  type="password"
                  className="form-control"
                  required={true}
                  value={this.brukerInput.bekreftPass}
                  onChange={this.endreVerdi}
                  name="bekreftPass"
                />
                <label id="passordSjekk">{this.advarsel}</label>
              </div>
            </div>
          </div>
          {/*

        <div className="valg">
          <p>Hva ønsker du å bli varslet om i din kommune?</p>
          <br />
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            />
            <label className="form-check-label" htmlFor="defaultCheck1">
              Planlagt strømbrudd
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck2"
            />
            <label className="form-check-label" htmlFor="defaultCheck3">
              Planlagt vann- og avløpsarbeid
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck3"
            />
            <label className="form-check-label" htmlFor="defaultCheck3">
              Konserter
            </label>
          </div>
          <br />
          <p>Du kan endre varselinnstillinger på MinSide senere.</p>
        </div>
        */}
          <br />
          <div className="row knappDiv">
            <button
              id="registrer"
              className="btn btn-primary"
              onClick={this.lagre}
            >
              Registrer deg
            </button>
            <button id="avbryt" className="btn btn-secondary">
              Avbryt
            </button>
          </div>
        </div>
      </div>
    );
  }


  lagre() {
    if (this.brukerInput.passord.length < 8) {
      this.passAdvarsel = 'Passord må være minst 8 tegn';
    }

    if (
      this.brukerInput.bekreftPass === this.brukerInput.passord &&
      this.brukerInput.passord.length >= 8
    ) {
      this.advarsel = '';
      let bruker = new Privat(
        0,
        this.brukerInput.epost,
        this.brukerInput.passord,
        this.kommune.current.verdi,
        this.brukerInput.fornavn,
        this.brukerInput.etternavn
      );
      //console.log(bruker.epost);
      if (bruker.epost.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        brukerService.lagNyPrivatBruker(bruker)
        .then((res) => {
          console.log(bruker.epost);
          console.log(res.status);
          //this.props.history.push('/');
        });
      } else {
        this.advarsel = 'Ugyldig e-post';
      }
    } else {
      this.advarsel = 'Passord stemmer ikke';
    }
  }

  endreVerdi(e) {
    const target = e.target;
    const value =
      target.type === 'checkbox' ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;
    this.brukerInput[name] = value;
  }
}
