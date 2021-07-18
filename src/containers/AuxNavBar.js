import React from 'react'
import './container.css'

function AuxNavBar(){


    return(
        <div className="aux-nav">
            <a href="/catches">FEED</a>
            <a href="/maps">MAPS</a>
            <a href="/catches/new">NEW CATCH</a>
            
            
        </div>
    )
}

export default AuxNavBar;