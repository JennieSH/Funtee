const initState = {
   indexPage:1
};


const symbolReducer = ( state= initState, action ) =>{
    // control page
    switch (action.type) {      
        case "TO_LAST_PAGE":
            return {
                ...state,
                indexPage:state.indexPage-1
            }
        case "TO_LAST_PAGE_ERR":
            return state


        case "TO_NEXT_PAGE":
            return {
                ...state,
                indexPage:state.indexPage+1
            }
        case "TO_NEXT_PAGE_ERR":
            return state;

            
        default:
            return state;
    }
}
export default symbolReducer