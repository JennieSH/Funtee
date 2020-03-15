const initState = {
    indexPageSymbol: 1,
    indexPageLesson: 1,
    indexPageLessonTw: 1,
    previousLesson: null,
    previousLessonTw: null,

    currentCity:null,
    description:true,

    lessonTTS:null
    
 };

const lessonReducer = ( state = initState, action ) =>{
   
    switch (action.type) {    
        case "GET_TTS":
            return {
                ...state,
                lessonTTS : action.tts
            }
        case "INIT_TTS_LESSON":
            return {
                ...state,
                lessonTTS:null
            }
        // symbol page
        case "TO_LAST_PAGE_SYMBOL":
            return {
                ...state,
                indexPageSymbol: state.indexPageSymbol-1,
                lessonTTS : null
            }
        case "TO_NEXT_PAGE_SYMBOL":
            return {
                ...state,
                indexPageSymbol: state.indexPageSymbol+1,
                lessonTTS : null
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
                lessonTTS : null
            }
        case "TO_NEXT_PAGE_LESSON":
            return {
                ...state,
                indexPageLesson: state.indexPageLesson+1,
                previousLesson: action.currentLesson,
                lessonTTS : null
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
                lessonTTS : null
            }
        case "TO_NEXT_PAGE_LESSON_TW":
            return {
                ...state,
                indexPageLessonTw: state.indexPageLessonTw+1,
                previousLessonTw: action.currentLesson,
                lessonTTS : null
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


        default:
            return state;
    }
}
export default lessonReducer