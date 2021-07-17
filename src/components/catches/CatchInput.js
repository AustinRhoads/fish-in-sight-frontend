import cuid from 'cuid';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import EXIF from 'exif-js';
import GoogleMapReact from 'google-map-react';


//import PlacesAutocomplete, {
//    geocodeByAddress,
//    getLatLng,
//  } from 'react-places-autocomplete';
//import {ExifImage} from 'exif'
//import piexif from 'piexifjs'



/*
import  { getSpecies } from '/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/speciesActions.js';
import  { getBaits } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/baitActions.js";
import { getSpots } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/spotActions.js"
*/


class CatchInput extends Component {

    state = {
        user_id: "",
        notes: "",
        species_id: "", 
        bait_id: "",
        spot_id: "",
        image: null,
        image_preview: null,
        date: "",
        time: "",
        guessed_date: "",
        center: {
            lat: 30.807042990766117, 
            lng: -98.40859740107271,
        },
        zoom: 11,
        key: "",

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
    console.log(this.state)

    e.preventDefault();
   const formData = new FormData();
 
   formData.append('user_id', this.props.uid)
   formData.append('species_id', this.state.species_id)
   formData.append('bait_id', this.state.bait_id)
   formData.append('spot_id', this.state.spot_id)
   formData.append('notes', this.state.notes)
   formData.append('image', this.state.image)
   formData.append('date', this.state.date)
    

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
      // this.props.updateCatches(resp);
     // this.props.updateCatches(resp)
   }).catch(error =>{
       console.log("catches error", error)
   });

   this.setState({
    notes: "",
    species_id: "", 
    bait_id: "",
    spot_id: "",
    image: null,
    image_preview: null,
    date: "",
    guessed_date: "",
   })


}

componentDidMount(){

    this.setState({
        user_id: this.props.uid,
    })

    this.setMyLocation();
    
   

}

setMyLocation = () => {
          
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         
          this.setState({
            //  address: "",
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            key: cuid(),
           // newSpotLat: position.coords.latitude,
           // newSpotLng: position.coords.longitude,
            

          })

        })

      }
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
         this.exifExtractor(e.target.files[0]);
         this.setState({image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0])})
    }
   
    
}




exifExtractor = (file) => {
    const scope = this;
    var reader = new FileReader();
    reader.onload = function(e) {

      var exif = EXIF.readFromBinaryFile(this.result);
      console.log(exif)
      if(exif.DateTime){
        var  datetime = String(exif.DateTime).split(" ")
        var date = datetime[0].replace(/:/g, "-")
        var time = datetime[1]
        scope.setState({date: date, time: time})
          console.log(datetime);
      }

        
        
        

     }

    reader.readAsArrayBuffer(file);
    
}


unselectImage = (e) => {
    e.preventDefault();
    this.setState({
        image: null,
        image_preview: null,
    })
    document.getElementById("file-input").value = null;
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
        let spec = this.props.species.find(spec => spec.id === parseInt(this.state.species_id))
       return spec.name
    }

}


selectedBaitName = () => {
    if(this.state.bait_id){
        let bait = this.props.baits.find(bait => bait.id === parseInt(this.state.bait_id))
      
       return bait.name
    }

}

renderDateGuess = () => {
    if(this.state.guessed_date){
        console.log(this.state.guessed_date)
        return(
            <>
            <p>{String(this.state.guessed_date)}</p>
            <p>Is this when you caught it?</p>
            <button onClick={e => this.correctGuess(e)}>Yes</button><button>No</button>
            <br />
            </>
        )
    }
}

correctGuess = (e) => {
    e.preventDefault();
     this.setState({date: this.state.guessed_date})
}

selectActiveA = () => {
    const sections = document.getElementsByClassName("input-box-horizontal-scroll")
    const dots = document.getElementsByClassName('dot')
    const scrollWindow = document.getElementById("hsdci")
    
   // scrollWindow.addEventListener("scroll", () => {
   //     let current = "";
   // })
   if(scrollWindow){
       scrollWindow.addEventListener("scroll", () => {
           let current = "";
           //sections.forEach( el => {
           //    const sectionLeft = el.offsetLeft;
           //    console.log(sectionLeft)
           //})
           const winLeft = scrollWindow.scrollLeft
         // console.log(winLeft)
           for(var x = sections.length - 1; x >=0; x--){
                const sectionLeft = sections[x].offsetLeft;
                const sectionWidth = sections[x].clientWidth;
                if(sectionLeft <= winLeft + 20 && sectionLeft >= winLeft - sectionWidth ){
                    current = sections[x].getAttribute("id");
                   // document.querySelector(`a.${sections[x].getAttribute("id")}`).classList.add('active')
                }
               

           }
           
           
           for(let x = dots.length - 1; x >= 0; x--){
               dots[x].classList.remove("active")
               if(dots[x].classList.contains(current)){
                   dots[x].classList.add("active")
               }
           }
       })
   }
}


