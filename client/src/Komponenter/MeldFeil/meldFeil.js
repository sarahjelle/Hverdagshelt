import * as React from 'react';
import {Component} from 'react-simplified';
import {FormGroup, FormControl} from 'react-bootstrap';
import {FormInput, GronnKnapp} from '../../widgets';
import {KommuneInput} from '../../Moduler/kommuneInput/kommuneInput';
import {PositionMap} from '../../Moduler/kart/map';
import {feilService} from '../../services/feilService';
import {PageHeader} from '../../Moduler/header/header';

export class MeldFeil extends Component {
  kategoriene = [];
  subkategoriene = [];
  subkatfiltrert = [];
  kominput = React.createRef();

  data = {
    overskrift: '',
    kommune_id: 1,
    kategori_id: 1,
    subkategori_id: 1,
    beskrivelse: '',
    lengdegrad: 0,
    breddegrad: 0,
    avsjekket: 0,
  };

  render() {
    return (
      <>
        <PageHeader history={this.props.history} location={this.props.location} />
        <div id="blokk">
          <div>
            <h1 id="overskrift">Meld inn feil</h1>
          </div>
          <div>
            <div id="kommuneblokk">
              <label id="kommunelbl" htmlFor="kom">
                Kommune:
              </label>
              <KommuneInput onChange={this.getKom} ref={this.kominput} />
            </div>
            <div id="overskriftblokk">
              <FormInput
                type="text"
                label="Overskrift:"
                name="overskrift"
                onChange={this.endreVerdi}
                required
              />
            </div>
          </div>
          <div>
            <div id="kategoriblokk">
              <label id="kategorilbl" htmlFor="kat">
                Kategori:
              </label>
              <div>
                <FormGroup controlId="formControlsSelect">
                  <FormControl
                    componentClass="select"
                    onChange={this.handleChange}
                    inputRef={(node) => {
                      this.data.kategori_id = node;
                    }}
                  >
                    {this.kategoriene.map((katego) => (
                      <option key={katego.hovedkategori_id} value={katego.hovedkategori_id}>
                        {katego.kategorinavn}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </div>
            </div>
            <div id="subkategoriblokk">
              <label id="subkategorilbl" htmlFor="kat">
                Underkategori:
              </label>
              <div>
                <FormGroup controlId="formControlsSelect">
                  <FormControl
                    componentClass="select"
                    inputRef={(node) => {
                      this.data.subkategori_id = node;
                    }}
                  >
                    {this.subkatfiltrert.map((subkatego) => (
                      <option key={subkatego.subkategori_id} value={subkatego.subkategori_id}>
                        {subkatego.kategorinavn}
                      </option>
                    ))}
                  </FormControl>
                </FormGroup>
              </div>
            </div>
          </div>
          <div>
            <div id="beskblokk">
              <label id="beskrivelselbl" htmlFor="bes">
                Beskrivelse:
              </label>
              <br />
              <textarea type="text" id="bes" value={this.data.beskrivelse} name="beskrivelse" onChange={this.endreVerdi} />
            </div>
            <div id="bilete">
              <label id="billbl" htmlFor="bil">
                Bilder:
              </label>
              <br />
              <input type="file" id="bil" accept="image/*" name="bil" multiple />
            </div>
          </div>
          <div id="posblokk">
            <label id="poslbl" htmlFor="pos">
              Posisjon:
            </label>
            <PositionMap width="100%" height="500px" id="posmap" center="Trondheim" position={this.posFunksjon} />
          </div>
          <div id="sjekkboks">
            <div id="boksen">
              <input onChange={this.endreVerdi} name="avsjekket" type="checkbox" name="Abonner" value="Abonner" />
            </div>
            <div id="boksenlbl">
              <label>Abonner på denne saken</label>
            </div>
          </div>
          <div id="meldinnknapp">
            <GronnKnapp onClick={this.send}>Meld inn</GronnKnapp>
          </div>
        </div>
      </>
    );
  }

  async mounted() {
    let hkat = await feilService.hentAlleHovedkategorier();
    this.kategoriene = await hkat.data;
    let skat = await feilService.hentAlleSubkategorier();
    this.subkategoriene = await skat.data;
    this.subkatfiltrert = await skat.data.filter((kat) => 1 == kat.hovedkategori_id);
  }

  async handleChange(e) {
    this.data.kategori_id = e.target.value;
    this.subkatfiltrert = this.subkategoriene.filter((kat) => this.data.kategori_id == kat.hovedkategori_id);
  }

  send() {
    let formData = new FormData();
    this.data.kommune_id = this.kominput.current.verdi;
    formData.append('kommune_id', this.data.kommune_id);
    formData.append('overskrift', this.data.overskrift);
    formData.append('kategori_id', this.data.kategori_id.value);
    formData.append('subkategori_id', this.data.subkategori_id.value);
    formData.append('beskrivelse', this.data.beskrivelse);
    formData.append('lengdegrad', this.data.lengdegrad);
    formData.append('breddegrad', this.data.breddegrad);
    formData.append('avsjekket', this.data.avsjekket);
    Array.from(document.querySelector('#bil').files).forEach((file) => {if (file.type.match('image.*')) formData.append('bilder', file, file.name);})

    let token = sessionStorage.getItem('pollett');
    if (token) {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/feil ', true);
      xhr.setRequestHeader("x-access-token", 'Bearer ' + token)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          this.props.history.push('/');
        }
      };
      xhr.send(formData);
    } else {
      global.sidePush("/", true);
    }
  }

  posFunksjon(pos) {
    this.data.breddegrad = pos.lat;
    this.data.lengdegrad = pos.lng;
  }

  endreVerdi(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target.checked ? 1 : 0) : target.value;
    const name = target.name;
    this.data[name] = value;
  }
}
