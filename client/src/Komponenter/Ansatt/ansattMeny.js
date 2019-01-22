import * as React from 'react';
import {Component} from 'react-simplified';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

export class AnsattMeny extends Component {  
    render() {
      
      return (
        <div>
          <Menu vertical fixed="left" className="ansattMenyContainer">
            <Menu.Item>
              <Menu.Header>Feil og mangler</Menu.Header>
  
              <Menu.Menu>
                <Menu.Item
                    name='Oversikt'
                    as={NavLink}
                    to='/ansatt/nyefeil'
                />
                <Menu.Item
                  name='Nye feil'
                  as={NavLink}
                  to={'/ansatt/nyefeil'}
                />
                <Menu.Item
                  name='Under arbeid'
                />
                <Menu.Item
                  name='Ferdig'
                />
              </Menu.Menu>
            </Menu.Item>
  
            <Menu.Item>
              <Menu.Header>Hendelser</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name='Alle hendelser'
                />
              <Menu.Item
                name='Ny hendelse'
                as={NavLink}
                to='/ansatt/nyhendelse'
              />
              </Menu.Menu>
            </Menu.Item>
          </Menu>
        </div>
      )
    }
  }
  