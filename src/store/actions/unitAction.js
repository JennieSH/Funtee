import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

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
    return ( dispatch ) =>{
        if( indexPage < maxPage ){
            dispatch({ type: "TO_NEXT_PAGE" });
        }else{
            dispatch({ type: "TO_NEXT_PAGE_ERR" });
        }    
    }
}

export const changeCity = ( id, zh, en ) => {
    return ( dispatch ) =>{
        dispatch({ type: "CHANGE_CITY", id, zh, en });
    }
}

export const toggleDescription = () => {
    return ( dispatch ) =>{
        dispatch({ type: "TOGGLE_DESCRIPTION"})
    }
}
export const blockDescription = () => {
    return ( dispatch ) =>{
        dispatch({ type: "BLOCK_DESCRIPTION"})
    }
}

export const readTTS = ( src ) => {
    return ( dispatch ) =>{
        const audio = new Audio("data:audio/wav;base64," + src);
        audio.play();

        dispatch({ type: "READ＿TTS" });
    }
}

export const initRecord = () => {
    return ( dispatch ) =>{

        navigator.getUserMedia({ audio: true },
            () => {
              dispatch({ type: "INIT_RECORD"});
            },
            () => {
            　dispatch({ type: "INIT_RECORD_ERR"});
            },
          );

    }
}

export const startRecord = () => {
    return ( dispatch ) =>{  
        Mp3Recorder
          .start()
          .then(() => {
            dispatch({ type: "START_RECORD"});       
          })
          .catch((err) =>{
            dispatch({ type: "START_RECORD_ERR", err });
          });   
    }
}


export const stopRecord = () => {
    return ( dispatch ) =>{
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {

                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                
                const player = new Audio(URL.createObjectURL(file));
                player.play();
 
              dispatch({ type: "STOP_RECORD"});
            })
            .catch((err) => {
              dispatch({ type: "STOP_RECORD_ERR", err });
            });
    }
}