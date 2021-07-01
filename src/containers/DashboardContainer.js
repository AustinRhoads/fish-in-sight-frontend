import React, { Component } from 'react'
import User from '../components/users/User'
import CatchInput from '../components/catches/CatchInput'
import BaitInput from '../components/baits/BaitInput'
import Catches from '../components/catches/Catches'
import SpotInput from '../components/spots/SpotInput'
//import MapContainer from '../components/maps/MapContainer'
import cuid from 'cuid'



class DashboardContainer extends Component {

    state = {
        catches: [],
        species: [],
        baits: [],
        newSpotId: cuid(),
        spots: [],
    }

    componentDidMount(){
        this.loadData();
        this.setState({
            catches: this.props.user.catches,
        })
    }

    renderUser = () => {
        if(this.props.user){
            return <User user={this.props.user} />
        }
    }

    loadData = () => {

        
        
         fetch(`http://localhost:3000/api/v1/species`)
         .then(resp => resp.json())
         .then(ary => {

           this.setState({species: ary});
         })
     
         fetch(`http://localhost:3000/api/v1/baits`)
         .then(resp => resp.json())
         .then(ary => {
            this.setState({baits: ary})
         })
     
         fetch(`http://localhost:3000/api/v1/spots`)
         .then(resp => resp.json())
         .then(ary => {
    
           this.setState({spots: [...ary, {id: this.state.newSpotId, lat: 0, lng: 0}]})
         })
         

    }

    updateData = (key, newData) => {
        this.setState({
                [key]: [...this.state[key], newData],
            })
    }


    
    render(){
        
        
        return(
            <div className="dashbaord-div">
                
                {this.renderUser()}
            <Catches catches={this.state.catches} />
            <br/>
            <CatchInput uid = {this.props.user.id} baits={this.state.baits} species={this.state.species} spots={this.state.spots} updateCatches={(caught) => this.updateData("catches", caught)}/>
            <br/>
            <BaitInput uid = {this.props.user.id} updateBait={(bait) => this.updateData("baits", bait)} />
            <br/>
            <SpotInput uid = {this.props.user.id} updateSpots={(spot) => this.updateData("spots", spot)} spots={this.state.spots}/>
            <br/>
           
            <br/>

            <div className="dashboard-footer"></div>
            </div>
        )
    }
}


export default DashboardContainer;