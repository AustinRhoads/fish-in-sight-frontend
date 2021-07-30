import React, { Component } from 'react'


class UserEdit extends Component{

    state = {
        user: {},
        email: "",
        username: "",
        image: "",
        image_preview: "",
        image_updated: false,
        loaded: false,
    }

    async componentDidMount(){
        const user = await fetch(`http://localhost:3000/api/v1/users/${this.props.match.params.id}`).then(resp => resp.json());
        
        
        this.setState({
            user: user,
            email: user.email,
            username: user.username,
            loaded: true,

        })
        if(user.image){
            this.setState({
                image_preview: user.image.url,
            })
        }

        this.editProtect(user)       

    }

    editProtect = (user) => {

       var currentUser = JSON.parse(localStorage.getItem('user'))

        if(user.id !==  currentUser.id){
            console.log(user.id,  currentUser.id)
            this.props.history.push(`/users/${user.id}`)
        }
    }


    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    fileSelectHandler = (e) => {
        if(e.target.files[0]){
            
            this.setState({image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0]), image_updated: true})
           
       }
      
    }

    unselectImage = (e) => {
        e.preventDefault();
        this.setState({
            image: "",
            image_preview: "",
        })
        document.getElementById("file-input").value = "";
    }

    renderImagePreview = () => {
        if(this.state.image_preview){
            return(
                <>
                    <img alt="user-preview" src={this.state.image_preview} />
                    <button className="image-preview-delete-button" onClick={e => this.unselectImage(e)}>-</button>
                </>
            )
        }
    }



    getCSRFToken = () => {
        return unescape(document.cookie.split('=')[1])
    }
    


     handleOnSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        formData.append('id', this.state.user.id)
        formData.append('username', this.state.username)
        formData.append('email', this.state.email)
        if(this.state.image_updated){
            formData.append('image', this.state.image)
           }

           const configObject = {
            method: "PUT",
            credentials: 'include',
            headers: {
                'X-CSRF-Token': this.getCSRFToken(),
                
            },
            body: formData
        }


        
       await fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, configObject)
        .then(resp => resp.json())
        .then(resp => {
            console.log("catches res", resp);
            this.props.history.push(`/users/${this.state.user.id}`)
        }).catch(error =>{
            console.log("catches error", error)
        });
    



    }

    renderForm = () => {
        if(this.state.loaded === true){
            return(
                <form className="user-edit-form" style={{width: 200, height: 200}} onSubmit={e => this.handleOnSubmit(e)}>

                    <div className="user-image-preview-div">
                    {this.renderImagePreview()}
                    </div>
                    
                <input id="file-input" type="file" accept="image/*" multiple={false} name="image" onChange={e =>  this.fileSelectHandler(e)}/>
                <h3>Username: <input type="text" name="username" onChange={(e) => this.handleOnChange(e)} value={this.state.username} /></h3>
                <h3>Email: <input type="text" name="email" onChange={(e) => this.handleOnChange(e)} value={this.state.email} /></h3>

                <input type="submit" value="SAVE CHANGES" />
                
            </form>
          
            )
        }
    }



    render(){
        return(
            <div>
                {this.renderForm()}
                <footer style={{height: 180}}></footer>
            </div>
        )
    }
}

export default UserEdit;