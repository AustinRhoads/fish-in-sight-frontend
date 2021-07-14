import React from 'react'
import { Redirect,/* Route, Link*/} from 'react-router-dom'
//import {Route} from 'react-router-dom'
//import User from '../components/users/User'
import CatchInput from '../components/catches/CatchInput'
import BaitInput from '../components/baits/BaitInput'
//import Catches from '../components/catches/Catches'
import SpotInput from '../components/spots/SpotInput'
//import MapContainer from '../components/maps/MapContainer'
//import cuid from 'cuid'
//import User from '../components/users/User.js'




function DashboardContainer ({user, spots, userCatches, redirect, match, loggedInStatus}) {
   
//const redirect = match.redirect;
//console.log(props);





    /*

        state = {
            catches: [],
            species: [],
            baits: [],
            newSpotId: cuid(),
            spots: [],
        }
    
*/

/*

    renderUser = () => {
        if(this.props.user){
            return <User user={this.props.user} />
        }
    }

    */

/*
    updateData = (key, newData) => {
        this.setState({
                [key]: [...this.state[key], newData],
            })
    }

  */


    /*
    const updateCatches1 = (newCatch) => {
        this.props.updateCatches(newCatch);
      // updateCatches(newCatch);
    }
    */

    
  

        
    //  if(redirect){
    //      return <Redirect to="/" />
    //  }

      const checkLogin = () => {
        
        if(redirect){
            console.log("logged out")
            return <Redirect to="/" />
         
        }
    
    }
        
        return(
           
          
            <div className="dashbaord-div">
             {checkLogin()}
               
              { /* {this.renderUser()} */}
                <h3>STATUS: {loggedInStatus}</h3>
           
                
               {/* <Route path={`${match.url}`}  render={ dashboardProps => (<Catches {...dashboardProps}  uid = {user.id} catches={userCatches}   /> )} />*/}
               
                
                <CatchInput uid = {user.id} /* updateCatches={updateCatches1}*/ /*species={this.props.species}  baits={this.props.baits}  spots={this.props.spots} */     /*updateCatches={(caught) => this.updateData("catches", caught)}*//>
                
                <BaitInput uid = {user.id} /* updateBait={(bait) => this.updateData("baits", bait)} */ />
                
                <SpotInput uid = {user.id} /* updateSpots={(spot) => this.updateData("spots", spot)} */ spots={spots}/>
                
               
          
            
            <br/>

            <div className="dashboard-footer"></div>
            </div>
        )
    
}




export default DashboardContainer;