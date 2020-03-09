const initState = {
    indexPageSymbol: 1,
    indexPageLesson: 1,
    indexPageLessonTw: 1,
    previousLesson: null,
    previousLessonTw: null,

    isRecording: false,
    mp3: null,
    isBlocked: false,
    currentCity:null,
    description:true,


    unitTTS:null
    
 };

const lessonReducer = ( state = initState, action ) =>{
   
    switch (action.type) {    
        case "GET_TTS":
            console.log("TTS success")
            return {
                ...state,
                unitTTS : action.tts
            }
        // symbol page
        case "TO_LAST_PAGE_SYMBOL":
            return {
                ...state,
                indexPageSymbol: state.indexPageSymbol-1,
                unitTTS : null
            }
        case "TO_NEXT_PAGE_SYMBOL":
            return {
                ...state,
                indexPageSymbol: state.indexPageSymbol+1,
                unitTTS : null
            }
        // lesson page  
        case "INIT_PAGE_LESSON":
            return{
                ...state,
                indexPageLesson: 1,
            }
        case "TO_LAST_PAGE_LESSON":
            return {
                ...state,
                indexPageLesson: state.indexPageLesson-1,
                unitTTS : null
            }
        case "TO_NEXT_PAGE_LESSON":
            return {
                ...state,
                indexPageLesson: state.indexPageLesson+1,
                previousLesson: action.currentLesson,
                unitTTS : null
            }
        // lesson tw page  
        case "INIT_PAGE_LESSON_TW":
            return{
                ...state,
                indexPageLessonTw: 1,
            }
        case "TO_LAST_PAGE_LESSON_TW":
            return {
                ...state,
                indexPageLessonTw: state.indexPageLessonTw-1,       
                unitTTS : null
            }
        case "TO_NEXT_PAGE_LESSON_TW":
            return {
                ...state,
                indexPageLessonTw: state.indexPageLessonTw+1,
                previousLessonTw: action.currentLesson,
                unitTTS : null
            }
        // map
        case "GET_CURRENT_CITY":
            return {
                ...state,
                currentCity:{
                    cityId: action.cityId,      
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
export default lessonReducer