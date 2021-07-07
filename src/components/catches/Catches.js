import React, { Component } from 'react';
import CatchBox from './CatchBox';
import cuid from 'cuid'
import { connect } from 'react-redux';
import { getUserCatches } from "/home/austin/projects/fish-in-sight/fish-in-sight-frontend/src/actions/catchActions.js"

class Catches extends Component{

    state = {
        catches: []
    }

    componentDidMount(){
      /* this.loadCatches() */
      this.props.getUserCatches(this.props.uid)
    }


    renderList = () => {
        
            if(this.props.userCatches && this.props.userCatches.length > 0){
                
                return  this.props.userCatches.map(caught =>  caught.image ? <li key={cuid()} > <CatchBox uid={this.props.uid} caught={caught} /> </li> : null )
            } else if(this.props.loadingCatches) {
               return <h3>Loading...</h3>
            }else {
                return <h3>No Catches Logged Yet</h3>
            }
        

    }


    render(){
       
        return(
          
            <div className="catches-list">
                <div className="list-grid">
                    <ul className="list-grid-ul">
                        {this.renderList()}
                    </ul>
                </div>
               
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserCatches: (uid) => dispatch(getUserCatches(uid))
    }
}

const mapStateToProps = state => {
   
    return {
        userCatches: state.catches.userCatches,
        loadingCatches: state.catches.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Catches);