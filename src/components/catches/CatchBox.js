import React, { Component } from 'react'


class CatchBox extends Component {

renderImage = () => {
    if(this.props.caught.image){
        return(
            <img className="catch-image" src={this.props.caught.image.url} alt="caught pic"></img>
        )
    }
}



render(){
    return(
        <div className="catch-box">
            <h3>SPECIES: {this.props.caught.species.name}, <i>{`${this.props.caught.species.scientific_name}`}</i></h3>
            {this.renderImage()}
            <h3>BAIT: {this.props.caught.bait.name}</h3>
        </div>
    )
}


}

export default CatchBox;