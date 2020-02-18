// Common Action ()
// export const creactFruit = (fruit) =>{
//     return{
//         type : "ADD_FRUIT",
//         fruit : fruit
//     }
// }
import firebase from "firebase/app";

// Asynchronous Action()
export const createFruit = (fruit) =>{
    return ( dispatch, getState, { getFirebase, getFirestore } ) => {
        // make async call to database
        // const firestore = getFirestore(); // version problem
        const firestore = firebase.firestore();
        firestore.collection("fruit_type").add({
    
            ...fruit,
            auth:"Jennie",
            createAt: new Date()
        }).then(()=>{
            dispatch ({ type: "CREATE_FRUIT", fruit })
        }).catch((err)=>{
            dispatch ( { type: "CREATE_FRUIT_ERROR", err } )
        })      
    }
}
export const createData = (data) =>{
    return ( dispatch, getState, { getFirebase, getFirestore } ) => {

        const firestore = firebase.firestore();
        // firestore.collection("fruit_type").add({
        firestore.collection( "Topics" ).doc( "lesson" ).collection("emotion").add({
            ...data     
        }).then(()=>{
            dispatch ({ type: "CREATE_DATA", data })
        }).catch((err)=>{
            dispatch ( { type: "CREATE_DATA_ERROR", err } )
        })      
    }
}
