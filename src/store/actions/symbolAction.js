import firebase from "firebase/app";
import "firebase/storage";


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