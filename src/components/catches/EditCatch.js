import cuid from 'cuid';
import React, { Component } from 'react';
import EXIF from 'exif-js';
import GoogleMapReact from 'google-map-react';


class EditCatch extends Component {

    state = {
        user_id: "",
        notes: "",
        species_id: "", 
        bait_id: "",
        spot_id: "",
        image: null,
        image_preview: null,
        image_updated: false,
        date: "",
        time: "",
        lbs: "",
        inches: "",
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
    console.log("Finale",this.state.image)

    e.preventDefault();
   const formData = new FormData();
 
   formData.append('id', this.state.id)
   formData.append('user_id', this.state.user_id)
   formData.append('species_id', this.state.species_id)
   formData.append('bait_id', this.state.bait_id)
   formData.append('spot_id', this.state.spot_id)
   formData.append('notes', this.state.notes)
   if(this.state.image_uploaded){
    formData.append('image', this.state.image)
   }
   
   formData.append('date', [this.state.date, this.state.time].join(" "))
   formData.append('size', this.state.inches)
   formData.append('lat', this.state.center.lat)
   formData.append('lng', this.state.center.lng)
    

   const configObject = {
    method: "PUT",
    credentials: 'include',
    headers: {
        'X-CSRF-Token': this.getCSRFToken(),
        
    },
    body: formData
}


   fetch(`http://localhost:3000/api/v1/catches/${this.state.id}`, configObject)
   .then(resp => resp.json())
   .then(resp => {
       console.log("catches res", resp);
   }).catch(error =>{
       console.log("catches error", error)
   });

   this.setState({
    user_id: "",
    notes: "",
    species_id: "", 
    bait_id: "",
    spot_id: "",
    image: null,
    image_preview: null,
    date: "",
    time: "",
    lbs: "",
    inches: "",
    guessed_date: "",
    center: {
        lat: 30.807042990766117, 
        lng: -98.40859740107271,
    },
    zoom: 11,
    key: "",
   })

   this.props.history.push(`/catches/${this.props.match.params.id}`)

}

async componentDidMount(){
    console.log(this.props)
    this.setState({
        user_id: this.props.uid,
    })
    
    const caught = await fetch(`http://localhost:3000/api/v1/catches/${this.props.match.params.id}`).then(resp => resp.json())
    
    const date = caught.date.split("").splice(0, 10).join("")
    const time = caught.date.split("").slice(11, 16).join("")
    
    this.setState({
    id: caught.id,        
    user_id: caught.user_id,
    notes: caught.notes,
    species_id: caught.species_id ,
    bait_id: caught.bait_id,
    spot_id: caught.spot_id,
    image: caught.image,
    image_preview: caught.image.url,
    date: date,
    time: time,
   
    inches: caught.size,

    center: {
        lat: parseFloat(caught.lat), 
        lng: parseFloat(caught.lng),
    },
    zoom: 11,
    
})


    this.setMyLocation();
    
   

}

setMyLocation = () => {
          
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         
          this.setState({
            
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            key: cuid(),   
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
    
      this.setState({image_updated: true})
 
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

    if(this.state.species_id && this.props.species.length > 0){
        
        let spec = this.props.species.find(spec => spec.id === parseInt(this.state.species_id))
       return spec.name
    }

}


selectedBaitName = () => {
    if(this.state.bait_id && this.props.baits.length > 0){
        let bait = this.props.baits.find(bait => bait.id === parseInt(this.state.bait_id))
      
       return bait.name
    }

}




selectActiveA = () => {
    const sections = document.getElementsByClassName("input-box-horizontal-scroll")
    const dots = document.getElementsByClassName('dot')
    const scrollWindow = document.getElementById("hsdci")

   if(scrollWindow){
       scrollWindow.addEventListener("scroll", () => {
           let current = "";

           const winLeft = scrollWindow.scrollLeft
         
           for(var x = sections.length - 1; x >=0; x--){
                const sectionLeft = sections[x].offsetLeft;
                const sectionWidth = sections[x].clientWidth;
                if(sectionLeft <= winLeft + 20 && sectionLeft >= winLeft - sectionWidth ){
                    current = sections[x].getAttribute("id");
                   
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

                        <h3 className="slide-title">Select Image</h3>

                        <div className="image-preview-div" style={{height: 340, width: 340}} >
                            {this.renderImagePreview()}
                        </div>
                        <br />

                        <input id="file-input" type="file" accept="image/*" multiple={false} name="image" onChange={e =>  this.fileSelectHandler(e)}/>
                        <br />
                        
                        <a className="next-button" href="#slide2">next</a>

                    </div>

                    <div id="slide2" className="input-box-horizontal-scroll">

                    <h3 className="slide-title">Confirm the time and date of your catch.</h3>
                  
                  
                <input required type="date" name="date" id="date-input" style={{display: ""}} onChange={(e) => this.handleOnChange(e)} value={this.state.date} />
                <input type="time" name="time" onChange={e => this.handleOnChange(e)} value={this.state.time} />
                        <a className="back-button" href="#slide1">Back</a>
                        <a className="next-button" href="#slide3">next</a>

                    </div>
                    <div id="slide3" className="input-box-horizontal-scroll">

                    <h3 className="slide-title">Location</h3>

            <p className="lat-lng">Lat: {this.state.center.lat} Lng: {this.state.center.lng}</p>
                <div className="catch-map">
                    <div className="center-marker"></div>
                 <GoogleMapReact
                    className="react-map"
                    bootstrapURLKeys={{key: "AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ"}}
                    defaultCenter={{ lat: 30.807042990766117, 
                        lng: -98.40859740107271,}}
                    defaultZoom={this.state.zoom}
                    center={this.state.center}
                   onChange={({ center, zoom, bounds, marginBounds }) => {
                       this.handleMapChange(center, zoom, bounds, marginBounds);
                     
                  }}
                    key={this.state.key}
                    >
                        


                    </GoogleMapReact>
                    </div>
                        <a className="back-button" href="#slide2">Back</a>
                        <a className="next-button" href="#slide4">Next</a>

                    </div>
                    <div id="slide4" className="input-box-horizontal-scroll">

                    <h3 className="slide-title">Species</h3>
                    <select name="species_id" value={this.state.species_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose a species">
                   
                   <option disabled value=""> -- select a species -- </option>
                   {this.renderSpeciesOptions()}
               </select>
                        <a className="back-button" href="#slide3">Back</a>
                        <a className="next-button" href="#slide5">next</a>

                    </div>
                    <div id="slide5" className="input-box-horizontal-scroll">

                    <h3 className="slide-title">Add Measurements</h3>
                        
                        <label>Inches: </label>
                        <input type="number" name="inches" onChange={e => this.handleOnChange(e)} value={this.state.inches}/>
                       
                        <a className="back-button" href="#slide4">Back</a>
                        <a className="next-button" href="#slide6">next</a>

                    </div>
                    <div id="slide6" className="input-box-horizontal-scroll">

                    <h3 className="slide-title">Bait</h3>

                    <select name="bait_id" value={this.state.bait_id} onChange={(e) => this.handleOnChange(e)} placeholder="choose bait">
                    
                    <option disabled value=""> -- which bait did you use -- </option>
                        {this.renderBaitsOptions()}
                    </select>
                        <a className="back-button" href="#slide5">Back</a>
                        <a className="next-button" href="#slide7">next</a>

                    </div>
                    <div id="slide7" className="input-box-horizontal-scroll">
                    <h3 className="slide-title">Description</h3>
                    <div>
                        <textarea className="catch-input-description" name="notes" value={this.state.notes} onChange={(e) => this.handleOnChange(e)} />
                    </div>    
                        <a className="back-button" href="#slide6">Back</a>
                        <a className="next-button" href="#slide8">next</a>

                    </div>

                    <div id="slide8" className="input-box-horizontal-scroll">
                    <h3 className="slide-title">Review</h3>
                        <div className="image-preview-div" style={{height: 220, width: 220}} >
                             {this.renderImagePreview()}
                             <br />
                        </div>
                        <div>
                            <h3>{this.selectedSpeciesName() }</h3>
                            <h4>Lat: {this.state.center.lat}, Lng: {this.state.center.lng}</h4>
                            <h4>Measurments: {this.state.inches}in.</h4>
                            <h4>Caught with: {this.selectedBaitName() }</h4>
                            <label>Description:</label>
                            <p>{this.state.notes}</p>
                        </div>
                    
                        <input type="submit" value="SAVE" />

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
                    <div  ><a className="dot d8 slide8" href="#slide8" >.</a></div>
                </div>
            </div> 
            </form>

           
        </div>
        )
    }
}






export default  EditCatch;