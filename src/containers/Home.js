import React, { Component } from 'react'




class Home extends Component {



      componentDidMount(){
        let auxnav = document.body.querySelector('div.aux-nav')
        auxnav.style.display = "none";

      }



    renderAppropriatePage = () => {
      
        if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
         
           return(
            <div className="Welcome Page">
                <h2>CATCH FISH.</h2>
                <h2>EXPLORE NEW WATERS.</h2>
                <h2>CONNECT WITH OTHERS.</h2>
            </div>
           )
           }
    }

    renderApropriate = () => {
        if(this.props.loggedInStatus === "NOT_LOGGED_IN"){
        
            return(
                <h3><a href="/login">Login</a>/<a href="/register">Signup</a></h3>
            )
        
        }
    }



    render(){
        return(
            <div id="home-page">

            {/*this.renderAppropriatePage()*/}
            <div className="Welcome Page">
                <h2>CATCH FISH.</h2>
                <h2>EXPLORE NEW WATERS.</h2>
                <h2>CONNECT WITH OTHERS.</h2>
            </div>

            {this.renderApropriate()}
           
            </div>
        )
    }

}


  
export default Home;