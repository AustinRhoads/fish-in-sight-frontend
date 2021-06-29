import cuid from 'cuid';
import React, { Component } from 'react';



class CatchInput extends Component {



    state = {
        user_id: "",
        notes: "",
        species_id: 1, 
        bait_id: 1,
        spot_id: 1,
        all_species: [],
        all_baits: [],
        all_spots: [],
    }

handleOnChange = (e) =>{
    
    this.setState({
        [e.target.name]: e.target.value
    })
}

getCSRFToken = () => {
    return unescape(document.cookie.split('=')[1])
}

handleOnSubmit = (e) => {

    e.preventDefault();
    const {
        user_id,
        species_id,
        bait_id,
        spot_id,
        notes,
    } = this.state

    const caught = {
        user_id,
        species_id,
        bait_id,
        spot_id,
        notes,
    }
    console.log(caught)
    const configObject = {
        method: "POST",
        credentials: 'include',
        headers: {
            'X-CSRF-Token': this.getCSRFToken(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caught)
    }

    fetch("http://localhost:3000/api/v1/catches", configObject)
    .then(resp => resp.json())
    .then(resp => {
        console.log("catches res", resp);
        this.props.updateCatches(resp);
    }).catch(error =>{
        console.log("catches error", error)
    });

}

componentDidMount(){
    /*
    fetch(`http://localhost:3000/api/v1/species`)
    .then(resp => resp.json())
    .then(ary => {
        console.log(ary)
        this.setState({
            all_species: ary,
        }) 
    })

    fetch(`http://localhost:3000/api/v1/baits`)
    .then(resp => resp.json())
    .then(ary => {
        console.log(ary)
        this.setState({
            all_baits: ary,
        }) 
    })

    fetch(`http://localhost:3000/api/v1/spots`)
    .then(resp => resp.json())
    .then(ary => {
        console.log(ary)
        this.setState({
            all_spots: ary,
        }) 
    })
    */
    

    this.setState({
        user_id: this.props.uid,
    })

}

renderSpeciesOptions = () => {

    return this.props.species.map(spec => <option key={cuid()} value = {spec.id}>{spec.name}</option>)

}

renderBaitsOptions = () => {

    return this.props.baits.map(spec => <option key={cuid()} value = {spec.id}>{spec.name}</option>)
    
}

renderSpotsOptions = () => {

    return this.props.spots.map(spec => <option key={cuid()} value = {spec.id}>{spec.name}</option>)
    
}

    render(){
        return(
            <div className="new-catch-div">
                <label>New Catch</label>
                <br />
                <br />
                <form className="new-catch-form" onSubmit={ e => this.handleOnSubmit(e)}>

                    <label htmlFor="species">Species: </label>

                <select name="species_id" value={this.state.species_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a species">
                    {this.renderSpeciesOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="bait_id">Bait: </label>

                <select name="bait_id" value={this.state.bait_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose bait">
                    {this.renderBaitsOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="spot_id">Known Location:</label>
                <select name="spot_id" value={this.state.spot_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a location">
                    {this.renderSpotsOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="notes">Notes: </label>
                <br />
                    <textarea name="notes" value={this.state.notes} onChange={(e) => this.handleOnChange(e)} />
                    <br />
                   
                   <br />
                    <input type="submit" value="LOG CATCH" />
                </form>
            </div>
        )
    }
}

export default CatchInput;