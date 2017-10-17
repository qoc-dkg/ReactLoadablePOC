import React from 'react'
import {connect, Provider} from 'react-redux'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Gateway from 'gateway/Gateway'
import Loadable from 'react-loadable';

const Dashboard = Loadable({
  loader: () => import('dashboard/Dashboard')
})

const App = props => {
  if (props.checkingSession) {
    return <div></div>
  }

  return (
    <Provider store={props.store}>
      <Router>
        {props.hasSession
          ? <Dashboard />
          : <Gateway />
        }
      </Router>
    </Provider>
  )
}

const mapStateToProps = ({session}) => ({...session})

export default connect(mapStateToProps, {})(App)
