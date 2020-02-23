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

    // Collection
    createCardMenu: false,
    frontErr: false,
    backErr: false,

    deleteCardIcon: false,
    deleteCardMenu: false,
    currentDeleteCard: null,

    // Card
    indexCard: 1,
}

const cardReducer = ( state = initState , action)=>{
    switch (action.type){
        // Category - create board    
        case "TOGGLE_CREATE_BOOK":
            return {
                ...state,
                createBookMenu:!state. createBookMenu
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
            console.log("CREATE_BOOK_SUCCESS")
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
                deleteBookIcon: !state.deleteBookIcon
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
            console.log("DELETE_BOOK_SUCCESS")
            return{
                ...state,
                deleteBookMenu: false
            }
        case "DELETE_BOOK_ERR":
            console.log("DELETE_BOOK_ERR"+action.err)
            return state

        // Category - edit board
        case "TOGGLE_EDIT_BOOK_ICON":
            return {
                ...state,
                editBookIcon: !state.editBookIcon
            }



        // Collection - create card board
        case "TOGGLE_CREATE_CARD":
            return {
                ...state,
                createCardMenu:!state. createCardMenu
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
                deleteCardIcon: !state.deleteCardIcon
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
            console.log("DELETE_CARD_SUCCESS")
            return{
                ...state,
                deleteCardMenu: false
            }
        case "DELETE_CARD_ERR":
            console.log("DELETE_CARD_ERR"+action.err)
            return state


        // Card - current card    
        case "TO_LAST_CARD":
            return {
                ...state,
                indexCard: state.indexCard-1
            }
        case "TO_LAST_CARD_ERR":
            return state


        case "TO_NEXT_CARD":
            return {
                ...state,
                indexCard: state.indexCard+1
            }
        case "TO_NEXT_CARD_ERR":
            return state;


        default:
            return state
    }
}


export default cardReducer