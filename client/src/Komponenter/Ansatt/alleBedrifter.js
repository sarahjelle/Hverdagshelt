import * as React from 'react';
import {Component} from 'react-simplified';
import {PageHeader} from '../../Moduler/header/header';
import {Card, Feed, Grid, Button, Header, Icon, Input, Image, Modal, List, CardContent} from 'semantic-ui-react';
import {FeedEvent, Filtrer, Info} from '../../Moduler/cardfeed';
import {feilService} from '../../services/feilService';
import {markerTabell, ShowMarkerMap} from '../../Moduler/kart/map';
import {NavLink} from 'react-router-dom';
import {AnsattMeny} from './ansattMeny';
import { brukerService } from '../../services/brukerService';

export class AlleBedrifter extends Component{
    bedrifter = [];
    className = '';
    bedApen = false; 
    feilApen = false; 
    valgtBed = '';
    feilHosBedrift = [];
    valgtFeil = {
        feil_id: "",
        overskrift: "",
        beskrivelse: ""
    }
    oppdateringer = [];

    openBed(bed){
        this.valgtBed = {...bed};
        this.bedApen = true;
        this.hentFeil(bed);
    }

    async hentFeil(bed){
        let res1 = await feilService.hentFerdigeFeilForAnsatt(bed.orgnr);
        this.feilHosBedrift = await res1.data; 
        await console.log(this.feilHosBedrift);
        
    }

    async hentOppdateringer(feil){
        let res = await feilService.hentAlleOppdateringerPaaFeil(feil.feil_id);
        this.oppdateringer = await res.data; 
        await console.log(this.oppdateringer);
    }

    visFeil(feil){
        this.valgtFeil = {...feil};
        this.hentOppdateringer(feil);
        this.feilApen = true;
    }

    render(){
        return(
            <div>
                <PageHeader/>
                <div className="vinduansatt containter-fluid">
                    <AnsattMeny/>
                    <div className="row justify-content-md-center mt-3 mb-3">
                        <h1>Alle bedrifter</h1>
                    </div>
                    <div className="ansattContent">
                        <div className="row">
                            <div className="col-sm-4">
                                <Card color="red" fluid>
                                    <Card.Content>
                                        <Card.Header>
                                            Nye innsendinger
                                        </Card.Header>
                                    </Card.Content>
                                    <Card.Content className={this.className}>
                                        {this.bedrifter.map((bed) => (
                                            <Feed>
                                                <Feed.Event onClick={() => this.openBed(bed)}>
                                                    <Feed.Content>
                                                        <Feed.Summary>{bed.navn}</Feed.Summary>
                                                        <Feed.Date content={bed.telefon}/>
                                                    </Feed.Content>
                                                </Feed.Event>  
                                            </Feed>
                                                                 
                                        ))}
                                    </Card.Content>
                                </Card>
                            </div>
                            <div className="col-sm-8">
                                {this.bedApen ? (
                                    <div>
                                       <Card fluid className="bedrifterVindu">
                                            <Card.Header textAlign="center"><h3>{this.valgtBed.navn}</h3></Card.Header>
                                            <Card.Content>
                                            <Grid fluid>
                                                <Grid.Column width={4}>
                                                    <div className="oppdateringScroll">
                                                        <List divided relaxed>
                                                            {this.feilHosBedrift.map((feil) => (
                                                                <List.Item onClick={() => this.visFeil(feil)}>
                                                                    <List.Content>
                                                                        <List.Header>{feil.overskrift}</List.Header>
                                                                        <List.Description>{feil.tid}</List.Description>
                                                                    </List.Content>
                                                                </List.Item>
                                                            ))}
                                                        </List> 
                                                    </div>                                               
                                                </Grid.Column>
                                                <Grid.Column width={12}>
                                                    {this.feilApen ? (
                                                        <Grid columns={2}>
                                                            <Grid.Column>
                                                                <h5>Overskrift: </h5>
                                                                {this.valgtFeil.overskrift}
                                                                <h5>Beskrivelse:</h5>
                                                                {this.valgtFeil.beskrivelse}
                                                                <ShowMarkerMap key={this.valgtFeil.feil_id} width="100%" height="85%" id="posmap" feil={this.valgtFeil} />
                                                            </Grid.Column>
                                                            <Grid.Column>
                                                                <div className="oppdateringScroll">
                                                                    <List className="p-2">
                                                                        {this.oppdateringer.map((opp) => (
                                                                        <List.Item>
                                                                        <List.Content>
                                                                            <List.Header>{opp.status}<span className="float-right font-weight-light font-italic">{opp.tid}</span></List.Header>
                                                                            <List.Description>{opp.kommentar}</List.Description>
                                                                        </List.Content>
                                                                        </List.Item>
                                                                        ))}
                                                                    </List>
                                                                </div>
                                                            </Grid.Column>
                                                        </Grid>
                                                    ):(
                                                        <div>Trykk på en feil i lista for å se mer informasjon</div>
                                                    )}
                                                </Grid.Column>
                                            </Grid>
                                            </Card.Content>
                                       </Card>
                                    </div>
                                ):(
                                    <div>
                                        Velg en bedrift for å se mer informasjon
                                    </div>
                                )}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }

    scroll() {
        if (this.bedrifter.length > 5) {
          this.className = 'ansattScroll';
        }
      }
    
      async mounted() {
        let bed = await brukerService.hentBedrifter();
        this.bedrifter = await bed.data; 
        await console.log(this.bedrifter);
        
        await this.scroll();
      }
    
}