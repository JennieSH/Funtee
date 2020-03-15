import React, { Fragment } from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { LastPageBtn, NextPageBtn } from "../components/lesson/pageBtn";
import { lastCard, nextCard, toggleCopyWord, textToSpeech,  getCurrentCard, resetIndex, initTTS } from "../store/actions/cardAction";
import Header from "../components/common/header";
import Loading from "../components/common/loading";
import Footer from "../components/common/footer";
import Recorder from 'js-audio-recorder';
import "../css/fcCard.css";

let recorder ;
class FcCard extends React.Component{
    constructor(props){
        super(props);
        this.state={     
            cardIndex: 0,
            flipped: false,
            flipStyle: { transition: "transform 0.5s" },
            isBlocked: false,
            isRecording: false,
        }
    }
    handleFlip(){
        this.setState({ 
			flipped: !this.state.flipped,
			flipStyle: { transition: "transform 0.5s" }
        });
        this.props.toggleCopyWord()
    }
    handleRead(){
        new Audio("data:audio/wav;base64," + this.props.ttsCard ).play();
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
    handleLastCard(){
        this.props.lastCard( this.props.indexCard );
     }
    handleNextCard(){
        const { auth,  match, indexCard, nextCard } = this.props;
        const uid = auth.uid;
        const cards = this.props.cards[uid];
        const bookDocName = match.params.title;
        const currentBookLength = cards[bookDocName].cards.length;
        nextCard( indexCard, currentBookLength );
     }
    componentDidMount(){
        const clipboard = new ClipboardJS("#copyWord");
        this.props.resetIndex(parseInt(this.props.match.params.index))
        this.props.initTTS();
        Recorder.getPermission().then(() => {
            this.setState({
                isBlocked:true
            });
        }, (error) => {
            console.log(`${error.name} : ${error.message}`);
        });
    }

    render(){
        const { auth,  match, indexCard, currentSide, getCurrentCard, ttsCard, textToSpeech} = this.props;
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
            getCurrentCard( currentBook[index] );
            if ( !currentBook[index] ){return <Loading/> }
            if ( ttsCard === null ){
                textToSpeech( currentBook[index] , currentSide );
            }
            return(   
                <div className="fcCardEach container">
                    <Header/>
                    <div className="card">
                        <div className="frontSide" style={frontStyle}>
                            <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) } >volume_up</i> 
                            <span>{ currentBook[ index ].front }</span>
                        </div>
                        <div className="backSide" style={backStyle}>
                            <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>volume_up</i> 
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
                            <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow</i>        
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
        initTTS: () => dispatch(initTTS()),
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


