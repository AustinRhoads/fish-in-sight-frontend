import React, { Component } from 'react';
import './markers.css'

const markerTag = (caught) => {
    return(
    <div className="marker-catch-div">
        <a href={`/catches/${caught.id}`}><h3>{caught.user.username}</h3>
        <img alt="tag-display" style={{widht: 80, height: 80}} src={caught.image.url} />
        </a>
        </div>
    )
}

class CatchMarker extends Component{

    state={
        hover: false,
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    }
   
    renderCatchTag = () => {
        if(this.state.hover && !this.props.noPopup){
            return markerTag(this.props.caught)
        }
    }

  render(){

    return(
        <div className="Catch-marker"  onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}  /*style={{ backgroundColor: this.props.color, cursor: 'pointer'}}*/>
          {this.renderCatchTag()}
        </div>
    )
  }

  
}

export default CatchMarker;