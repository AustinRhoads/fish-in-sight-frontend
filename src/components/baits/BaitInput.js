import React, { Component} from 'react';

class BaitInput extends Component {

    state = {
        name: "",
        efficacy_rating: 0,
        notes: "",
    }

    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)

        const {
            name,
            efficacy_rating,
            notes,
        } = this.state;

       const newBait = {
            name: name,
            efficacy_rating: efficacy_rating,
            notes: notes,
        }

        const configObject = {
            method: "POST",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': this.getCSRFToken(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBait)
        }
    

        fetch('http://localhost:3000/api/v1/baits', configObject)
        .then(resp => resp.json())
        .then(obj => /*this.props.updateBait(obj)*/ console.log("no bait update in local state", obj))
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        return(
            <div className="bait-input-div">

                <form className="bait-input-form" onSubmit={(e) => this.handleOnSubmit(e)}>
                    <label>New Bait</label>
                    <br />
                <input type="text" name="name" onChange={(e) => this.handleOnChange(e)} value={this.state.name} placeholder="Name" />
                <br/>
                <label>Notes:</label>
                    <br />
                <textarea type="text" name="notes" onChange={(e) => this.handleOnChange(e)} value={this.state.notes} />
                <br/>
                <label>Efficacy Rating (1-10)</label>
                    <br />

                <input type="number" min={0} max={10} name="efficacy_rating" onChange={(e) => this.handleOnChange(e)} value={this.state.efficacy_rating} />
                <br/>

                    
                <input type="submit" value="New Bait"/>
                </form>

            </div>
        )
    }

}

export default BaitInput;