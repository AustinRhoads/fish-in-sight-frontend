import React, { useState } from 'react';
import { connect } from 'react-redux';
import CatchBox from './CatchBox';
import cuid from 'cuid'
import FilterCatches from './FilterCatches.js'



export function Catches(props){

 console.log(props)
    
const [filterOn, setFilterOn] = useState(false)
const [filteredList, setFilteredList] = useState(null)

 const filterize = (newList) => {
     setFilterOn(true);
     setFilteredList(newList)
 }

 const unfilterize = () => {
    setFilterOn(false);
    setFilteredList(null)
 }


 

   const renderList = () => {

           
    if(!filterOn){
        if(props.catches && props.catches.length > 0){
                
            return  props.catches.map(caught => caught.image ?  <li key={cuid()} > <CatchBox uid={caught.user_id} caught={caught} /> </li> : null )
        }else {
            return <h3>No Catches Logged Yet</h3>
        }
    } else {
        if(filteredList && filteredList.length > 0){
                
            return  filteredList.map(caught => caught.image ?  <li key={cuid()} > <CatchBox uid={caught.user_id} caught={caught} /> </li> : null )
        }else {
            return <h3>No Matching Catches</h3>
        }
    }

            
            


    }

  




   

       
        return(
          <>
         
            <div className="catches-list">
                <div className="list-grid">
                    <ul className="list-grid-ul">
                        {renderList()}
                    </ul>
                </div>
                <FilterCatches filterize={filterize} unfilterize={unfilterize} species={props.species} baits={props.baits} spots={props.spots} catches={props.catches} />
               
                </div>
    
                </>
        )
    
}

const mapStateToProps = state => {
    
    return {
        species: state.species.all_species,
        baits: state.baits.all_baits,
        spots: state.spots.all_spots,
    }
}


export default connect(mapStateToProps) (Catches);