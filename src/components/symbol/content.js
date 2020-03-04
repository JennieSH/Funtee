import React from "react";
import { connect } from "react-redux";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class TC_SymbolContent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isRecording: false,
            blobURL: "",
            isBlocked: false,
          }
    }

    componentDidMount(){    

        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          
            if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
              // First get ahold of the legacy getUserMedia, if present
              let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
          
              // Some browsers just don't implement it - return a rejected promise with an error
              // to keep a consistent interface
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
              }
          
              // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
              return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            }
          }
          

          navigator.mediaDevices.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');

              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');

              this.setState({ isBlocked: true })
            },
          );
    }
    handleRead(){
        document.getElementById("audio").play()
    }  

    handleRecord (){
        if( this.state.isRecording === false){
            if (this.state.isBlocked) {
                console.log('Permission Denied');
                
              } else {
                Mp3Recorder
                  .start()
                  .then(() => {
                    this.setState({ isRecording: true });
                    console.log('Permission Granted');
                  }).catch((e) => console.error(e));
              }
        }else{
            Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
              const blobURL = URL.createObjectURL(blob)
             
              this.setState({ blobURL, isRecording: false });
            }).catch((e) => console.log(e));
        }
    }

    handlePlay (){
        document.getElementById("audioRecord").play()
    }

    render(){
        const symbol = this.props.symbol;
        let index = this.props.indexPage-1;

        return(
            <div className="TC_SymobolContent" id="TC_SymbolContent">           
                <div className="ContentImg">
                    <div>{ symbol.imgs ? <img src={ symbol.imgs[index] }/> : null }</div>
                    <div className="TC_SymobolExample"><img src={ symbol.svg[index] }/></div>
                </div>
                <div className="ContentImgDetail">
                    <span className="pink-text text-darken-3">{ symbol.zhuyin[index] }</span>
                    <span className="grey-text text-darken-2">{ symbol.pinyin[index] }</span>
                    <span className="teal-text text-lighten-">{ symbol.chinese[index] }</span>
                    <span className="blue-text text-darken-2">{ symbol.english[index] }</span>
                </div>

                <div className="TC_SymobolMenu">
                    <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>
                        volume_up
                        <audio src={symbol.audio[index]} id="audio"/>
                    </i>                                          
                    <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
                        <div className={`record ${ this.state.isRecording? "active" : null}` }></div>                      
                    </i>
                    <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>
                      play_arrow
                        <audio src={this.state.blobURL} id="audioRecord"/>
                    </i>             
                </div> 
            </div>
        )       
    }
}

const mapStateToProps = ( state ) => {
    return{
        indexPage: state.symbol.indexPage,
        symbolAudio: state.symbol
    }
}

export default connect(mapStateToProps, null)( TC_SymbolContent);