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
        species_id: null, 
        bait_id: null,
        spot_id: null,
        image: null,
        image_preview: null,
        date: "",
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
    species_id: null, 
    bait_id: null,
    spot_id: null,
    image: null,
    image_preview: null,
    date: "",
   })


}

componentDidMount(){

    this.setState({
        user_id: this.props.uid,
    })

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
    if(e.target.files[0]){
        EXIF.getData(e.target.files[0], function(){ 
            const dataz =  EXIF.getAllTags(this);
          
            console.log(dataz)
          });
       
         this.setState({image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0])})
    }

}

unselectImage = (e) => {
    e.preventDefault();
    this.setState({
        image: null,
        image_preview: null,
    })
}

renderImagePreview = () => {
 
    if(this.state.image_preview){
        return(
            
               <> 
            <img alt="img-preview" className="catch-img-preview" src={this.state.image_preview}></img>
            <button className="image-preview-delete-button" onClick={e => this.unselectImage(e)}>-</button>
            </>
        )
    }
 
  
}


selectedSpeciesName = () => {
    if(this.state.species_id){
        let spec = this.props.species.find(spec => spec.id == this.state.species_id)
      
       return spec.name
    }

}
    render(){
        return(
            <div className="new-catch-div">
                <h2>New Catch</h2>
                <br />
                <br />
                <form className="new-catch-form" onSubmit={ e => this.handleOnSubmit(e)}>

                <div className="image-preview-div" style={{height: 220, width: 220}} >
                     {this.renderImagePreview()}
                     <br />
                     <h3>{this.selectedSpeciesName()}</h3>
                </div>
                
                    <br />
                    <br />
                    <input type="file" accept="image/*" multiple={false} name="image" onChange={e => this.fileSelectHandler(e)}/>
                  
                 
            <br />
            <br/>
                    <label htmlFor="species">Species: </label>

                <select name="species_id" value={this.state.species_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a species">
                   
                    <option disabled selected value> -- select a species -- </option>
                    {this.renderSpeciesOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="bait_id">Bait: </label>

                <select name="bait_id" value={this.state.bait_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose bait">
                    
                <option disabled selected value> -- which bait did you use -- </option>
                    {this.renderBaitsOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="spot_id">Known Location:</label>
                <select name="spot_id" value={this.state.spot_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a location">
                    
                    <option disabled selected value> -- select from known spots -- </option>
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