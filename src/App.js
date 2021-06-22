import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'
import axios from 'axios'


class App extends Component{

  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  }

  getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
  }

  componentDidMount(){
    fetch("http://localhost:3000", {credentials: 'include'})
    this.checkLoginStatus()
  }

  handelLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

checkLoginStatus(){
  axios.get('http://localhost:3000/logged_in', {withCredentials: true})
  .then(resp =>{
    console.log("logged_in?", resp)
    if(resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
          })
    } else if (!resp.data.logged_in & this.state.loggedInStatus === "LOGGED_IN"){
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          })
    }
  }).catch(error => {
    console.log("check logged in error: ",error)
  })
}



  render(){
    return (
      <div className="App">
        <h1>Fish In Sight</h1>
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={() => <Home handelLogin={this.handelLogin} getCSRFToken={this.getCSRFToken} />}  />
          <Route exact path={"/dashboard"} component={() => <DashboardContainer loggedInStatus={this.state.loggedInStatus} /> } />
          
        </Switch>
        </BrowserRouter>
        
      </div>
    );
  }


}

export default App;
