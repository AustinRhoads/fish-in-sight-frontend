import React from 'react'


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



    return(
        <div className="" style={{height:96, "width": '100%'}}>
            <div className="catch-li-box" >

              {renderImage()}

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