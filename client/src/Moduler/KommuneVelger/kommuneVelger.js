import * as React from 'react';
import {Component} from 'react-simplified';
import {generellServices} from '../../services/generellServices';
import {Link} from 'react-router-dom';

/**
 * Søkefelt for å komme seg til en viss kommuneside. For søkefelt for å velge en kommune i en <form> eller lignende se: {@link KommuneInput}
 * @reactProps {Object} history - history objektet til komponenten som skal bruke KommuneVelger
 */
export class KommuneVelger extends Component {
  /** 
   * Søketeksten 
   * @type {string} */
  sok = '';

  /** 
   * Om listen over kommuner skal vises
   * @type {boolean} 
   * @default false */
  listesyn = false;

  /** Liste over alle kommuner 
   * @type {Kommune[]} */
  kommuner = [];

  /** Liste over kommuner som matcher med søketeksten 
   * @type {Kommune[]}*/
  kommuner_filtrert = [];

  /** Index til kommunen som er valgt i listen 
   * @type {number} */
  valgt_index = 0;

  /** Referanse til input boks */
  in;

  /** Referanse til kommunelisten */
  boks;

  constructor(props) {
    super(props);
    this.in = React.createRef();
    this.boks = React.createRef();
  }

  render() {
    return (
      <div className="komBoks">
        <input
          ref={this.in}
          style={this.listesyn ? {borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px'} : {}}
          className="form-control input-lg komSok"
          value={this.sok}
          placeholder="Finn din kommune.."
          onChange={this.oppdaterSok}
          type="text"
        />
        <ul ref={this.boks} className="komListe" style={{display: this.listesyn ? 'block' : 'none'}}>
          {this.kommuner_filtrert.map((kommune, i) => (
            <li
              onClick={() => {
                //global.sidePush('/hovedside/' + kommune.kommune_navn.toLowerCase());
                this.navigate('/hovedside/' + kommune.kommune_navn.toLowerCase());
              }}
              key={kommune.kommune_id}
              className={i == this.valgt_index ? 'komElement komValgt' : 'komElement'}
            >
              {kommune.kommune_navn}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  /**@ignore */
  async mounted() {
    this.in.current.addEventListener('keydown', (e) => {
      this.inputup(e);
    });
    let res = await generellServices.hentAlleKommuner();
    this.kommuner = await res.data;
  }
  /**@ignore */
  navigate(path) {
    this.sok = '';
    this.listesyn = false;
    this.kommuner_filtrert = [];
    this.valgt_index = 0;
    this.props.history.push(path);
  }
  /**@ignore */
  inputup(e) {
    if (e.key == 'Enter') {
      if (this.kommuner_filtrert.length > 0) {
        //global.sidePush('/hovedside/' + this.kommuner_filtrert[this.valgt_index].kommune_navn.toLowerCase());
        this.navigate('/hovedside/' + this.kommuner_filtrert[this.valgt_index].kommune_navn.toLowerCase());
      }
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
  /**@ignore */
  oppdaterSok(e) {
    this.sok = e.target.value;

    if (this.sok.length > 0) {
      this.kommuner_filtrert = [];
      for (let i = 0; i < this.kommuner.length; i++) {
        let match = true;
        for (let j = 0; j < this.sok.length; j++) {
          if (this.kommuner[i].kommune_navn.toLowerCase().charAt(j) != this.sok.toLowerCase().charAt(j)) {
            match = false;
          }
        }
        if (match) this.kommuner_filtrert.push(this.kommuner[i]);
      }

      if (this.valgt_index < 0) this.valgt_index = 0;
      else if (this.valgt_index > this.kommuner_filtrert.length - 1)
        this.valgt_index = this.kommuner_filtrert.length - 1;

      this.listesyn = this.kommuner_filtrert.length > 0;
    } else {
      this.listesyn = false;
    }
  }
}
