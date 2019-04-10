import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Link, Switch} from 'react-router-dom'

// import components

import Header from './components/common/header'
import MainPage from './components/home/mainPage'

class App extends React.Component{
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <Browser>
        <div>
          <Header />
          <Switch>
            <Route path='/' component={MainPage} />
          </Switch>
        </div>
      </Browser>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
