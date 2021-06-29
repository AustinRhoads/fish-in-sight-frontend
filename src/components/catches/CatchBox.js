import React from 'react'


const CatchBox = (caught) => {



    return(
        <div className="catch-box">
            <h3>SPECIES: {caught.species.name}, <i>{`${caught.species.scientific_name}`}</i></h3>
            <h3>BAIT: {caught.bait.name}</h3>
        </div>
    )
}

export default CatchBox;