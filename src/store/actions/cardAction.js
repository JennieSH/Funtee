import firebase from "firebase/app";


// Category 
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
                id:bookName,
                lang:lang,
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

export const toggleDeleteBookIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_DELETE_BOOK_ICON" })
    }
}

export const toggleDeleteBook = ()=>{
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
            dispatch ({ type: "DELETE_BOOK" })
        }).catch((err)=>{
            dispatch ({ type: "DELETE_BOOK_ERR", err })
        })

        
    }
}

export const toggleEditBookIcon = ()=>{
    return ( dispatch ) => {
        dispatch ({ type: "TOGGLE_EDIT_BOOK_ICON" })
    }
}










// Collection
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
        const newCardArr = JSON.parse(JSON.stringify(currentDeleteCard.previousCardArr));
        
        newCardArr.splice( currentDeleteCard.index, 1 )
    
        firestore.collection( "Cards" ).doc( currentDeleteCard.uid ).collection( currentDeleteCard.uid ).doc( bookDocName).update({
            cards: newCardArr
        }).then(() => {
            dispatch ({ type: "DELETE_CARD" })
        }).catch((err)=>{
            dispatch ({ type: "DELETE_CARD_ERR", err })
        })        
    }
}
// Card
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