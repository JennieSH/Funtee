import React, { Fragment } from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { LastPageBtn, NextPageBtn } from "../components/lesson/pageBtn";
import { lastCard, nextCard, toggleCopyWord, textToSpeech,  getCurrentCard, resetIndex  } from "../store/actions/cardAction";
import Header from "../components/common/header";
import Loading from "../components/common/loading";
import Footer from "../components/common/footer";
import "../css/fcCard.css";
import MicRecorder from "mic-recorder-to-mp3";



const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class FcCard extends React.Component{
    constructor(props){
        super(props);
        this.state={     
            cardIndex: 0,
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
       this.props.lastCard( this.props.indexCard )  
    }
    handleNextCard(){
        const { auth,  match, indexCard, nextCard } = this.props;
        const uid = auth.uid;
        const cards = this.props.cards[uid];
        const bookDocName = match.params.title;
        const currentBookLength = cards[bookDocName].cards.length;
        nextCard( indexCard, currentBookLength );
    }
    handleTTS(){
        new Audio("data:audio/wav;base64," + this.props.ttsCard ).play();
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
        this.props.resetIndex(parseInt(this.props.match.params.index))

        
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
        const { auth,  match, indexCard, currentSide, getCurrentCard } = this.props;
        const uid = auth.uid;
        const cards = this.props.cards[uid];
        const bookDocName = match.params.title;
        const rotation = this.state.flipped ? 180 : 0;
		const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` }
        const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` }

        if( !uid ){ return <Redirect to = "/signin"/> }
        if( !cards ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            const currentBook = cards[ bookDocName ].cards;
            const index = indexCard;
            getCurrentCard( currentBook[index] )
            
            // if (this.props.ttsCard === null ){
            //     this.props.textToSpeech( currentBook[index] , this.props.currentSide ) 
            // }
            return(   
                <div className="fcCardEach container">
                    <Header/>
                    <div className="card">
                        <div className="frontSide" style={frontStyle}>
                            <i className="material-icons waves-effect" onClick={ this.handleTTS.bind(this) } >volume_up</i> 
                            <span>{ currentBook[ index ].front }</span>
                        </div>
                        <div className="backSide" style={backStyle}>
                            <i className="material-icons waves-effect" onClick={ this.handleTTS.bind(this) }>volume_up</i> 
                            <span>{ currentBook[ index ].back }</span>                               
                        </div>
                    </div>
                    <div className="cardControler">
                        <span className="page">{ `${ indexCard + 1 } / ${ currentBook.length }` }</span>
                        <div className="controlMenu">
                            <i className="material-icons waves-effect"  onClick={ this.handleFlip.bind(this) }>flip_camera_android</i>                  
                            <i className="material-icons waves-effect" id="copyWord" data-clipboard-text={ currentSide? currentBook[ index ].front : currentBook[ index ].back} >file_copy</i>                                          
                            <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) } >
                                <div className={ `record ${ this.state.isRecording? "active":null}` }/>         
                            </i>
                            <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow
                                <audio src={ this.state.blobURL } id="audioRecord"/>
                            </i>        
                        </div>
                        <div className="pageControl">
                            <LastPageBtn handleLastPage = { this.handleLastCard.bind(this) } id="lastPageBtnCard"/>
                            <NextPageBtn handleNextPage={ this.handleNextCard.bind(this) } id="nextPageBtnCard"/>
                        </div>     
                    </div>
                    <Footer/>            
                </div>      
            )
        }
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
        cards : state.firestore.data,
        indexCard : state.card.indexCard,
        currentSide : state.card.currentSide,
        currentCard : state.card.currentCard,
        ttsCard: state.card.ttsCard
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastCard:  ( indexCard ) => dispatch(lastCard( indexCard )),
        nextCard:  ( indexCard, maxCard  ) => dispatch(nextCard( indexCard, maxCard )),
        toggleCopyWord: ()=> dispatch(toggleCopyWord()),
        getCurrentCard: ( currentCard ) => dispatch(getCurrentCard( currentCard )),
        textToSpeech: ( targetWords, targetSide )=> dispatch(textToSpeech( targetWords, targetSide )),
        resetIndex: (index)=> dispatch(resetIndex(index)), 
    }
}
export default compose( 
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        if(uid){
            return(
                [{
                    collection: "Cards",
                    doc: uid ,
                    subcollections: [{collection: uid}],
                    storeAs: uid
                }]
            )
        }
    })
)( FcCard )


