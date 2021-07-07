import React, { Component } from 'react'
import { Redirect, } from 'react-router-dom'
import User from '../components/users/User'
import CatchInput from '../components/catches/CatchInput'
import BaitInput from '../components/baits/BaitInput'
import Catches from '../components/catches/Catches'
import SpotInput from '../components/spots/SpotInput'
//import MapContainer from '../components/maps/MapContainer'
//import cuid from 'cuid'
//import { connect } from 'react-redux'



function DashboardContainer (props){
   
const redirect = props.redirect;
console.log(redirect);
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

    
  

        
      if(redirect){
          return <Redirect to="/" />
      }
        
        return(
            <div className="dashbaord-div">
               
              { /* {this.renderUser()} */}
                <h3>STATUS: {props.loggedInStatus}</h3>
               
            <Catches uid = {props.user.id} /* catches={this.state.catches} */ /*userCatches={this.props.userCatches} */ />
            <br/>
            <CatchInput uid = {props.user.id} /*species={this.props.species}  baits={this.props.baits}  spots={this.props.spots} */     /*updateCatches={(caught) => this.updateData("catches", caught)}*//>
            <br/>
            <BaitInput uid = {props.user.id} /* updateBait={(bait) => this.updateData("baits", bait)} */ />
            <br/>
            <SpotInput uid = {props.user.id} /* updateSpots={(spot) => this.updateData("spots", spot)} */ spots={props.spots}/>
            <br/>
           
            <br/>

            <div className="dashboard-footer"></div>
            </div>
        )
    
}

const mapStateToProps = state => {
    return{
    //  loggedInStatus: state.userStatus.loggedInStatus,
     // user: state.userStatus.user,
      species: state.species.all_species,
      spots: state.spots.all_spots,
      baits: state.baits.all_baits,
    }
    
  }


export default /*connect(mapStateToProps) (*/DashboardContainer;//);