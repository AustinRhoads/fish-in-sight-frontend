import React from 'react'
//import {Link} from 'react-router-dom'
import './container.css'

function AuxNavBar(){


    return(
        <div className="aux-nav">
            <a href="/mycatches">MY CATCHES</a>
            <a href="/newCatch">NEW CATCH</a>
        </div>
    )
}

export default AuxNavBar;