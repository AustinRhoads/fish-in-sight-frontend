import React, { Component } from 'react';
import SpotsMapContainer from '../maps/SpotsMapContainer';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDRKWLt8ylJe2kVLSnueiWtspn10ngk6iQ")

class SpotInput extends Component{

    state = {
        name: "",
        address: '',
        lat: '',
        lng: '',
    }



login_check = () => {
    if(this.props.redirect){
        console.log("logged out")
       this.props.history.push("/")
    }
}

    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

        const {
            name,
            address,
            lat,
            lng
        } = this.state

        const newSpot = {
            name,
            address,
            lat,
            lng
        }



        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': this.getCSRFToken(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSpot)
        }

        fetch('http://localhost:3000/api/v1/spots', configObject)
        .then(resp => resp.json())
        .then(obj => {
           this.props.history.push("/spots")
        })
        .catch(error => {console.log(error)})
        this.setState({
            name: "",
            address: "",
            lat: 0,
            lng: 0,
        })
            this.props.history.push('/spots')
    }



    updateLatLngAddress = (lat, lng)=>{
        Geocode.fromLatLng(lat, lng)
        .then(resp => {
            this.setState({
                address: resp.results[0].formatted_address
            })
        })

        this.setState({
            lat: lat,
            lng: lng,
        })
    }


    render(){

        return(
            <div className="new-spot-div">
                <h2>New Spot</h2>
                
                <form className="new-spot-form" onSubmit={e => this.handleOnSubmit(e)}>
                    <div className="input-box">
                        <input required type="text" name="name" onChange={this.handleOnChange} placeholder="what's this place called?" value={this.state.name} />
                        <input type="submit" value="Save" />
                    </div>
                    <br />

                    <SpotsMapContainer uid = {this.props.uid} catches={this.props.allCatches}  spots={this.props.spots} updateLatLngAddress={this.updateLatLngAddress} />
                    
                </form>
                <footer style={{height: 180}}></footer>

            </div>
        )
    }
}

export default SpotInput;