import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
//import DashboardContainer from './containers/DashboardContainer.js'
import './App.css'
import axios from 'axios'
import NavBarContainer from './containers/NavBarContainer'
import { connect } from 'react-redux'
import { userLogin, userLogout, userRegister, getAllUsers} from './actions/userActions'
import { getAllCatches } from './actions/catchActions'
import  { getSpecies } from './actions/speciesActions.js'
import  { getBaits } from './actions/baitActions.js'
import  { getSpots } from './actions/spotActions.js'
import LoginContainer from './containers/LoginContainer.js'
import RegistrationContainer from './containers/RegistrationContainer.js'
import UserCatches from './components/catches/UserCatches.js'
import CatchInput from './components/catches/CatchInput.js'
import Catch from './components/catches/Catch.js'
//import Catches from './components/catches/Catches.js'
import EditCatch from './components/catches/EditCatch.js'

import FollowingCatches from './components/catches/FollowingCatches.js'

import AuxNavBar from './containers/AuxNavBar.js'
import User from './components/users/User.js'
import UserEdit from './components/users/UserEdit.js'
import SpotInput from './components/spots/SpotInput.js'
import SpotsMapContainer from './components/maps/SpotsMapContainer.js'

import { ProtectedRoute } from './components/auth/ProtectedRoute.js'







class App extends Component{

  state = {
   loggedInStatus: localStorage.getItem('loggedInStatus') || "NOT_LOGGED_IN",
   // loggedInStatus: "NOT_LOGGED_IN",
    user: JSON.parse(localStorage.getItem('user')) || {},
    redirect: false,
    userCatches: [],
    allUser: [],
    blah: "blah",
    
  }





