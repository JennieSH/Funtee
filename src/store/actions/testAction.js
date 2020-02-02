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