handleMapChange = (center, zoom, bounds, marginBounds) => {
   // console.log(center, zoom, bounds, marginBounds)
    this.setState({center: center})
}
 

    render(){
        this.selectActiveA()
        return(
        <div>
            <form className="scrollable-catch-input" onSubmit={ e => this.handleOnSubmit(e)}>
            <div className= "outer-box">   
                <div id="hsdci" className="catch-input-horizontal-scroll">
                    <div id="slide1" className="input-box-horizontal-scroll"> 

                        <h3>Select Image</h3>

                        <div className="image-preview-div" style={{height: 220, width: 220}} >
                            {this.renderImagePreview()}
                        </div>
                        <br />

                        <input id="file-input" type="file" accept="image/*" multiple={false} name="image" onChange={e =>  this.fileSelectHandler(e)}/>
                        <br />
                        <a className="next-button" href="#slide2">next</a>

                    </div>

                    <div id="slide2" className="input-box-horizontal-scroll">

                    <h3>Confirm the time and date of your catch.</h3>
                  
                  
                <input type="date" name="date" id="date-input" style={{display: ""}} onChange={(e) => this.handleOnChange(e)} value={this.state.date} />
                <input type="time" name="time" onChange={e => this.handleOnChange(e)} value={this.state.time} />
                
                        <a className="next-button" href="#slide3">next</a>

                    </div>
                    <div id="slide3" className="input-box-horizontal-scroll">

                    <h3>Location</h3>

            <p>Lat: {this.state.center.lat} Lng: {this.state.center.lng}</p>
                <div className="catch-map">
                    <div className="center-marker"></div>
                 <GoogleMapReact
                    className="react-map"
                    bootstrapURLKeys={{key: "AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ"}}
                    defaultCenter={{ lat: 30.807042990766117, 
                        lng: -98.40859740107271,}}
                    defaultZoom={this.state.zoom}
                    center={this.state.center}
                    
                   // onChange={({x, y, lat, lng, e}) => this.handleMapChange(x, y, lat, lng, e)}
                   // onClick = {({x, y, lat, lng, event}) => this.handelMapClick(x, y, lat, lng, event)}
                   onChange={({ center, zoom, bounds, marginBounds }) => {
                       this.handleMapChange(center, zoom, bounds, marginBounds);
                     // get the center, zoom, whatever using the ref
                  }}
                    key={this.state.key}
                    >
                        


                    </GoogleMapReact>
                    </div>
                   
                        <a className="next-button" href="#slide4">next</a>

                    </div>
                    <div id="slide4" className="input-box-horizontal-scroll">

                    <h3>Species</h3>
                    <select name="species_id" value={this.state.species_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a species">
                   
                   <option disabled value=""> -- select a species -- </option>
                   {this.renderSpeciesOptions()}
               </select>
                        <a className="next-button" href="#slide5">next</a>

                    </div>
                    <div id="slide5" className="input-box-horizontal-scroll">

                    <h3>Add Measurements</h3>
                    
                        <a className="next-button" href="#slide6">next</a>

                    </div>
                    <div id="slide6" className="input-box-horizontal-scroll">

                    <h3>Bait</h3>

                    <select name="bait_id" value={this.state.bait_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose bait">
                    
                    <option disabled value=""> -- which bait did you use -- </option>
                        {this.renderBaitsOptions()}
                    </select>
                        <a className="next-button" href="#slide7">next</a>

                    </div>
                    <div id="slide7" className="input-box-horizontal-scroll">
                    <h3>Description</h3>

                    <textarea className="catch-input-description" name="notes" value={this.state.notes} onChange={(e) => this.handleOnChange(e)} />
                        <a className="next-button" href="#slide1">next</a>

                    </div>



                </div>


                <div className="dot-div">
                    <div  ><a className="dot d1 slide1" href="#slide1" >.</a></div>
                    <div  ><a className="dot d2 slide2" href="#slide2" >.</a></div>
                    <div  ><a className="dot d3 slide3" href="#slide3" >.</a></div>
                    <div  ><a className="dot d4 slide4" href="#slide4" >.</a></div>
                    <div  ><a className="dot d5 slide5" href="#slide5" >.</a></div>
                    <div  ><a className="dot d6 slide6" href="#slide6" >.</a></div>
                    <div  ><a className="dot d7 slide7" href="#slide7" >.</a></div>
                </div>
            </div> 
            </form>

{/*         //////////////////////           here is the great devide               //////////////////////////              */}

            <div className="new-catch-div">
                <h2>New Catch</h2>
                <br />
                <br />
                <form className="new-catch-form" onSubmit={ e => this.handleOnSubmit(e)}>
                <div className="whaaaaa" style={{height: 380, width: 220}}>
                <div className="image-preview-div" style={{height: 220, width: 220}} >
                     {this.renderImagePreview()}
                     <br />

                </div>
                <div className="new-catch-selected-attributes-box">
                     <h3>{this.selectedSpeciesName()}</h3>
                     <h3>{this.selectedBaitName()}</h3>
                    
                     </div>
                </div>
                
                    
                    <br />
                    <input id="file-input" type="file" accept="image/*" multiple={false} name="image" onChange={e =>  this.fileSelectHandler(e)}/>
                  
                 
            <br />
            <br/>
                    <label htmlFor="species">Species: </label>

                <select name="species_id" value={this.state.species_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a species">
                   
                    <option disabled value=""> -- select a species -- </option>
                    {this.renderSpeciesOptions()}
                </select>

                <br />

                <br />
                <label htmlFor="date">Date: </label>
                {this.renderDateGuess()}
                <input type="date" name="date" id="date-input" style={{display: ""}} onChange={(e) => this.handleOnChange(e)} value={this.state.date} />

                <label htmlFor="bait_id">Bait: </label>

                <select name="bait_id" value={this.state.bait_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose bait">
                    
                <option disabled value=""> -- which bait did you use -- </option>
                    {this.renderBaitsOptions()}
                </select>

                <br />
                <br />

                <label htmlFor="spot_id">Known Location:</label>
                <select name="spot_id" value={this.state.spot_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a location">
                    
                    <option disabled value=""> -- select from known spots -- </option>
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