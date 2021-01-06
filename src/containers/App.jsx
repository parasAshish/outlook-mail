import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import './app.css';
import { MenuComponent } from '../components/MenuComponent.jsx'

export class App extends Component {

  render() {
    return (
      <div>
        <Header className="app-header">
          <div className='app-name'>Outlook Mail</div></Header>
        <MenuComponent />
      </div>
    )
  }
}

export default App;
