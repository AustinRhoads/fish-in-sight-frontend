import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid'
import { filterUserCatches } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/catchActions.js"


class FilterCatches extends Component{

    state = {
        selectedSpecies: "",
        selectedBait: "",
        selectedSpot: "",
    }





    renderSpeciesOptions = () => {

        return this.props.species.map(spec => <option key={cuid()} value = {spec.name} ></option>)
    
    }
    
  renderBaitsOptions = () => {
    
        return this.props.baits.map(bait => <option key={cuid()} value = {bait.name}></option>)
        
    }
    
   renderSpotsOptions = () => {
    
        return this.props.spots.map(spot => spot.name ? <option key={cuid()} value = {spot.name}></option> : null)
        
    }

    handleOnChange = (e) => {

        this.setState({[e.target.name]: e.target.value}, () => this.runFilterize(this.props.catches))
       // this.setState({[e.target.name]: e.target.value}, console.log(this.state))


        
    }

 

  runFilterize = (catches) => {

        const {
            selectedSpecies,
            selectedBait,
            selectedSpot,
        } = this.state

    let filtered = catches.filter(caught => {
        return (
            caught.species.name === selectedSpecies ||
            caught.bait.name === selectedBait 
            
        )
        
    })
   
    this.props.filterize(filtered)

        if(selectedSpecies === "" && selectedBait === "" && selectedSpot === ""){
            this.props.unfilterize()
        }
    
    }

    resetOne = (e) => {
        this.setState({[e.target.nextSibling.name]: ""}, () => this.runFilterize(this.props.catches))
        e.target.nextSibling.value = ""
       

    }

    resetAll = () => {
        this.setState({
            selectedSpecies:  "",
            selectedBait: "",
            selectedSpot: "",
        })
        this.props.unfilterize()
        document.getElementById('sel_b').value = "";
        document.getElementById('sel_s').value = "";
    }

    render(){
        return (
            <div className="catch-list-side-panel">

            <h3>Filter By: </h3>
            
            <button onClick={(e) => this.resetOne(e)}>CLEAR</button><input id="sel_s" name="selectedSpecies" list="specs" placeholder="--search species--" onChange={(e) => this.handleOnChange(e)} value={this.state.selectedSpecies} />
            <datalist id ="specs">
            {this.renderSpeciesOptions()}
            </datalist>
            <br />
                
            <button onClick={(e) => this.resetOne(e) }>CLEAR</button><input id="sel_b" name="selectedBait" list="baits" placeholder="--search baits--" onChange={(e) => this.handleOnChange(e)} value={this.state.selectedBait}/>
            <datalist id="baits" >
                {this.renderBaitsOptions()}
            </datalist> 
                <br />

                <button onClick={this.resetAll}>Reset All</button>
            

        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filteredCatches: state.catches.filtered,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        filterUserCatches:  filtered => dispatch(filterUserCatches(filtered)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (FilterCatches);