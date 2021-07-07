

export function getBaits(){
   
        return (dispatch) => {
            fetch(`http://localhost:3000/api/v1/baits`)
            .then(resp => resp.json())
            .then(ary => {
                
               dispatch({type: "GET_ALL_BAITS", baits: ary})
            })
            }
  

}