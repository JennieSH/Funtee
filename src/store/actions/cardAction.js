import firebase from "firebase/app";


// Category - create
export const toggleCreateBook = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_CREATE_BOOK" })
    }
}

export const createBook = ( uid, data ) =>{ 
    return ( dispatch ) => {

        if ( data.bookName === null ||  data.bookName.trim() === ""){
            dispatch ({ type: "CREATE_BOOK_NAME_ERR" })
        }else if( data.lang === null ||  data.lang.trim() === ""){
            dispatch ({ type: "CREATE_BOOK_LANG_ERR" })
        }else{
            const firestore = firebase.firestore();
            const bookName = data.bookName.trim();
            const lang = data.lang.trim();
            const time = new Date().getTime();

            firestore.collection( "Cards" ).doc( uid ).collection( uid ).doc( `${time}` ).set({    
                book:{
                    id:bookName,
                    lang:lang,
                },
                cards:[],
                time: time
            }).then(()=>{
                dispatch ({ type: "CREATE_BOOK" })

            }).catch((err)=>{
                dispatch ({ type: "CREATE_BOOK_ERR", err })
            })      
        } 
    }
}
// Category - delete
export const toggleDeleteBookIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_DELETE_BOOK_ICON" })
    }
}

export const toggleDeleteBook = ()=>{ // Menu
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_DELETE_BOOK" })
    }
}

export const currentDeleteBook = ( uid, bookDocName, id )=>{
    return ( dispatch ) => {
        const  currentDeleteBook = {
            uid :uid,
            bookDocName : bookDocName,
            id: id
        }

        dispatch ({ type: "CURRENT_DELETE_BOOK", currentDeleteBook })
    }
}
export const deleteBook = ( uid, bookDocName )=>{
    return ( dispatch ) => {

        const firestore = firebase.firestore();
        const book = bookDocName.toString();
     
        firestore.collection( "Cards" ).doc( uid ).collection( uid ).doc( book ).delete().then(() => {

            // window.location.href = "/flashcard"
        })
        .then(()=>{
            dispatch ({ type: "DELETE_BOOK" })
        })
        .catch((err)=>{
            dispatch ({ type: "DELETE_BOOK_ERR", err })
        })

        
    }
}
// Category - edit
export const toggleEditBookIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_EDIT_BOOK_ICON" })
    }
}
export const toggleEditBook = ()=>{ // Menu
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_EDIT_BOOK" })
    }
}

export const currentEditBook = ( uid, bookDocName, bookData )=>{
    return ( dispatch ) => {
        const  currentEditBook = {
            uid :uid,
            bookDocName : bookDocName,
            bookData: bookData
        }

        dispatch ({ type: "CURRENT_EDIT_BOOK", currentEditBook })
    }
}
export const editBook = ( uid, bookDocName, bookEditData )=>{
    return ( dispatch ) => {

        const firestore = firebase.firestore();
        const book = bookDocName.toString();
        firestore.collection( "Cards" ).doc( uid ).collection( uid ).doc( book ).update({
            book: bookEditData
        }).then(() => {
            dispatch ({ type: "EDIT_BOOK" })
        }).catch((err)=>{
            dispatch ({ type: "EDIT_BOOK_ERR", err })
        })
        
    }
}





// Collection - create
export const toggleCreateCard = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_CREATE_CARD" })
    }
}

export const createCard = ( uid, bookDocName, cardArr, data ) =>{
    return ( dispatch ) => {

        if ( data.front === null ||  data.front.trim() === ""){
            dispatch ({ type: "CREATE_CARD_FRONT_ERR" })
        }else if( data.back === null ||  data.back.trim() === ""){
            dispatch ({ type: "CREATE_CARD_BACK_ERR" })
        }else{
            const firestore = firebase.firestore();
            const front = data.front.trim();
            const back = data.back.trim();
            cardArr.push({
                front: front,
                back : back,
                star: false
            })

            firestore.collection( "Cards" ).doc( uid ).collection( uid ).doc( bookDocName ).update({      
                cards: cardArr
            }).then(()=>{
                dispatch ({ type: "CREATE_CARD" })
            }).catch((err)=>{
                dispatch ({ type: "CREATE_CARD_ERR", err })
            })        
        }    
    }
}
// Collection - delete
export const toggleDeleteCardIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_DELETE_CARD_ICON" })
    }
}

export const toggleDeleteCard = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_DELETE_CARD" })
    }
}

