import React from "react";
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
        this.props.initRecord()
    }

    handleRead(){  
        this.props.readTTS(this.props.audio)
    }

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
        const unitState = this.props.unit;  
        // console.log(unitState)      
        return(
            <>
            <div className="TC_UnitlMenu">
                    <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>volume_up</i>                                          
                    <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
                        <div className={`record ${ this.state.isRecording? "active":null}`}></div>                      
                    </i>
                    <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow
                        <audio src={this.state.blobURL} id="audioRecord"/>
                    </i>             
                </div>   
            </>           
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