//kjør boi

import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import {brukerService} from '../../services/brukerService';

export class Login extends Component {
  advarsel = "";
  data = {
    epost: "",
    passord: "",
  }

  render() {
    return (
      <div className="dropdown">
        <button type="button" className="logginnbutton btn btn-light border border-dark" data-toggle="dropdown">
          Logg inn
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdownbox">
          <div className="arrow"></div>
          <div className="arrowborder"></div>
          <div className="form-group">
            <label htmlFor="epost">E-post:</label>
            <input type="text" value={this.data.epost} onChange={this.endre} name="epost" className="form-control" id="epost" placeholder="E-post"></input>
            <label htmlFor="passord">Passord:</label>
            <input type="password" value={this.data.passord} onChange={this.endre} name ="passord" className="form-control" id="passord" placeholder="Passord"></input>
            <p className="glemtLink">Glemt passord?</p>
            <p>{this.advarsel}</p>
          </div>
          
          <button className="myLoginButton" onClick={this.login}>Logg inn</button>
          <button style={{float:"right"}} className="myLoginButton" onClick={this.login}>Registrer deg</button>
        </div>
      </div>
    );
  }

  endre(e) {
    this.data[e.target.name] = e.target.value;
  }

  sjekkPassord(result){
    if(result){
      this.props.history.push('/hovedside/trondheim');
    } else {
      console.log(result)
      this.advarsel = "Feil brukernavn eller passord!";
    }
  }

  async login() {
    console.log(this.data);
   let res = await brukerService.loggInn(this.data);
   //await console.log(res.data.result);
   await this.sjekkPassord(res.data.result);
  }
}