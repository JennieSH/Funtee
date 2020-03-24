import React from "react";
import { connect } from "react-redux";
import  { FrontSymbol, BackSymbol } from "./Detail";
import Recorder from 'js-audio-recorder';

let recorder ;
class TcSymbolContent extends React.Component{

  constructor(props){
    super(props)
    this.state = {
        flipSymbol:true,
        isBlocked: false,
        isRecording: false,
      }
    }

    handleRead( symbolSrc ){
      new Audio( symbolSrc ).play();
    } 
    handleRecord (){
      if ( this.state.isBlocked ){
        if( this.state.isRecording ){
            recorder.stop();
            this.setState({
                isRecording:false
            });
        }else{
            recorder = new Recorder({
              ampleBits: 16,
              sampleRate: 16000,
              numChannels: 1,
            })
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
    handleFlipSymbol(){
      this.setState({
        flipSymbol: !this.state.flipSymbol
      })
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
    const symbol = this.props.symbol;
    const index = this.props.indexPage-1;
    return(
      <div className="tcSymbolContent" id="tcSymbolContent">      
        { this.state.flipSymbol? <FrontSymbol symbol={ symbol } index={ index }/> : <BackSymbol symbol={ symbol } index={ index }/> }
        <div className="tcSymobolMenu">
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
      indexPage: state.lesson.indexPageSymbol
    }
}

export default connect( mapStateToProps, null )( TcSymbolContent );