  checkLoginStatus = () =>{
  
    
   if(this.state.user !== {}){
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
    .then(resp => {
    
        if(resp.data.logged_in === true && this.state.loggedInStatus === "NOT_LOGGED_IN"){

          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: resp.data.user,
            redirect: false,
          
          })

          this.getUserAndUserCatches(resp.data.user.id)
         
        
        } else if (!resp.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            redirect: true,
            userCatches: [],
          });


        } else {
          
          this.setState({redirect: true})
        }
    }).catch(error => {
      console.log("check logged in error: ", error)
    })
  
   } else {
     this.setState({
      loggedInStatus: "LOGGED_IN"
     })
   }
    
   
  }





  getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
  }

  
  handleLogin = (data) => {
   // console.log("login user", data)
    this.getUserAndUserCatches(data.id);
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
      redirect: false,
    })
  }

  logout = () => {
    localStorage.setItem('user', null)
    localStorage.setItem('loggedInStatus', "NOT_LOGGED_IN")
    this.props.userLogout()
  }



  getUserAndUserCatches(uid){
    fetch(`http://localhost:3000/api/v1/users/${uid}`)
    .then(resp => resp.json())
    .then(obj => {
      
        if(obj){
          localStorage.setItem('user', JSON.stringify(obj))
          localStorage.setItem('loggedInStatus', "LOGGED_IN")
           this.setState({
             user: obj,
             userCatches: obj.catches,
             loggedInStatus: "LOGGED_IN",
            })
        }
        
       
    })

  }



  async componentDidMount(){
   
   
    await this.checkLoginStatus();
    await this.props.getSpecies();
    await this.props.getSpots();
    await this.props.getBaits();
    await this.props.getAllUsers();
    await this.props.getAllCatches();
   }




  renderAuxNav = () => {
    if(this.state.loggedInStatus === "LOGGED_IN"){
      return <AuxNavBar currentUser={this.state.user} />
    }  
  }

  redirectToHome = () => {
    if(this.state.redirect){
     
    return(
      <Redirect to="/" />
    )
    
    }
}





  render(){
  
    return (
      <div className="App">
        
          <NavBarContainer user={this.state.user} loggedInStatus={this.state.loggedInStatus} logout={this.logout} />
         
          <AuxNavBar id="aux_nav" user={this.state.user} />
          <BrowserRouter>
      
          <Switch>
            <Route exact path={"/"}  render={props => (
               <Home {...props} handelLogin={this.handelLogin}  loggedInStatus={this.state.loggedInStatus} userLogin={this.props.userLogin}  getCSRFToken={this.getCSRFToken} />
            )}  />

            <Route exact path="/login" render={props => <LoginContainer {...props} redirect={this.state.redirect} getCSRFToken={this.getCSRFToken} handleLogin={this.handleLogin} userLogin={this.props.userLogin} />}/>
            <Route exact path="/register" render={props => <RegistrationContainer {...props} redirect={this.state.redirect} getCSRFToken={this.getCSRFToken} userLogin={this.props.userLogin} handelLogin={this.handelLogin} />}/>
            
            <ProtectedRoute exact path="/spots/new" render={props => <SpotInput {...props} redirect={this.state.redirect} uid = {this.state.user.id} spots={this.props.spots} allCatches={this.props.allCatches} /> } />
            <ProtectedRoute exact path="/spots" render={props => <SpotsMapContainer {...props} redirect={this.state.redirect} uid = {this.state.user.uid} catches={this.props.allCatches}  spots={this.props.spots} /* updateLatLngAddress={this.updateLatLngAddress}*/ /> } />
            

            
            <ProtectedRoute  path={"/catches/:id/edit"} render={props => <EditCatch {...props} redirectToHome={this.redirectToHome}  redirect={this.state.redirect} uid={this.state.user.id} species={this.props.species} baits={this.props.baits} spots={this.props.spots} />}  />
            <ProtectedRoute exact path={"/catches/new"} render={props => <CatchInput {...props} redirect={this.state.redirect} uid={this.state.user.id} species={this.props.species}  baits={this.props.baits} spots={this.props.spots}  />}/>
            <ProtectedRoute export path={"/catches/:id"} render={props => <Catch {...props} redirect={this.state.redirect} uid={this.state.user.id} />} />
        
            <ProtectedRoute path={"/catches"} render={props => <FollowingCatches {...props}  redirect={this.state.redirect} uid={this.state.user.id} catches={this.props.allCatches}  />} />

            <ProtectedRoute path={"/following/catches"} render={props => <FollowingCatches {...props}  redirect={this.state.redirect} uid={this.state.user.id} catches={this.props.allCatches}  />} />

            <ProtectedRoute exact path={"/mycatches"} render={props => <UserCatches {...props}  redirect={this.state.redirect}  user={this.state.user} uid = {this.state.user.id} catches={this.state.userCatches}    /> } />
           
            
            <ProtectedRoute path={"/users/:id/edit"} uid={this.state.user.id} render={props=> <UserEdit {...props}   updateUser={this.updateUser} uid={this.state.uid} user={this.state.user} checkLoginStatus={this.checkLoginStatus} />} />
            <ProtectedRoute path={`/users/:id`} render={props => <User {...props} redirect={this.state.redirect} currentUser={this.state.user} uid={this.state.user.id} allUsers={this.props.allUsers} />} />
            <Route path="*" render={() => "404 page not found"} />
          </Switch>
          </BrowserRouter>
          
          <br/>

<div className="dashboard-footer"></div>
       
      </div>
    );
  }


}

const mapStateToProps = state => {
 
  return{
   // loggedInStatus: state.userStatus.loggedInStatus,
    user: state.userStatus.user,
    species: state.species.all_species,
    spots: state.spots.all_spots,
    baits: state.baits.all_baits,
    allUsers: state.userStatus.allUsers,
    allCatches: state.catches.allCatches,
  }
  
}


const mapDispatchToProps = (dispatch) => {
 
return {
 // checklogin: () => dispatch(checkLogin()),
  userLogin: (user) => dispatch(userLogin(user)),
  userLogout: () => dispatch(userLogout()),
  userRegister: (newUser) => dispatch(userRegister(newUser)),
  getSpecies: () =>  dispatch(getSpecies()),
  getBaits: () => dispatch(getBaits()),
  getSpots: () => dispatch(getSpots()),
  getAllUsers: () => dispatch(getAllUsers()), 
  getAllCatches: () => dispatch(getAllCatches()),
  //getUserCatches: (uid) => dispatch(getUserCatches(uid))
}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);

//<Route exact path={"/dashboard"} component={() => <DashboardContainer checklogin={this.props.checklogin} spots={this.props.spots} baits={this.props.baits} species={this.props.species}  user={this.props.user} loggedInStatus={this.props.loggedInStatus} /*catches={this.props.user.catches}*/ /> } />
