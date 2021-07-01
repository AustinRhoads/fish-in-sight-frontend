import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import cuid from 'cuid';
 
export class FirstMapsContainer extends Component {
  state = {
    address: '',
    showingInfoWindow: false,
    selectedPlace: {},
    activeMarker: {},
    draggable: true,

    mapCenter: {
      lat: 30.266666,
      lng: -97.733330,
    },
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          address, 
        mapCenter: {
          lat: latLng.lat,
          lng: latLng.lng,
        }
        })
        console.log('Success', latLng)})
      .catch(error => console.error('Error', error));
  };

  handleDragen = (t, map, coord) => {
    console.log(t, map, coord)
  }



  componentDidMount(){
 

    if (navigator.geolocation) {
 
      navigator.geolocation.getCurrentPosition(position => {
       
        this.setState({
          mapCenter: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      })
    }
  }





  render() {
    console.log(this.state.mapCenter)
    return (
      <div >
        <h1>Map</h1>

        

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
      <br />

              <div className="map">
      <Map className="map-div" google={this.props.google} zoom={14} initialCenter={this.state.mapCenter}
      center={this.state.mapCenter}
    
      >
 
        <Marker position={this.state.mapCenter}
           draggable={true}
           onDragend={(t, map, coord) => this.handleDragen(t, map, coord)} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ")
})(FirstMapsContainer)