import React, { Fragment } from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Header from "../components/common/Header";
import Loading from "../components/common/Loading";
import Footer from "../components/common/Footer";
import "../css/fcCard.css";
import { lastMyCard, nextMyCard, toggleCopyWord, textToSpeechMy, getCurrentMyCard, resetMyIndex, initTTS } from "../store/actions/cardAction";
import { LastPageBtn, NextPageBtn } from "../components/lesson/PageBtn";
import Recorder from 'js-audio-recorder';

let recorder ;
class FcMarkCard extends React.Component{
    constructor(props){
        super(props);
        this.state={     
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
    handleLastCard(){
       this.props.lastMyCard( this.props.indexCard )  
    }
    handleNextCard(){
        this.props.nextMyCard( this.props.indexCard, this.props.currentMyCardArrLen )
    }
    handleRead(){
        new Audio("data:audio/wav;base64," + this.props.ttsMyCard ).play();
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

    componentDidMount(){
        const clipboard = new ClipboardJS("#copyWord");
        this.props.resetMyIndex(parseInt(this.props.match.params.index))
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
        const { auth, cards, indexCard, getCurrentMyCard, ttsMyCard, textToSpeechMy, currentSide  } = this.props;
        const uid = auth.uid;
        const userBooks = cards[ uid ];
        const rotation = this.state.flipped ? 180 : 0;
		const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` }
        const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` }

        if( !uid ){ return <Redirect to = "/signin"/> }
        if( !userBooks ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
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
            const index = indexCard;
            getCurrentMyCard( starCardArr[index] , starCardArr.length )
            if ( !starCardArr[index] ){return <Loading/> }

            if ( ttsMyCard === null ){
                textToSpeechMy( starCardArr[index], currentSide );
            }   
            return(      
                <div className="fcCardEach container">
                    <Header/>
                    <div className="card">
                        <div className="frontSide" style={frontStyle}>
                            <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) } >volume_up</i> 
                            <span>{ starCardArr[index].front }</span>
                        </div>
                        <div className="backSide" style={ backStyle }>
                            <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>volume_up</i> 
                            <span>{ starCardArr[ index ].back }</span>                               
                        </div>
                    </div>
                    <div className="cardControler">   
                        <span className="page">{ `${ indexCard+1 } / ${ starCardArr.length }` }</span>                   
                        <div className="controlMenu">
                            <i className="material-icons waves-effect"  onClick={ this.handleFlip.bind(this) }>flip_camera_android</i>                  
                            <i className="material-icons waves-effect" id="copyWord" data-clipboard-text={ currentSide? starCardArr[index].front:starCardArr[index].back} >file_copy</i>                                          
                            <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) } >
                                <div className={`record ${ this.state.isRecording? "active":null}`}></div>         
                            </i>
                            <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow</i>
                        </div>                                       
                        <div className="pageControl">
                            <LastPageBtn handleLastPage = { this.handleLastCard.bind(this) } id="lastPageBtnMyCard"/>
                            <NextPageBtn handleNextPage={ this.handleNextCard.bind(this) } id="nextPageBtnMyCard"/>                   
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
        initTTS: () => dispatch(initTTS()),
        textToSpeechMy: ( targetWords, targetSide )=> dispatch( textToSpeechMy( targetWords, targetSide )),
        resetMyIndex: (index)=> dispatch(resetMyIndex(index)), 
        
    }
}
export default compose( 
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        if ( uid ){
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
)( FcMarkCard )


