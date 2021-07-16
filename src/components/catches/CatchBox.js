//import React, { Component } from 'react'
import React from 'react'


//class CatchBox extends Component {
//    componentDidMount(){
//        console.log(this.props)
//    }
//
//renderImage = () => {
//    if(this.props.caught.image){
//        return(
//            <img className="catch-image" style={{height: 90, width: 90}} src={this.props.caught.image.url} alt="caught pic"></img>
//            
//        )
//    } else if(this.props.caught.species) {
//        return(
//            <h3 className="tempStuff" style={{height: 80, width: 80}} >{this.props.caught.species.name}, <i>{`${this.props.caught.species.scientific_name}`}</i></h3>
//            
//        )
//     
//    }
//}
//
//
//renderDeleteButton = () => {
//    if(this.props.caught.user_id === this.props.uid){
//        return <button>X</button>
//    }
//}
//
//
//render(){
//    return(
//        <div className="" style={{height:96, "width": '100%'}}>
//            <div className="catch-li-box" >
//
//              {this.renderImage()}
//
//                {/*<div className="catch-box-overlay">
//                    <p>{this.props.caught.notes}</p>
//                    <h3>BAIT: {this.props.caught.bait.name}</h3>
//                </div>*/}
//                <div className="info-box" style={{}}>
//                {this.props.caught.species.name}, <i>{`${this.props.caught.species.scientific_name}`}</i>
//                
//                </div>
//
//            </div>
//            
//        </div>
//    )
//}
//
//
//}
//
//export default CatchBox;


export function CatchBox(props) {


const renderImage = () => {
    if(props.caught.image){
        return(
            <img className="catch-image" style={{height: 90, width: 90}} src={props.caught.image.url} alt="caught pic"></img>
            
        )
    } else if(props.caught.species) {
        return(
            <h3 className="tempStuff" style={{height: 80, width: 80}} >{props.caught.species.name}, <i>{`${props.caught.species.scientific_name}`}</i></h3>
            
        )
     
    }
}


//const renderDeleteButton = () => {
//    if(props.caught.user_id === props.uid){
//        return <button>X</button>
//    }
//}



    return(
        <div className="" style={{height:96, "width": '100%'}}>
            <div className="catch-li-box" >

              {renderImage()}

                {/*<div className="catch-box-overlay">
                    <p>{this.props.caught.notes}</p>
                    <h3>BAIT: {this.props.caught.bait.name}</h3>
                </div>*/}
                <div className="info-box" style={{}}>
                {props.caught.species.name}, <i>{`${props.caught.species.scientific_name}`}</i>
                <br />
                <a href={`/catches/${props.caught.id}`}>Details</a>
                </div>

            </div>
            
        </div>
    )



}

export default CatchBox;