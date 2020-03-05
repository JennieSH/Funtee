import React from "react";
import { connect } from "react-redux";
import  { FrontSymbol, BackSymbol } from "../symbol/detail";

import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class TC_SymbolContent extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      flipSymbol:true,
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      }
    }

    handleRead( symbolSrc ){
      new Audio( symbolSrc ).play();
    } 
    handlePlay( recordSrc ){
      new Audio( recordSrc ).play();
    }
    handleFlipSymbol(){
      this.setState({
        ...this.state,
        flipSymbol: !this.state.flipSymbol
      })
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
        if (!getUserMedia){
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

    handleRecord (){
      if( this.state.isRecording === false){
        if (this.state.isBlocked) {
          console.log('Permission Denied');
        }else {
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

  render(){
    const symbol = this.props.symbol;
    const index = this.props.indexPage-1;
    return(
      <div className="TC_SymobolContent" id="TC_SymbolContent">      
        { this.state.flipSymbol? <FrontSymbol symbol={ symbol } index={ index }/> : <BackSymbol symbol={ symbol } index={ index }/> }
        <div className="TC_SymobolMenu">
          <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this, symbol.audio[index]) }>volume_up</i>                                          
          <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
            <div className={`record ${ this.state.isRecording? "active" : null}` }></div>                      
          </i>
          <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow</i>    
          <i className="material-icons waves-effect" onClick={ this.handleFlipSymbol.bind(this) }>notes</i>        
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