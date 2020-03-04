const initState = {
    indexPage:1,
    isRecording: false,
    mp3: null,
    isBlocked: false,
    currentCity:null,
    description:true,


    unitTTS:null
    
 };

const unitReducer = ( state= initState, action ) =>{
   
    switch (action.type) {    
        case "GET_TTS":
            console.log("TTS success")
            return {
                ...state,
                unitTTS : action.tts
            }





        // page  
        case "TO_LAST_PAGE":
            return {
                ...state,
                indexPage:state.indexPage-1,
                unitTTS : null
            }
        case "TO_LAST_PAGE_ERR":
            return state

        case "TO_NEXT_PAGE":
            return {
                ...state,
                indexPage:state.indexPage+1,
                unitTTS : null
            }
        case "TO_NEXT_PAGE_ERR":
            return state;

        // map
        case "GET_CURRENT_CITY":
            return {
                ...state,
                currentCity:{
                    cityID: action.cityID,      
                    cityName: action.cityName,
                    cityEnglishName: action.cityEnglishName
                }
            };
        case "CLOSE_DESCRIPTION":{
            return {
                ...state,
                description: false
            }
        }
        case "BLOCK_DESCRIPTION":{
            return {
                ...state,
                description:true
            }
        }
        // tts
        case "READ＿TTS":
            return state;
        // record -init
        case "INIT_RECORD":
            console.log('Permission Granted');
            return {
                ...state,
                isBlocked: false
            }
        case "INIT_RECORD_ERR":
            console.log('Permission Denied');
            return{
                ...state,
                isBlocked: true 
            }
        // - start    
        case "START_RECORD":
            return{
                ...state,
                isRecording: true 
            }
        case "START_RECORD_ERR":
            console.log( "START_RECORD_ERR"+action.err )
            return state
        // - stop
        case "STOP_RECORD":
            return{
                ...state,
                isRecording: false
            }
        case "STOP_RECORD_ERR":
            console.log( "STOP_RECORD_ERR" + action.err )
            return state

        default:
            return state;
    }
}
export default unitReducer