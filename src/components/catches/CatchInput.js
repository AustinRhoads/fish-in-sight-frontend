import cuid from 'cuid';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import EXIF from 'exif-js';
/*
import  { getSpecies } from '/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/speciesActions.js';
import  { getBaits } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/baitActions.js";
import { getSpots } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/spotActions.js"
*/


class CatchInput extends Component {

    state = {
        user_id: "",
        notes: "",
        species_id: 1, 
        bait_id: 1,
        spot_id: 1,
        image: null,
        image_preview: null,
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
    
   const formData = new FormData();
   formData.append('user_id', this.state.user_id)
   formData.append('species_id', this.state.species_id)
   formData.append('bait_id', this.state.bait_id)
   formData.append('spot_id', this.state.spot_id)
   formData.append('notes', this.state.notes)
   formData.append('image', this.state.image)

   const configObject = {
    method: "POST",
    credentials: 'include',
    headers: {
        'X-CSRF-Token': this.getCSRFToken(),
        //'Content-Type': 'application/json'
    },
    body: formData
}

   fetch("http://localhost:3000/api/v1/catches", configObject)
   .then(resp => resp.json())
   .then(resp => {
       console.log("catches res", resp);
       this.props.updateCatches(resp);
   }).catch(error =>{
       console.log("catches error", error)
   });

   this.setState({
    notes: "",
    species_id: 1, 
    bait_id: 1,
    spot_id: 1,
    image: null,
    image_preview: null,
   })


}

componentDidMount(){

    this.setState({
        user_id: this.props.uid,
    })

    //this.props.getBaits();
    //this.props.getSpots();

    /*
    this.props.getBaits();
    this.props.getSpots();
    */


    /*
    fetch(`http://localhost:3000/api/v1/species`)
    .then(resp => resp.json())
    .then(ary => {

      this.setState({species: ary});
    })
    */

    /*

    fetch(`http://localhost:3000/api/v1/baits`)
    .then(resp => resp.json())
    .then(ary => {
       this.setState({baits: ary})
    })

    */

    /*
    
    fetch(`http://localhost:3000/api/v1/spots`)
    .then(resp => resp.json())
    .then(ary => {

     // this.setState({spots: [...ary, {id: this.state.newSpotId, lat: 0, lng: 0}]}) 
      this.setState({spots: ary})
    })
    */
    

}

renderSpeciesOptions = () => {

    return this.props.species.map(spec => <option key={cuid()} value = {spec.id}>{spec.name}</option>)

}

renderBaitsOptions = () => {

    return this.props.baits.map(bait => <option key={cuid()} value = {bait.id}>{bait.name}</option>)
    
}

renderSpotsOptions = () => {

    return this.props.spots.map(spec => <option key={cuid()} value = {spec.id}>{spec.name}</option>)
    
}


fileSelectHandler = (e) => {
 EXIF.getData(e.target.files[0], function(){ 
      const dataz =  EXIF.getAllTags(this);
      console.log(dataz)
    });
 
   this.setState({image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0])})
}

renderImagePreview = () => {
    if(this.state.image_preview){
        return(
            <img alt="img-preview" className="catch-img-preview" src={this.state.image_preview}></img>
        )
    }
}

    render(){
        return(
            <div className="new-catch-div">
                <h2>New Catch</h2>
                <br />
                <br />
                <form className="new-catch-form" onSubmit={ e => this.handleOnSubmit(e)}>

                    <input type="file" accept="image/*" multiple={false} name="image" onChange={e => this.fileSelectHandler(e)}/>
                    {this.renderImagePreview()}
                 
            <br />
            <br/>
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


const mapDispatchToProps = (dispatch) => {
    return {
        /*
        getSpecies: () => dispatch(getSpecies()),
        getBaits: () => dispatch(getBaits()),
        getSpots: () => dispatch(getSpots()),
        */
    }
}

const mapStateToProps = state => {
    
    return {
        species: state.species.all_species,
        baits: state.baits.all_baits,
        spots: state.spots.all_spots,
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (CatchInput);