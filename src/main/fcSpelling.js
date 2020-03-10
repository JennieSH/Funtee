import React from "react";
import Recorder from 'js-audio-recorder';

// let recorder = new Recorder({
//     sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
//     sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
//     numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
//     // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
// });
class FC_Spelling extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signIn:true,

        }
    }
    
    start(){
        recorder.start().then(() => {
            // 开始录音
        }, (error) => {
            // 出错了
            console.log(`${error.name} : ${error.message}`);
        });
    }
    stop(){
        recorder.stop();
    }
    play(){
        recorder.play();
    }

    render() {
      
        return (
            <>
            <button onClick={ this.start.bind(this) }>start</button>
            <button onClick={ this.stop.bind(this) }>stop</button>
            <button onClick={ this.play.bind(this) }>play</button>
            </>
           
        ); 
    }
  }


export default FC_Spelling
