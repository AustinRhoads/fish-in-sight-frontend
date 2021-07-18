import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import {/*Map, InfoWindow, Marker,*/ GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import SpotMarker from './SpotMarker';
import CatchMarker from './CatchMarker'
import cuid from 'cuid'

//const AnyReactComponent = ({text}) => <div>{text}</div>;

class SpotsMapContainer extends Component {
    

    state = {
        address: "",
        center:{
            lat: 30.807042990766117, 
            lng: -98.40859740107271,
        },
        zoom: 11,
       // spots: [],
       // catches: [],
        newSpotLat: 0,
        newSpotLng: 0,
        key: "",
       
    }

    componentDidMount(){
        this.setMyLocation()
        console.log(this.props)
       
      }



      setMyLocation = () => {
          
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
             
              this.setState({
                  address: "",
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
                key: cuid(),
                newSpotLat: position.coords.latitude,
                newSpotLng: position.coords.longitude,
                
  
              })
  
            })
  
          }
      }




      ////event handlers///

      handleChange = address => {
        this.setState({ address });
      };

      handleSelect = address => {
          geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
            this.setState({address,
              center: {
                lat: latLng.lat,
                lng: latLng.lng,
              }})
          })
          .catch(error => {console.log(error)})
      }

      renderSpots = () => {
          if(this.props.spots){
              return this.props.spots.map(spot => <SpotMarker key={cuid()} color="blue" name={spot.name}  lat={spot.lat} lng={spot.lng} />)
          }
      }

      renderCatches = () => {
        if(this.props.catches){
          console.log(this.props.catches)
          return this.props.catches.map(caught => <CatchMarker key={cuid()} caught={caught} color="green" lat={caught.lat} lng={caught.lng} />)
        }
      }

      handelMapClick = (x, y, lat, lng, event) =>{

        this.setState({
            newSpotLat: lat,
            newSpotLng: lng,
        })
        this.props.updateLatLngAddress(lat, lng, '')
        this.setState({address: ''})
       
      }


    



    render(){
        return(
            <div className="map-container" >
               
                <div className="map-box" style={{width: '90%', height: 'calc(90% - 110px)'}}>
                    <PlacesAutocomplete
                         value={this.state.address}
                         onChange={this.handleChange}
                         onSelect={this.handleSelect}
                    >
                         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                          />

                           <button onClick={this.setMyLocation}>My Loc</button>
                            <br />
                            <span>LAT: {this.state.newSpotLat} LNG: {this.state.newSpotLng} </span>
                          
                          <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                              const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                                <div key={cuid()}
                                  {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                  })}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                              );
                            })}
                          </div>
                          
           
          </div>
        )}
    
                    </PlacesAutocomplete>
                   

                

                    <GoogleMapReact
                    className="react-map"
                    bootstrapURLKeys={{key: "AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ"}}
                    defaultCenter={{ lat: 30.807042990766117, 
                        lng: -98.40859740107271,}}
                    defaultZoom={this.state.zoom}
                    center={this.state.center}
                    onClick = {({x, y, lat, lng, event}) => this.handelMapClick(x, y, lat, lng, event)}
                    key={this.state.key}
                    >
                        
                        {this.renderSpots()}
                        {this.renderCatches()}
                        
                        <SpotMarker id="new_spot" color="rgb(0,255,0,0.3)" lat={this.state.newSpotLat} lng={this.state.newSpotLng}/>


                    </GoogleMapReact>

                </div>


            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ")
  })(SpotsMapContainer)


  //30.450038869261256, -95.60371554143748 lake conroe
  