export const currentDeleteCard = ( uid, bookDocName, card, cardArr, index )=>{
    return ( dispatch ) => {

        const  currentDeleteCard = {
            uid : uid,
            bookDocName : bookDocName,
            card : card,
            previousCardArr : cardArr,
            index : index
        }
        
        dispatch ({ type: "CURRENT_DELETE_CARD", currentDeleteCard})
    }
}
export const deleteCard = ( currentDeleteCard )=>{
    return ( dispatch ) => {

        const firestore = firebase.firestore();
        const bookDocName = currentDeleteCard.bookDocName.toString();
        
        // const newCardArr = JSON.parse(JSON.stringify(currentDeleteCard.previousCardArr));      
        // newCardArr.splice( currentDeleteCard.index, 1 )

        currentDeleteCard.previousCardArr.splice( currentDeleteCard.index, 1 )

        firestore.collection( "Cards" ).doc( currentDeleteCard.uid ).collection( currentDeleteCard.uid ).doc( bookDocName).update({
            cards: currentDeleteCard.previousCardArr
        }).then(() => {
            dispatch ({ type: "DELETE_CARD" })
        }).catch((err)=>{
            dispatch ({ type: "DELETE_CARD_ERR", err })
        })        
    }
}
// Collection - edit
export const toggleEditCardIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_EDIT_CARD_ICON" })
    }
}
export const toggleEditCard = ()=>{ // Menu
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_EDIT_CARD" })
    }
}

export const currentEditCard = ( uid, bookDocName, card, cardArr, index )=>{
    return ( dispatch ) => {
        const  currentEditCard = {
            uid : uid,
            bookDocName : bookDocName,
            card : card,
            cardArr : cardArr,
            index : index
        }

        dispatch ({ type: "CURRENT_EDIT_CARD", currentEditCard })
    }
}
export const editCard = ( uid, bookDocName, newCard, previousCardArr, index )=>{
    return ( dispatch ) => {
       
        if ( newCard.front === null ||  newCard.front.trim() === ""){
            dispatch ({ type: "EDIT_CARD_FRONT_ERR" })         
        }else if( newCard.back === null ||  newCard.back.trim() === ""){
            dispatch ({ type: "EDIT_CARD_BACK_ERR" })
        }else{
        const firestore = firebase.firestore();
        const book = bookDocName.toString();

        previousCardArr[index]=newCard;

        firestore.collection( "Cards" ).doc( uid ).collection( uid ).doc( book ).update({
            cards : previousCardArr
        }).then(() => {
            dispatch ({ type: "EDIT_CARD" })
        }).catch((err)=>{
            dispatch ({ type: "EDIT_CARD_ERR", err })
        })
       
        }
        
    }
}


// Card

export const getCurrentCard = ( currentCard ) =>{
    return ( dispatch) =>{          
        dispatch({ type: "GET_CURRENT_CARD", currentCard });                 
    }
}

export const lastCard = ( indexCard )=> {
    return ( dispatch) =>{     
        if( indexCard > 1 ){
            dispatch({ type: "TO_LAST_CARD" });
        }else{
            dispatch({ type: "TO_LAST_CARD_ERR" });
        }              
    }
}

export const nextCard = ( indexCard, maxCard ) => {
    return ( dispatch) =>{
        if( indexCard < maxCard ){
                dispatch({ type: "TO_NEXT_CARD" });
        }else{
            dispatch({ type: "TO_NEXT_CARD_ERR" });
        }    
    }
}

export const toggleCopyWord = () =>{
    return ( dispatch ) =>{
        dispatch({ type: "TOGGLE_COPY_WORD" })
    }
}

export const textToSpeech = ( targetWords,targetSide ) =>{

    // console.log(targetWrds)
    // let apiKey = "AIzaSyD-I8KgXlOZVldg8tK77bL-jpfcL6GKKZ4";
    // let ttssrc = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
    //         fetch( ttssrc , {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 "audioConfig": {
    //                 "audioEncoding": "MP3",
    //                 "pitch": 0,
    //                 "speakingRate": 1
    //                 },
    //                 "input": {
    //                 "text": `${this.state.chinese}`
    //                 },
    //                 "voice": {
    //                 "languageCode": "cmn-CN",
    //                 "name": "cmn-CN-Standard-D"
    //                 }            
    //             }),                    
    //         }).then(function(response) {
    //                 return response.json()      
    //         }).then((res)=>{
                
    //             this.setState({
    //                 ...this.state,
    //                 audio:res.audioContent
    //              })
 
    //         }).then(()=>{
    //             console.log("get audio")
    //         }).catch((err)=>{
    //             console.log("tts API err"+err)
    //         }) 
    console.log(targetWords,targetSide) 
    return( dispatch )=>{
        dispatch({ type: "GET_TTS" })
    }
}