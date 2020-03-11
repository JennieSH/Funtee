import React, { Fragment } from "react";
import { connect } from "react-redux";
import { readTTS, initRecord, startRecord, stopRecord } from "../../store/actions/lessonAction";
import Recorder from 'js-audio-recorder';

let recorder ;
class LessonMenu extends React.Component{

  constructor(props){
    super(props)
    this.state = {
        isBlocked: false,
        isRecording: false,
    }
  }
  handleRead(){  
    new Audio("data:audio/wav;base64," + this.props.lesson.lessonTTS ).play();
    // this.props.readTTS(this.props.audio) // for data of firebase
  }
  handleRecord(){
    if ( this.state.isBlocked ){
      if( this.state.isRecording ){
        recorder.stop();
        this.setState({
          isRecording:false
        });
      }else{
        recorder = new Recorder({
          sampleBits: 16,
          sampleRate: 16000,
          numChannels: 1,
        });
        recorder.start().then(() => {
          this.setState({
          isRecording:true
          });
        }, (error) => {
          console.log(`${error.name} : ${error.message}`);
        });
      }
    } 
  }
  handlePlay(){
    recorder.play();
  }
  componentDidMount(){
    Recorder.getPermission().then(() => {
      this.setState({
        isBlocked:true
      });
    }, (error) => {
      console.log(`${error.name} : ${error.message}`);
    });
  }

  render(){  
    return(
      <Fragment >
        <div className="tcLessonMenu">
          <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>volume_up</i>                                          
          <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
            <div className={`record ${ this.state.isRecording? "active":null}`}></div>                      
          </i>
          <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow</i>             
          </div>   
      </Fragment >           
    )
  }
}

const mapStateToProps = ( state ) => {
  return{
    lesson: state.lesson
  }
}
const mapDispatchToProps = (dispatch) => {
    return{
       readTTS: (src) => dispatch(readTTS(src)),
       initRecord: () => dispatch(initRecord()),
       startRecord: () => dispatch(startRecord()),
       stopRecord: () => dispatch(stopRecord())
    }
}
export default  connect( mapStateToProps, mapDispatchToProps )( LessonMenu )