import * as React from 'react';
import {Component} from 'react-simplified';
import {generellServices} from '../../services/generellServices';
import {Link} from 'react-router-dom';

export class KommuneInput extends Component {
  sok = '';
  listesyn = false;
  kommuner = [];
  kommuner_filtrert = [];
  valgt_index = 0;
  in;
  boks;
  verdi = null;

  constructor(props) {
    super(props);
    this.in = React.createRef();
    this.boks = React.createRef();
  }

  render() {
    return (
      <div className="komBoks" style={this.props.style}>
        <input
          ref={this.in}
          onFocus={() => {
            if (this.sok.length > 0) this.listesyn = true;
          }}
          onBlur={() => {
            setTimeout(() => {
              this.listesyn = false;
            }, 100);
          }}
          className="komSok2 form-control"
          placeholder="Søk.."
          value={this.sok}
          onChange={this.oppdaterSok}
          type="text"
        />
        <ul ref={this.boks} className="komListe" style={{display: this.listesyn ? 'block' : 'none'}}>
          {this.kommuner_filtrert.map((kommune, i) => (
            <li
              onClick={() => this.velg(i)}
              key={kommune.kommune_id}
              className={i == this.valgt_index ? 'komV komValgt' : 'komV'}
            >
              {kommune.kommune_navn}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  velg(index) {
    if (this.kommuner_filtrert.length > 0) {
      this.listesyn = false;
      this.verdi = this.kommuner_filtrert[index].kommune_id;
      this.valgt_index = index;
      this.sok = this.kommuner_filtrert[index].kommune_navn;
      this.props.onChange && this.props.onChange({navn: this.sok, id: this.verdi});
    }
  }

  async mounted() {
    this.in.current.addEventListener('keydown', (e) => {
      this.inputup(e);
    });
    let res = await generellServices.hentAlleKommuner();
    this.kommuner = await res.data;

    if (this.props.kommune_id) {
      this.verdi = this.props.kommune_id;
      this.sok = await res.data.find((kommune) => kommune.kommune_id==this.verdi).kommune_navn;
      await this.props.onChange && this.props.onChange({navn: this.sok, id: this.verdi});
    }
  }

  inputup(e) {
    if (e.key == 'Enter') {
      this.velg(this.valgt_index);
    } else if (e.key == 'ArrowDown') {
      //NED
      e.preventDefault();
      this.valgt_index++;
      if (this.valgt_index > this.kommuner_filtrert.length - 1) this.valgt_index = this.kommuner_filtrert.length - 1;

      let liste = this.boks.current;
      let valgt = liste.children[this.valgt_index];

      if (valgt.offsetTop + valgt.offsetHeight > liste.scrollTop + liste.clientHeight) {
        liste.scrollTo(0, valgt.offsetTop + valgt.offsetHeight - liste.clientHeight);
      }
    } else if (e.key == 'ArrowUp') {
      //OPP
      e.preventDefault();
      this.valgt_index--;
      if (this.valgt_index < 0) this.valgt_index = 0;

      let liste = this.boks.current;
      let valgt = liste.children[this.valgt_index];

      if (valgt.offsetTop < liste.scrollTop) {
        liste.scrollTo(0, valgt.offsetTop);
      }
    }
  }

  oppdaterSok(e) {
    this.verdi = null;
    this.sok = e.target.value;

    this.kommuner_filtrert = [];
    if (this.sok.length > 0) {
      for (let i = 0; i < this.kommuner.length; i++) {
        let match = true;
        for (let j = 0; j < this.sok.length; j++) {
          if (this.kommuner[i].kommune_navn.toLowerCase().charAt(j) != this.sok.toLowerCase().charAt(j)) {
            match = false;
          }
        }
        if (match) {
          this.kommuner_filtrert.push(this.kommuner[i]);
          if (this.kommuner[i].kommune_navn.toLowerCase() == this.sok.toLowerCase()) {
            this.verdi = this.kommuner[i].kommune_id;
          }
        }
      }

      if (this.valgt_index < 0) this.valgt_index = 0;
      else if (this.valgt_index > this.kommuner_filtrert.length - 1)
        this.valgt_index = this.kommuner_filtrert.length - 1;

      this.listesyn = true;
    } else {
      this.listesyn = false;
    }

    this.props.onInputChange && this.props.onInputChange({navn: this.sok, id: this.verdi});
  }
}
