import firebase from "firebase/app";
import "firebase/storage"


export const lastPage = ( indexPage )=> {
    return ( dispatch) =>{     
        if( indexPage > 1 ){
            dispatch({ type: "TO_LAST_PAGE" });
        }else{
            dispatch({ type: "TO_LAST_PAGE_ERR" });
        }              
    }
}


export const nextPage = ( indexPage, maxPage ) => {
    return ( dispatch) =>{
        if( indexPage < maxPage ){
                dispatch({ type: "TO_NEXT_PAGE" });
        }else{
            dispatch({ type: "TO_NEXT_PAGE_ERR" });
        }    
    }
}

// export const getSymbolAudio = () => {
//     return ( dispatch) =>{
//         const storage = firebase.storage();
//         const storageRef = storage.ref().child("symbolSVG");
//         let symbolAudioArr=[];
//         storageRef.listAll().then( res => {
//             res.items.forEach(function(itemRef) {
//                 console.log(itemRef)
//                 itemRef.getDownloadURL().then(function (url) {
//                     console.log(url)
//                     symbolAudioArr.push(url);
//                     dispatch({ type: "GET_SYMBOL_AUDIO", symbolAudioArr});
//                 })
//             });            
//         }).catch(function(error) {
//             console.log("getSymbolAudio"+error)
//             dispatch({ type: "GET_SYMBOL_AUDIO_ERR"});
//         });
//     }
// }


// export const getSymbolAudioEach = (itemRef) => {
//     return ( dispatch) =>{
//         itemRef.getDownloadURL().then(function (url) {          
//             dispatch({ type: "GET_SYMBOL_AUDIO_EACH",url});
//         }).catch(()=>{
//             dispatch({ type: "GET_SYMBOL_AUDIO_EACH_ERR"});
//         })
//     }
// }

