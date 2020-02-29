import React from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Header from "../components/common/header";
import Loading from "../components/common/loading";
import "../css/FC_Card.css";
import { lastMyCard, nextMyCard, toggleCopyWord, textToSpeech_My,  getCurrentMyCard, resetMyIndex } from "../store/actions/cardAction";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class FC_MyCard extends React.Component{
    constructor(props){
        super(props);
        this.state={     
            flipped: false,
            flipStyle: { transition: "transform 0.5s" },

            isRecording: false,
            blobURL: "",
            isBlocked: false,
      
        }
    }

    handleFlip(){
        this.setState({ 
			flipped: !this.state.flipped,
			flipStyle: { transition: 'transform 0.5s' }
        });
        this.props.toggleCopyWord()
    }

    handleLastCard(){
       this.props.lastMyCard( this.props.indexCard )  
    }

    handleNextCard(){
        this.props.nextMyCard( this.props.indexCard, this.props.currentMyCardArrLen )
    }

    handleTTS(){
        new Audio("data:audio/wav;base64," + this.props.ttsMyCard ).play();
    }

    handleRecord(){
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

    handlePlay(){
        document.getElementById("audioRecord").play()
    }

    componentDidMount(){
        const clipboard = new ClipboardJS("#copyWord");
        this.props.resetMyIndex(parseInt(this.props.match.params.index))


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

    

    render(){

        const uid = this.props.auth.uid;
        const userBooks = this.props.cards[this.props.auth.uid];
        const rotation = this.state.flipped ? 180 : 0;
		const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` }
        const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` }

        if( !uid ){ return <Redirect to = "/signin"/> }
        if( !userBooks ){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )
        }else{
            const allCardArr = [];        
          
            userBooks.map( book => {
                book.cards.map((card, index)=>{     
                    card.index = index;
                    card.bookDocName = book.id;
                    card.uid = uid;
                    allCardArr.push(card)
                })             
            });
            const starCardArr = allCardArr.filter( card => card.star === true)
            const index = this.props.indexCard;
            this.props.getCurrentMyCard( starCardArr[index] , starCardArr.length )
      

            if ( !starCardArr[index] ){return <Loading/> }
    
            if (this.props.ttsMyCard ===null ){
                this.props.textToSpeech_My( starCardArr[index], this.props.currentSide ) 
            }   
            

            return(       
                <>              
                    <Header/>    
                    <div className="FC_CardEach container">
                    
                        <div className="FC_cardEach card">
                            <div className="frontSide" style={frontStyle}>
                                <i className="material-icons waves-effect blue-text" onClick={ this.handleTTS.bind(this) } >volume_up</i> 
                                <span>{ starCardArr[index].front }</span>
                            </div>

                            <div className="backSide" style={backStyle}>
                                <i className="material-icons waves-effect blue-text" onClick={ this.handleTTS.bind(this) }>volume_up</i> 
                                <span className="grey-text">{ starCardArr[ index ].back }</span>                               
                            </div>
                        
                        </div>

                        <span className="page">{ `${ this.props.indexCard+1 } / ${ starCardArr.length }` }</span>

                        <div className="controlMenu">                          
                            <i className="material-icons waves-effect"  onClick={ this.handleFlip.bind(this) }>flip_camera_android</i>                  
                            <i className="material-icons waves-effect" id="copyWord" data-clipboard-text={ this.props.currentSide? starCardArr[index].front:starCardArr[index].back} >file_copy</i>                                          
                            <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) } >
                                <div className={`record ${ this.state.isRecording? "active":null}`}></div>         
                            </i>
                            <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow
                                <audio src={this.state.blobURL} id="audioRecord"/>
                            </i>                                       
                        </div>
                        <div className="pageControl">
                            <i className="material-icons waves-effect " onClick={ this.handleLastCard.bind(this) }>navigate_before</i>
                            <i className="material-icons waves-effect " id="nextPageBtn_F" onClick={ this.handleNextCard.bind(this) }>navigate_next</i>                       
                        </div>                 
                    </div>          
                </>      
            )
        }
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
        cards : state.firestore.ordered,
        indexCard : state.card.indexMyCard,
        currentSide : state.card.currentSide,
        currentMyCard : state.card.currentMyCard,
        currentMyCardArrLen : state.card.currentMyCardArrLen,
        ttsMyCard: state.card.ttsMyCard
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastMyCard:  ( indexCard ) => dispatch(lastMyCard( indexCard )),
        nextMyCard:  ( indexCard, maxCard  ) => dispatch(nextMyCard( indexCard, maxCard )),
        toggleCopyWord: ()=> dispatch(toggleCopyWord()),
        getCurrentMyCard: ( currentCard, starCardArr ) => dispatch(getCurrentMyCard( currentCard, starCardArr )),
        textToSpeech_My: ( targetWords, targetSide )=> dispatch(textToSpeech_My( targetWords, targetSide )),
        resetMyIndex: (index)=> dispatch(resetMyIndex(index)), 
        
    }
}
export default compose( 
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.firestore._.authUid;
        return(
            [{
                collection: "Cards",
                doc: uid ,
                subcollections: [{collection: uid}],
                storeAs: uid
            }]
        )
    })
)( FC_MyCard )


