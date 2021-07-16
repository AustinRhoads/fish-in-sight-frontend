import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { Redirect} from 'react-router-dom'
import CatchBox from './CatchBox';
import cuid from 'cuid'
//import FilterCatches from './FilterCatches.js'
//import  StatsBox from '../users/StatsBox';


class AllCatches extends Component{

    state = {
        catches: [],
        is_fetched: false,
    }

  async  componentDidMount(){
        const catches = await fetch("http://localhost:3000/api/v1/catches").then(resp => resp.json())
        this.setState({catches: catches, is_fetched: true})
    }

    renderCatches = () => {
        if(this.state.is_fetched){
            return(
                <ul>
                    {this.state.catches.map(caught => caught.image ?  <li key={cuid()} > <CatchBox uid={caught.user_id} caught={caught} /> </li> : null )}
                </ul>
            )
        }
    }

render(){
    return(
        <div className="global-feed-catches">
            {this.renderCatches()}

        </div>
    )
}

}

export default AllCatches;