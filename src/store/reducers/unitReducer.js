const initState = {
    indexPage:1,
    isRecording: false,
    mp3: null,
    isBlocked: false,
    city:null,
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
        case "CHANGE_CITY":
            return {
                ...state,
                city:{
                    id: action.id,
                    en: action.en,
                    zh: action.zh
                }
            };
        case "TOGGLE_DESCRIPTION":{
            return {
                ...state,
                description: !state.description
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