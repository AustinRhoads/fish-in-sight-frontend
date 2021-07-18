import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route,} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'
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
import AllCatches from './components/catches/AllCatches.js'
import EditCatch from './components/catches/EditCatch.js'

import AuxNavBar from './containers/AuxNavBar.js'
import User from './components/users/User.js'
import SpotInput from './components/spots/SpotInput.js'






class App extends Component{

  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
    redirect: false,
    userCatches: [],
    allUser: [],
    
  }





checkLoginStatus = () =>{
  axios.get('http://localhost:3000/logged_in', {withCredentials: true})
  .then(resp => {
   
      if(resp.data.logged_in === true && this.state.loggedInStatus === "NOT_LOGGED_IN"){
          
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user,
          redirect: false,
         //userCatches: resp.data.catches,
        })

        //////////testing

     

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
}





  getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
  }

  
  handelLogin = (data) => {
    
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data,
      redirect: false,
    })
  }



  getUserAndUserCatches(uid){
    fetch(`http://localhost:3000/api/v1/users/${uid}`)
    .then(resp => resp.json())
    .then(obj => {
      
        if(obj){
           this.setState({
             user: obj,
             userCatches: obj.catches,
            })
        }
        
       
    })

  }




  updateCatches = (newCatch) => {
    this.setState({
      userCatches: [...this.state.userCatches, newCatch]
    })
  }
 

  componentDidMount(){
    this.checkLoginStatus()
   this.props.getSpecies();
   this.props.getSpots();
   this.props.getBaits();
   this.props.getAllUsers();
   this.props.getAllCatches();

   //this.props.getUserCatches(this.props.user.id);
 

  }

  renderAuxNav = () => {
    if(this.state.loggedInStatus === "LOGGED_IN"){
      return <AuxNavBar currentUser={this.state.user} />



    }
    
  }









  render(){
  
    return (
      <div className="App">
        
          <NavBarContainer user={this.state.user} loggedInStatus={this.state.loggedInStatus} userLogout={this.props.userLogout} />
         
          <AuxNavBar id="aux_nav" currentUser={this.state.user} />
          <BrowserRouter>

          <Switch>
            <Route exact path={"/"}  render={props => (
               <Home {...props} handelLogin={this.handelLogin}  loggedInStatus={this.state.loggedInStatus} userLogin={this.props.userLogin}  getCSRFToken={this.getCSRFToken} />
            )}  />

            <Route exact path="/login" render={props => <LoginContainer {...props} redirect={this.state.redirect} getCSRFToken={this.getCSRFToken} handelLogin={this.handelLogin} userLogin={this.props.userLogin} />}/>
            <Route exact path="/register" render={props => <RegistrationContainer {...props} redirect={this.state.redirect} getCSRFToken={this.getCSRFToken} userLogin={this.props.userLogin} handelLogin={this.handelLogin} />}/>
            <Route exact path="/maps" render={props => <SpotInput uid = {this.state.user.id} /* updateSpots={(spot) => this.updateData("spots", spot)} */ spots={this.props.spots}/>} />
            
            <Route exact path={"/dashboard"} render={props => <DashboardContainer {...props} redirect={this.state.redirect} spots={this.props.spots} baits={this.props.baits} species={this.props.species}  user={this.state.user} loggedInStatus={this.state.loggedInStatus} userCatches={this.state.userCatches}  updateCatches={this.updateCatches} /*catches={this.props.user.catches}*/ /> } />
            <Route exact path={"/catches/:id/edit"} render={props => <EditCatch {...props}   redirect={this.state.redirect} uid={this.state.user.id} species={this.props.species} />} />
            <Route exact path={"/catches/new"} render={props => <CatchInput {...props} redirect={this.state.redirect} uid={this.state.user.id} />} />
            <Route export path={"/catches/:id"} render={props => <Catch {...props} redirect={this.state.redirect} uid={this.state.user.id} />} />
            <Route path={"/catches"} render={props => <AllCatches {...props} redirect={this.state.redirect} uid={this.state.user.id} />} />


            <Route exact path={"/mycatches"} render={props => <UserCatches {...props}  redirect={this.state.redirect}  user={this.state.user} uid = {this.state.user.id} catches={this.state.userCatches}    /> } />
           
            
           
            <Route path={`/users/:id`} render={props => <User {...props} redirect={this.state.redirect} />} />
            
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
  //  user: state.userStatus.user,
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
