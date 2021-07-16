import React, { Component } from 'react'
import { connect } from 'react-redux'

class Catch extends Component{
    state = {
        caught: {},
        is_fetched: false,
    }

    async componentDidMount(){
        const caught = await fetch(`http://localhost:3000/api/v1/catches/${this.props.match.params.id}`).then(resp => resp.json())
        this.setState({caught: caught,  is_fetched: true})
        console.log(caught)
    }

    renderCaught = () => {
        if(this.state.is_fetched){
            const caught = this.state.caught
            return(
                <div className="catch-page">
                    <h3><a href={`/users/${caught.user_id}`}>{caught.user.username}</a></h3>
                <img src={caught.image.url} alt={`catch${caught.id}`} />
                <p>{caught.notes}</p>
                <h3>SPECIES: {caught.species.name}</h3>
                <h3>BAIT: {caught.bait.name}</h3>
                
            </div>
            )

        }
    }
   render(){
    return(
        <div>
            {this.renderCaught()}
        </div>
    )
   }

}

const mapStateToProps = state =>{
    
    return {
        allCatches: state.catches.allCatches
    }

}

export default connect(mapStateToProps) (Catch);