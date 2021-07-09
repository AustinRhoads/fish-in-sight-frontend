import React, { Component } from 'react'
import Home from './containers/Home.js'
import {BrowserRouter, Switch, Route,} from 'react-router-dom'
import DashboardContainer from './containers/DashboardContainer.js'
import './App.css'
import axios from 'axios'
import NavBarContainer from './containers/NavBarContainer'
import { connect } from 'react-redux'
import { userLogin, userLogout, userRegister} from './actions/userActions'
import  { getSpecies } from './actions/speciesActions.js'
import  { getBaits } from './actions/baitActions.js'
import  { getSpots } from './actions/spotActions.js'
//import { getUserCatches } from './actions/catchActions.js'





class App extends Component{

  state = {
    loggedInStatus: "NOT_LOGGED_IN",
    user: {},
    redirect: false,
    userCatches: [],
    
  }





checkLoginStatus = () =>{
  axios.get('http://localhost:3000/logged_in', {withCredentials: true})
  .then(resp => {
    console.log(resp.data.user)
   
      if(resp.data.logged_in === true && this.state.loggedInStatus === "NOT_LOGGED_IN"){
          
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user,
          redirect: false,
          userCatches: resp.data.catches,
        })

        this.getUserCatches(resp.data.user.id)

      
         
         
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
    })
  }

  getUserCatches(uid){
    fetch(`http://localhost:3000/api/v1/users/${uid}`)
    .then(resp => resp.json())
    .then(obj => {
      console.log("AHAHAHAHAHAHA", obj.catches)
        if(obj){
           this.setState({userCatches: obj.catches})
          
        }
        
       
    })

  }
 

  componentDidMount(){
    this.checkLoginStatus()
  // this.props.checklogin();
   this.props.getSpecies();
   this.props.getSpots();
   this.props.getBaits();
   //this.props.getUserCatches(this.props.user.id);
 

  }









  render(){
  
    return (
      <div className="App">
        
          <NavBarContainer user={this.state.user} loggedInStatus={this.state.loggedInStatus} userLogout={this.props.userLogout} />
          <BrowserRouter>

          <Switch>
            <Route exact path={"/"}  render={props => (
               <Home {...props} handelLogin={this.handelLogin}  loggedInStatus={this.state.loggedInStatus} userLogin={this.props.userLogin}  getCSRFToken={this.getCSRFToken} />
            )}  />
            
            <Route exact path={"/dashboard"} render={props => <DashboardContainer {...props} redirect={this.state.redirect} spots={this.props.spots} baits={this.props.baits} species={this.props.species}  user={this.state.user} loggedInStatus={this.state.loggedInStatus} userCatches={this.state.userCatches} /*catches={this.props.user.catches}*/ /> } />

          </Switch>
          </BrowserRouter>
          
       
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
  //getUserCatches: (uid) => dispatch(getUserCatches(uid))
}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);

//<Route exact path={"/dashboard"} component={() => <DashboardContainer checklogin={this.props.checklogin} spots={this.props.spots} baits={this.props.baits} species={this.props.species}  user={this.props.user} loggedInStatus={this.props.loggedInStatus} /*catches={this.props.user.catches}*/ /> } />
