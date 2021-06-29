import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'
import './App.css'
//import axios from 'axios'
import NavBarContainer from './containers/NavBarContainer'
import { connect } from 'react-redux'
import {checkLogin, userLogin, userLogout, userRegister} from './actions/userActions'



class App extends Component{


  getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
  }

  componentDidMount(){
   this.props.checklogin();
  }






  render(){
    return (
      <div className="App">
        
        <NavBarContainer user={this.props.user} loggedInStatus={this.props.loggedInStatus} userLogout={this.props.userLogout} />
        <BrowserRouter>
       
        <Switch>
          <Route exact path={"/"} component={() => <Home userLogin={this.props.userLogin}  getCSRFToken={this.getCSRFToken} />}  />
          <Route exact path={"/dashboard"} component={() => <DashboardContainer loggedInStatus={this.props.loggedInStatus} user={this.props.user} /> } />
          
        </Switch>
        </BrowserRouter>
        
      </div>
    );
  }


}

const mapStateToProps = state => {
  return{
    loggedInStatus: state.userStatus.loggedInStatus,
    user: state.userStatus.user,
  }
  
}


const mapDispatchToProps = (dispatch) => {
 
return {
  checklogin: () => dispatch(checkLogin()),
  userLogin: (user) => dispatch(userLogin(user)),
  userLogout: () => dispatch(userLogout()),
  userRegister: (newUser) => dispatch(userRegister(newUser))
}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
