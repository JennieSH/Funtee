const initState = {
    authError:null,
};
const authReducer = ( state = initState, action) =>{
    switch( action.type ){
        // sign in
        case "SIGNIN_ERROR":
            console.log( "sign in error" )
        return {
            ...state, // need to copy before change one of items
            authError : "Please check those details and try again." 
        }
        case "SIGNIN_SUCCESS":
            console.log("sign in success")
            return {
                ...state,
                authError:null,
            }

        // sign out
        case "SIGNOUT_SUCCESS":
            alert("sign out success")
            console.log("sign out success")
            return state
        case "SIGNOUT_ERROR":
            console.log("sign out failed")
            return state

        // sign up
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                authError: null
            }
        case "SIGNUP_ERROR":    
            return {
                ...state,
                authError: action.error.message // call parameter of action
            }

        // reset password
        case "RESET_PASSWORD_SUCCESS":
            console.log("reset password success")
            return {
                ...state,
                authError: null
            } 
        case "RESET_PASSWORD_ERROR":
            return {
                ...state,
                authError: action.error.message
            }

        default:
            return state
    }
}

export default authReducer