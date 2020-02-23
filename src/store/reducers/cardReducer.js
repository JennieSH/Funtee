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

    editCardIcon: false,
    editCardMenu: false,
    currentEditCard: null,
    editFrontErr: false,
    editBackErr: false,

    // Card
    indexCard: 1,
}

const cardReducer = ( state = initState , action)=>{
    switch (action.type){

        // Category - create board   
        case "TOGGLE_CREATE_BOOK":
            return {
                ...state,
                createBookMenu:!state. createBookMenu,
                deleteBookIcon: false,
                editBookIcon: false
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
                deleteBookIcon: !state.deleteBookIcon,
                editBookIcon: false
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
            console.log("EDIT_BOOK_SUCCESS")
            return{
                ...state,
                editBookMenu: false,
                editBookIcon: false,
            }
        case "EDIT_BOOK_ERR":
            console.log("EDIT_BOOK_ERR"+action.err)
            return state


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
            console.log("DELETE_CARD_SUCCESS")
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
            console.log("EDIT_CARD_SUCCESS")
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