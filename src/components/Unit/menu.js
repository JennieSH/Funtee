import React, { Fragment } from "react";
import { connect } from "react-redux";
import { readTTS, initRecord, startRecord, stopRecord } from "../../store/actions/unitAction";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class UnitlMenu extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isRecording: false,
            blobURL: "",
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


        this.props.initRecord()
    }

    handleRead(){  
      this.props.readTTS(this.props.audio)
    }
    // handleRead(){  
    //   new Audio("data:audio/wav;base64," + this.props.unit.unitTTS ).play();
    // }

    handleRecord (){

        if( this.state.isRecording === false){
            if (this.props.unit.isBlocked) {
                console.log('Permission Denied');
              } else {
                Mp3Recorder
                .start()
                .then(() => {
                  this.setState({ isRecording: true });
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
        return(
            <Fragment >
              <div className="TC_UnitlMenu">
                <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>volume_up</i>                                          
                <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
                  <div className={`record ${ this.state.isRecording? "active":null}`}></div>                      
                </i>
                <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow
                  <audio src={this.state.blobURL} id="audioRecord"/>
                </i>             
              </div>   
            </Fragment >           
        )
    }
}


const mapStateToProps = ( state ) => {
    return{
        unit: state.unit
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
       readTTS: (src) => dispatch(readTTS(src)),
       initRecord: () => dispatch(initRecord()),
       startRecord: () => dispatch( startRecord()),
       stopRecord: () => dispatch(stopRecord())
    }
}
export default  connect( mapStateToProps, mapDispatchToProps )(UnitlMenu)