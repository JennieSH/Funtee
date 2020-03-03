const initState = {
    authError : null,
    signUpError : null,
    passwordError : null,
    passwordDialogBox : false,
    signOutDialogBox : false
};
const authReducer = ( state = initState, action) =>{
    switch( action.type ){

        // sign in
        case "SIGNIN_ERROR":
            // console.log( "sign in error")
            return {
                ...state, 
                authError : "Please check those details and try again." 
            }
        case "SIGNIN_THIRD_ERROR":
            // console.log( "sign in error" + action.error)
            return state
        case "SIGNIN_SUCCESS":
            return {
                ...state,
                authError:null,
            }

        // sign up
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                signUpError: null
            }
        case "SIGNUP_ERROR":    
            return {
                ...state,
                signUpError: action.error.message 
            }
            
        // sign out
        case "SIGNOUT_SUCCESS":
            // console.log("sign out success")
            return {
                ...state,
                signOutDialogBox: false
            }
        case "SIGNOUT_ERROR":
            // console.log("sign out failed")
            return state
        case "TOGGLE_SIGNOUT":
            return {
                ...state,
                signOutDialogBox: !state.signOutDialogBox
            }
            
        // reset password
        case "RESET_PASSWORD_SUCCESS":
            // console.log("reset password success")
            return {
                ...state,
                authError: null,
                passwordError: null,
                passwordDialogBox: true,
            } 
        case "RESET_PASSWORD_ERROR":
            return {
                ...state,
                passwordError: action.error.message
            }
        case "CLOSE_PASSWORD_DIALOGBOX":
            return {
                ...state,
                passwordError:null,
                passwordDialogBox: false  
            }

        default:
            return state
    }
}

export default authReducer