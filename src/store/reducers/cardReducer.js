const initState = {
    // Category
    createBookMenu: false,
    nameErr: false,
    langErr: false,

    deleteBookIcon: false,
    deleteBookMenu: false,
    currentDeleteBook: null,

    editBookIcon: false,
    editBookMenu: false,
    currentEditBook: null,
    editBookNameErr: true,

    // Collection
    createCardMenu: false,
    frontErr: false,
    backErr: false,

    deleteCardIcon: false,
    deleteCardMenu: false,
    currentDeleteCard: null,

    editCardIcon: false,
    editCardMenu: false,
    currentEditCard: null,
    editFrontErr: false,
    editBackErr: false,

    // Card
    
    indexCard: 0,
    indexMyCard: 0,
    currentCard: null,
    currentMyCard: null,
    currentMyCardArrLen: null,
    currentSide: true, // true: front ; false: back
    ttsCard:null,
    ttsMyCard:null,



}

const cardReducer = ( state = initState , action)=>{
    switch (action.type){
        // Category - init state   
        case "INIT_BOOK_STATE":
            return{
                ...state,
                createBookMenu: false,
                nameErr: false,
                langErr: false,
            
                deleteBookIcon: false,
                deleteBookMenu: false,
            
                editBookIcon: false,
                editBookMenu: false,
                editBookNameErr: false
            }
        // Category - create board   
        case "TOGGLE_CREATE_BOOK":
            return {
                ...state,
                createBookMenu:!state. createBookMenu,
                deleteBookMenu: false,
                editBookMenu: false,
                deleteBookIcon: false,
                editBookIcon: false,
                
            }       
        case "CREATE_BOOK_NAME_ERR":
            return {
                ...state,
                nameErr:true
            }
        case "CREATE_BOOK_LANG_ERR":
            return  {
                ...state,
                langErr:true
            }
        case "CREATE_BOOK":
            return  {
                ...state,
                nameErr: false,
                langErr: false,
                createBookMenu: false
            }
        case "CREATE_BOOK_ERR":
            console.log("CREATE_BOOK_ERR" + action.err)
            return state
        // Category - delete board
        case "TOGGLE_DELETE_BOOK_ICON":
            return {
                ...state,
                deleteBookIcon: !state.deleteBookIcon,
                editBookIcon: false,
                createBookMenu: false,
                editBookMenu: false
            }
        case "TOGGLE_DELETE_BOOK":
            return {
                ...state,
                deleteBookMenu: !state.deleteBookMenu
            }
        case "CURRENT_DELETE_BOOK":
            return {
                ...state,
                currentDeleteBook: action.currentDeleteBook,
                deleteBookMenu: true,
            }
        case "DELETE_BOOK":
            return{
                ...state,
                deleteBookMenu: false,
                deleteBookIcon: false,
            }
        case "DELETE_BOOK_ERR":
            console.log("DELETE_BOOK_ERR"+action.err)
            return state
        // Category - edit board
        case "TOGGLE_EDIT_BOOK_ICON":
            return {
                ...state,
                editBookIcon: !state.editBookIcon,
                deleteBookIcon: false,
                createBookMenu: false,
                editBookMenu: false,
                deleteBookMenu: false
            }
        case "TOGGLE_EDIT_BOOK":
            return {
                ...state,
                editBookMenu: !state.editBookMenu
            }
        case "CURRENT_EDIT_BOOK":
            return {
                ...state,
                currentEditBook: action.currentEditBook,
                editBookMenu: true,
            }
        case "EDIT_BOOK":
            return{
                ...state,
                editBookMenu: false,
                editBookIcon: false,
                editBookNameErr: false
            }
        case "EDIT_BOOK_ERR":
            console.log("EDIT_BOOK_ERR"+action.err)
            return state
        case "EDIT_BOOK_NAME_ERR":
            return{
                ...state,
                editBookNameErr: true
            }
        // Collection - init 
        case "INIT_CARD_STATE":
            return{
                ...state,
                createCardMenu: false,
                frontErr: false,
                backErr: false,
            
                deleteCardIcon: false,
                deleteCardMenu: false,
            
                editCardIcon: false,
                editCardMenu: false,
                editFrontErr: false,
                editBackErr: false,
            }
        // Collection - create card board
        case "TOGGLE_CREATE_CARD":
            return {
                ...state,
                createCardMenu:!state. createCardMenu,
                deleteCardIcon: false,
                editCardIcon: false
            }
        case "CREATE_CARD_FRONT_ERR":
            return {
                ...state,
                frontErr:true
            }
        case "CREATE_CARD_BACK_ERR":
            return  {
                ...state,
                backErr:true
            }
        case "CREATE_CARD":
            console.log("CREATE_CARD_SUCCESS")
            return  {
                ...state,
                frontErr: false,
                backErr: false,
                createCardMenu: false
            }
        case "CREATE_CARD":
            console.log("CREATE_CARD_ERR"+ action.err)
            return  state

        // Collection - delete card
        case "TOGGLE_DELETE_CARD_ICON":
            return {
                ...state,
                deleteCardIcon: !state.deleteCardIcon,
                editCardIcon: false
            }
        case "TOGGLE_DELETE_CARD":
            return {
                ...state,
                deleteCardMenu: !state.deleteCardMenu
            }
        case "CURRENT_DELETE_CARD":
            return {
                ...state,
                currentDeleteCard: action.currentDeleteCard,
                deleteCardMenu: true,
            }
        case "DELETE_CARD":
            return{
                ...state,
                deleteCardMenu: false,
                deleteCardIcon: false
            }
        case "DELETE_CARD_ERR":
            console.log("DELETE_CARD_ERR"+action.err)
            return state
        // Collection - edit board
        case "TOGGLE_EDIT_CARD_ICON":
            return {
                ...state,
                editCardIcon: !state.editCardIcon,
                deleteCardIcon: false,
            }
        case "TOGGLE_EDIT_CARD":
            return {
                ...state,
                editCardMenu: !state.editCardMenu,
                editFrontErr: false,
                editBackErr: false
            }
        case "CURRENT_EDIT_CARD":
            return {
                ...state,
                currentEditCard: action.currentEditCard,
                editCardMenu: true,
            }
        case "EDIT_CARD_FRONT_ERR":
            return{
                ...state,
                editFrontErr:true
            }
        case "EDIT_CARD_BACK_ERR" :
            return{
                ...state,
                editBackErr:true
            } 
        case "EDIT_CARD":
            return{
                ...state,
                editCardMenu: false,
                editCardIcon: false,
                editFrontErr: false,
                editBackErr: false
            }
        case "EDIT_CARD_ERR":
            console.log("EDIT_CARD_ERR"+action.err)
            return state
        case "TOGGLE_STAR":
            return state
        case "TOGGLE_STAR_ERR":
            console.log("TOGGLE_STAR" + err)
            return state
        // Card - current card 
        case "GET_CURRENT_CARD":
            return {
                ...state,
                currentCard: action.currentCard
            }
        case "TO_LAST_CARD":
            return {
                ...state,
                indexCard: state.indexCard-1,
                ttsCard:null,
            }
        case "TO_LAST_CARD_ERR":
            return state
        case "TO_NEXT_CARD":
            return {
                ...state,
                indexCard: state.indexCard+1,
                ttsCard:null,
            }
        case "TO_NEXT_CARD_ERR":
            return state;
            // my card
        case "RESET_MY_INDEX":           
            return{
                ...state,
                indexMyCard: action.index,
                ttsMyCard:null,
                currentSide: true,
            }
        case "RESET_INDEX":           
            return{
                ...state,
                indexCard: action.index,
                ttsCard:null,
                currentSide: true,
            }
        case "GET_CURRENT_MYCARD":
            return {
                ...state,
                currentMyCard: action.currentCard,
                currentMyCardArrLen: action.starCardArrLen
            }
        case "TO_LAST_MYCARD":
            return {
                ...state,
                indexMyCard: state.indexMyCard-1,
                ttsMyCard:null
            }
        case "TO_LAST_MYCARD_ERR":
            return state
        case "TO_NEXT_MYCARD":
            return {
                ...state,
                indexMyCard: state.indexMyCard+1,
                ttsMyCard:null
            }
        case "TO_NEXT_MYCARD_ERR":
            return state;
        case "GET_CURRENT_SIDE":
            return{
                ...state,
                currentSide: !state.currentSide,
                ttsMyCard:null,
                ttsCard:null,
            }
        case "GET_TTS":
            return {
                ...state,
                ttsCard : action.tts
            }
        case "GET_TTS_ERR":
            console.log("TTS fail" + action.err)
            return state
        case "GET_TTS_MY":
            return {
                ...state,
                ttsMyCard:action.tts
            }
        case "GET_TTS_MY_ERR":
            console.log("TTS_MY fail" + action.err)
            return state
        
        default:
            return state
    }
}


export default cardReducer