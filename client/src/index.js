/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component, sharedComponentData} from 'react-simplified';
import {Router, Route, NavLink, Redirect, Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {BildeTest} from './bildetest';
import {MeldFeil} from './Komponenter/MeldFeil/meldFeil';
import Popup from 'reactjs-popup';
import {Registrering} from './Komponenter/Registrering/registrering';
import {RegistrerBedrift} from './Komponenter/Registrering/registrerBedrift';
import {MineOppgaver} from './Komponenter/Ansatt/mineOppgaver';
import {generellServices} from './services/generellServices';
import {RodKnapp} from './widgets';
import {Login} from './Moduler/login/login';
import {Forside} from './Komponenter/Forside/forside';
import {PositionMap, Marker, MarkerMap, markerTabell} from './Moduler/kart/map';
import {Hovedside} from './Komponenter/hovedside/hovedside';
import {Minside} from './Komponenter/MinSide/minside';
import {PageHeader} from './Moduler/header/header';
import {FireNullFire} from './Komponenter/firenullfire/firenullfire';

import {GlemtPassord} from '../src/Komponenter/GlemtPassord/glemtPassord';
import {ResettPassord} from '../src/Komponenter/GlemtPassord/resettPassord';
import {Hendelser} from '../src/Komponenter/Hendelser/hendelser';
import {Bedrift} from '../src/Komponenter/Bedrift/bedrift';

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

import {relative} from 'path';
import {KommuneVelger} from './Moduler/KommuneVelger/kommuneVelger';
import {KommuneInput} from './Moduler/kommuneInput/kommuneInput';
import {enHendelse} from './Komponenter/Hendelser/enHendelse';

import {NyeFeil} from './Komponenter/Ansatt/ansattNye';
import {AnsattFerdig} from './Komponenter/Ansatt/ansattFerdige';
import {NyHendelse} from './Komponenter/Ansatt/nyhendelse';
import {AnsattOversikt} from './Komponenter/Ansatt/ansattOversikt';
import {AnsattUnder} from './Komponenter/Ansatt/ansattUnderBehandling';
import { AnsattHendelser } from './Komponenter/Ansatt/ansattHendelser';
import { Administrasjon } from './Komponenter/Admin/admin';

class Tabell extends Component {
  render() {
    return (
      <div className="ml-3">
        <h5>{this.props.hovedOverskrift}</h5>
        <br />
        <div className="kanter">
          <nav>
            <ul className="list-group">
              <li className="kanter lister">I dag</li>
              {this.props.tabell.map((tabell) => (
                <li className="kanter lister">
                  <NavLink
                    to={'/hovedside/' + this.props.kommune}
                    onClick={() => {
                      this.props.metode(tabell.overskrift);
                    }}
                  >
                    {tabell.overskrift}
                    <br />
                    <i>{this.props.tema}</i>
                    <span className="float-right">{tabell.tid}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

//<PositionMap width="100%" height="500px" id="posmap" center="Oslo" position={this.posisjon}></PositionMap>
class Menu extends Component {
  tekst = '';
  feil = [
    {
      overskrift: 'Det er et problem her',
      beskrivelse:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bildeurl: 'https://bjornost.tihlde.org/hverdagshelt/135d6d0f44a6ba73e3782c243663b90a',
      status: 'Ikke godkjent',
      tid: '10/12/2018, 10:53',
      hovedkategori: 'Veiarbeid',
      kategorinavn: 'Hull i veien',
      breddegrad: 59.913777,
      lengdegrad: 10.722702,
    },
  ];
  markers = markerTabell(this.feil);
  markers2 = [
    new Marker(
      'Det er et problem her',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      'https://bjornost.tihlde.org/hverdagshelt/135d6d0f44a6ba73e3782c243663b90a',
      1,
      '10/12/2018, 10:53',
      'Veiarbeid',
      59.911599,
      10.743839
    ),
    new Marker(
      'Det er et problem her',
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      'https://bjornost.tihlde.org/hverdagshelt/ac78b6d904ceb783e9da802a5c84ea7b',
      2,
      '10/12/2018, 10:53',
      'Veiarbeid',
      59.913777,
      10.722702
    ),
  ];

  breddegrad = 59.913777;
  lengdegrad = 10.722702;

  flytt() {
    this.kart.flyttKart(this.breddegrad, this.lengdegrad);
  }

  render() {
    return (
      <div>
        <p>hehehehe</p>
        <MarkerMap
          width="100%"
          height="500px"
          id="mapr"
          markers={this.markers}
          center="Oslo"
          onRef={(ref) => (this.kart = ref)}
        />
        <button onClick={this.flytt} />
      </div>
    );
  }
}

class komtest extends Component {
  kominput;

  constructor(props) {
    super(props);
    this.kominput = React.createRef();
  }

  render() {
    return (
      <>
        <div style={{width: '300px'}}>
          <KommuneInput ref={this.kominput} />
          {this.komm}
        </div>
        <button onClick={this.test}>test</button>
      </>
    );
  }

  test() {
    alert(this.kominput.current.verdi);
  }
}

global.sideRefresh = (hard) => {
  setTimeout(() => {
    let path = window.location.pathname;
    history.push('/refresh');
    if (hard) ReactDOM.render(routes(), root);
    history.replace(path);
  }, 0);
};

global.sidePush = (path, hard) => {
  setTimeout(() => {
    history.push('/refresh');
    if (hard) ReactDOM.render(routes(), root);
    history.replace(path);
  }, 0);
};

let token = sessionStorage.getItem('pollett');
if (token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  global.payload = JSON.parse(window.atob(base64));
}

const routes = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          {/*Routes som er tilgjengelige for alle*/}
          <Route
            exact
            path="/refresh"
            component={() => {
              return null;
            }}
          />
          <Route exact path="/" component={Forside} history={history} />
          <Route exact path="/hovedside/:kommune" component={Hovedside} history={history} />
          <Route exact path="/resett-passord/:token" component={ResettPassord} />
          <Route exact path="/hendelser" component={Hendelser}/>
          <Route exact path="/hendelser/:id" component={enHendelse} />

          {/*Under ligger spesielle routes*/}
          {global.payload == null
            ? //Ikke logget inn
              [
                <Route exact path="/registrering" key="registrering" component={Registrering} history={history} />,
                <Route exact path="/glemt-passord" key="glemt-passord" component={GlemtPassord} />,
                <Redirect from="/meldfeil" key="meldfeil" to="/" />,
                <Redirect from="/minside" key="minside" to="/" />,
                <Redirect from="/mineoppgaver" key="mineoppgaver" to="/" />,
              ]
            : global.payload.role == 'privat'
            ? //Privatbruker routes
              [
                <Route exact path="/meldfeil" key="meldfeil" component={MeldFeil} history={history} />,
                <Route exact path="/minside" key="minside" component={Minside} history={history} />,
              ]
            : global.payload.role == 'ansatt'
            ? //Ansatt routes
              [
                <Route exact path="/mineoppgaver" key="mineoppgaver" component={MineOppgaver} history={history} />,
                <Route exact path="/registrerBedrift" key="registrerbedrift"component={RegistrerBedrift} history={history} />,
                <Route exact path="/ansatt/nyefeil" key="nyefeil" component={NyeFeil} history={history}/>,
                <Route exact path="/ansatt/nyhendelse" key="nyhendelse" component={NyHendelse} history={history}/>,
                <Route exact path="/ansatt/oversikt" key="oversikt" component={AnsattOversikt} history={history}/>,
                <Route exact path="/ansatt/underbehandling" key="underbehandling" component={AnsattUnder} history={history}/>,
                <Route exact path="/ansatt/ferdig" key="ferdig" component={AnsattFerdig} history={history}/>,
                <Route exact path="/ansatt/hendelser" key="hendelser"component={AnsattHendelser} history={history}/>,
              ]
            : global.payload.role == 'bedrift'
            ? //Bedrift routes
              [<Route exact path="/mineoppgaver" key="mineoppgaver" component={Bedrift} history={history} />]
            : global.payload.role == 'admin'
            ? //Admin routes
              [
              <Route exact path="/meldfeil" key="meldfeil" component={MeldFeil} history={history} />,
              <Route exact path="/administrasjon" key="administrasjon" component={Administrasjon} history={history} />,
              ]
            : null}

          {/*legg test-routes under*/}
          <Route exact path="/kommunevalgtest" component={KommuneVelger} history={history} />
          <Route exact path="/kinput" component={komtest} />
          <Route exact path="/bildetest" component={BildeTest} />
          <Route exact path="/nyheter" component={Menu} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/headertest" component={PageHeader} history={history} />
          <Route exact path="/ansattest" component={NyeFeil} history={history} />
          <Route exact path="/ferdigtest" component={AnsattFerdig} history={history}/>
          <Route exact path="/nyhendelsetest" component={NyHendelse} history={history}/>

          <Route exact path="/headertest" component={PageHeader} history={history} />
          <Route exact path="/bedriftsoppgaver" component={Bedrift} history={history} />

          {/*Siden eksisterer ikke/ingen tilgang*/}
          <Route component={FireNullFire} />
        </Switch>
      </div>
    </Router>
  );
};

const root = document.getElementById('root');
if (root) ReactDOM.render(routes(), root);
