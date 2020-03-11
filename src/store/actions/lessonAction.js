

export const textToSpeech = ( targetWord ) =>{
    return( dispatch )=>{
       
             const apiKey = "AIzaSyD-I8KgXlOZVldg8tK77bL-jpfcL6GKKZ4";
             const ttsSrc = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
 
                 fetch( ttsSrc , {
                     method: 'POST',
                     body: JSON.stringify({
                         "audioConfig": {
                         "audioEncoding": "MP3",
                         "pitch": 0,
                         "speakingRate": 1
                         },
                         "input": {
                         "text": `${targetWord}`
                         },
                         "voice": {
                         "languageCode": "cmn-CN",
                         "name": "cmn-CN-Standard-D"
                         }            
                     }),                    
                 }).then((res)=>{
                    return res.json()      
                 }).then((res)=>{
                    const tts = res.audioContent;   
                    dispatch({ type: "GET_TTS", tts })
                 })     
    } 
}

export const lastPage = ( indexPage, path )=> {
    return ( dispatch) =>{    
        if( indexPage > 1 ){
            if ( path === "/symbol"){
                dispatch({ type: "TO_LAST_PAGE_SYMBOL" });
            }else if( path === "/vocabulary"){
                dispatch({ type: "TO_LAST_PAGE_LESSON" });
            }else{
                dispatch({ type: "TO_LAST_PAGE_LESSON_TW" });
            }     
        }              
    }
}

export const nextPage = ( indexPage, maxPage, path, currentLesson ) => {
    return ( dispatch ) =>{
        if( indexPage < maxPage ){
            if ( path === "/symbol" ){
                dispatch({ type: "TO_NEXT_PAGE_SYMBOL" });
            }else if ( path === "/vocabulary" ){
                dispatch({ type: "TO_NEXT_PAGE_LESSON", currentLesson });
            }else{
                dispatch({ type: "TO_NEXT_PAGE_LESSON_TW", currentLesson });
            }     
        }    
    }
}

export const initPage = ( path ) => {
    return ( dispatch ) =>{
        if( path === "/vocabulary" ){
            dispatch({ type: "INIT_PAGE_LESSON" });
        }else{
            dispatch({ type: "INIT_PAGE_LESSON_TW" })
        } 
    }
}


export const getCurrentCity = ( cityId, cityName, cityEnglishName ) => {
    return ( dispatch ) =>{
        dispatch({ type: "GET_CURRENT_CITY", cityId, cityName, cityEnglishName });
    }
}

export const closeDescriptionMobile = () => {
    return ( dispatch ) =>{
        dispatch({ type: "CLOSE_DESCRIPTION"})
    }
}
export const blockDescriptionMobile = () => {
    return ( dispatch ) =>{
        dispatch({ type: "BLOCK_DESCRIPTION"})
    }
}


