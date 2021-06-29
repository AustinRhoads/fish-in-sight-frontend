import React, { Component } from 'react'
import User from '../components/users/User'
//import {BrowserRouter, Switch, Route, Link, useParams, useRouteMatch} from 'react-router-dom'
import CatchInput from '../components/catches/CatchInput'
import BaitInput from '../components/baits/BaitInput'
//import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Catches from '../components/catches/Catches'

class DashboardContainer extends Component {

    state = {
        catches: [],
        species: [],
        baits: [],
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

           this.setState({spots: ary})
         })
         

    }

    updateData = (key, newData) => {
        console.log("hey hey hey here i am" , newData)
        this.setState({
                [key]: [...this.state[key], newData],
            })
    }
    
    render(){
        
        console.log(this.props)
        return(
            <div>
                
                {this.renderUser()}
            <Catches catches={this.state.catches} />
            <CatchInput uid = {this.props.user.id} baits={this.state.baits} species={this.state.species} spots={this.state.spots} updateCatches={(caught) => this.updateData("catches", caught)}/>
            <BaitInput uid = {this.props.user.id} updateBait={(bait) => this.updateData("baits", bait)} />

            </div>
        )
    }
}

/*
const DashboardContainer = (props) =>{
    
    return(
        
     
            <div>
                <h3>Dis be the Dashboard!</h3>
                <h2>Status: { this.props.loggedInStatus}</h2>
            </div>
        
    )
}
*/
export default DashboardContainer;