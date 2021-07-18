import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import CatchMarker from '../maps/CatchMarker';

class Catch extends Component{
    state = {
        caught: {},
        is_fetched: false,
    }

    

    async componentDidMount(){
        const caught = await fetch(`http://localhost:3000/api/v1/catches/${this.props.match.params.id}`).then(resp => resp.json())
        this.setState({caught: caught,  is_fetched: true})
       
    }

    renderSpeciesName = () => {
        if(this.state.caught.species.name){
            return <h3>{this.state.caught.species.name}</h3>
        }
    }

    renderBaitName = () => {
        if(this.state.caught.bait.name){
            return <h3>{this.state.caught.bait.name}</h3>
        }
    }

    renderLocation = () => {

    }

    renderNotes = () => {
        if(this.state.caught.notes){
            return <p>{this.state.caught.notes}</p>
        }
    }

    renderEditPage = () => {
        
        if(this.state.caught.user_id === this.props.uid){
            return(
                <a href={`/catches/${this.state.caught.id}/edit`}>Edit</a>
            )
            
        }
    }

    renderCatchMap = () => {
        if(this.state.caught.lat && this.state.caught.lng){
           
            const center = {lat:  parseFloat(this.state.caught.lat), lng: parseFloat(this.state.caught.lng)}
            return(
                <div className="catch-map">
                
             <GoogleMapReact
                className="react-map"
                bootstrapURLKeys={{key: "AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ"}}
                defaultCenter={{ lat: 30.807042990766117, 
                    lng: -98.40859740107271}}
                defaultZoom={11}
                center={center}
               onChange={({ center, zoom, bounds, marginBounds }) => {
                   //this.handleMapChange(center, zoom, bounds, marginBounds);
                 
              }}
                
                >
                    <CatchMarker caught={this.state.caught} lat={this.state.caught.lat} lng={this.state.caught.lng} noPopup={true} />

                </GoogleMapReact>
                </div>
            )
        } else {
            <h3>No Location Provided</h3>
        }
    }

    renderCaught = () => {
        if(this.state.is_fetched){
           
            return(
                <div className="catch-page">
                    <h3><a href={`/users/${this.state.caught.user_id}`}>{this.state.caught.user.username}</a></h3>
                <img src={this.state.caught.image.url} alt={`catch${this.state.caught.id}`} />
                <h3 className="display-banner">DESCRIPTION</h3>
                {this.renderNotes()}
                <h3 className="display-banner">SPECIES</h3>
                {this.renderSpeciesName()}
                <h3 className="display-banner">BAIT</h3>
                {this.renderBaitName()}
                <h3 className="display-banner">LOCATION</h3>
                {this.renderCatchMap()}


                {this.renderEditPage()}


                
                
            </div>
            )

        }
    }
   render(){
    return(
        <div>
            {this.renderCaught()}
        </div>
    )
   }

}

const mapStateToProps = state =>{
    
    return {
        allCatches: state.catches.allCatches
    }

}

export default connect(mapStateToProps) (Catch);