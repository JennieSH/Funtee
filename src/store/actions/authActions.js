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
    const firestore = firebase.firestore();
    return (( dispatch, getState )=>{
        firebase.auth().createUserWithEmailAndPassword( userInfo.email, userInfo.password )
        .then((response)=>{
            firestore.collection( "User" ).doc( response.user.uid ).set({
               name: userInfo.name,
               email: userInfo.email
           })               
        }).then(()=>{
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch((error)=>{
            dispatch({ type: "SIGNUP_ERROR", error })
        })
    }) 
}