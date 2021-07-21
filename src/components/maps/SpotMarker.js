import React, { Component } from 'react';
import './markers.css'

const markerName = (name) => {
    return(
    <div className="marker-name-div">{name}</div>
    )
}

class SpotMarker extends Component{

    state={
        hover: false,
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    }
   
    renderName = () => {
        if(this.state.hover && !this.props.hideName){
            return markerName(this.props.name)
        }
    }

  render(){

    return(
        <div className="spot-marker"  onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} /* style={{ backgroundColor: this.props.color, cursor: 'pointer'}}*/>
          {this.renderName()}
        </div>
    )
  }

  
}

export default SpotMarker;