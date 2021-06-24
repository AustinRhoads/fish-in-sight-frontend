import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'
import './App.css'
//import axios from 'axios'
import NavBarContainer from './containers/NavBarContainer'
import { connect } from 'react-redux'
import {checkLogin, userLogin} from './actions/userActions'


class App extends Component{
/*
  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
  }

*/

  getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
  }

  componentDidMount(){
   // fetch("http://localhost:3000", {credentials: 'include'})
   // this.checkLoginStatus();
   this.props.checklogin();
  }

  /*

  handelLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handelLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    })
  }
  */

  /*
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
*/
welcomer = () => {
  if(this.props.user){
    return <h2>{this.props.user.username}</h2>
  }
}



  render(){
    return (
      <div className="App">
        
        <NavBarContainer />
        <BrowserRouter>
        {this.welcomer()}
        <Switch>
          <Route exact path={"/"} component={() => <Home userLogin={this.props.userLogin}  getCSRFToken={this.getCSRFToken} />}  />
          <Route exact path={"/dashboard"} component={() => <DashboardContainer loggedInStatus={this.props.loggedInStatus} /> } />
          
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
}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
