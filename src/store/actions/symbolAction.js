export const lastPage = ( indexPage )=> {
    return ( dispatch) =>{     
        if( indexPage > 1 ){
            dispatch({ type: "TO_LAST_PAGE" });
        }             
    }
}


export const nextPage = ( indexPage, maxPage ) => {
    return ( dispatch) =>{
        if( indexPage < maxPage ){
                dispatch({ type: "TO_NEXT_PAGE" });
        }   
    }
}