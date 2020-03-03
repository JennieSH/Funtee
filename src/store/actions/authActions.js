import firebase from "firebase/app";

export const signIn = ( credentials ) => {
    return ( dispatch) =>{
        // const firebase = getFirebase(); // no longer available 

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({ type: "SIGNIN_SUCCESS" });
        }).catch(()=>{
            dispatch({ type: "SIGNIN_ERROR" })
        })
    }
}


export const signOut = () =>{
    return ( dispatch, getState ) =>{
        firebase.auth().signOut().then(()=>{
            dispatch({ type: "SIGNOUT_SUCCESS" })
        }).catch((err)=>{
            dispatch({ type: "SIGNOUT_ERROR" })
        })
    }
}


export const signUp = ( userInfo ) =>{
    // const firestore = firebase.firestore();
    return (( dispatch, getState )=>{
        firebase.auth().createUserWithEmailAndPassword( userInfo.email, userInfo.password )
        .then(()=>{
            firebase.auth().currentUser.updateProfile({
                displayName: userInfo.name 
              }).then(()=>{
                console.log("Update successful") 
              }).catch((err)=>{
                console.log("Update a user's profile"+err)
              });
        })
        .then(()=>{           
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch((error)=>{
            dispatch({ type: "SIGNUP_ERROR", error })
        })
    }) 
}

export const resetPassword = ( emailAddress ) =>{
    return(( dispatch, getState)=>{
        firebase.auth().sendPasswordResetEmail( emailAddress )
        .then(()=>{
            dispatch({ type: "RESET_PASSWORD_SUCCESS" })
        }).catch((error)=>{
            dispatch({ type: "RESET_PASSWORD_ERROR", error })
        });
    })
}

export const closePasswordDialogBox = () =>{
    return(( dispatch)=>{
            dispatch({ type: "CLOSE_PASSWORD_DIALOGBOX" })
    })
}