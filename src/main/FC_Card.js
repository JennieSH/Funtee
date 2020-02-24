import React from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Header from "../components/common/header";
import Loading from "../components/common/loading";
import "../css/FC_Card.css";
import { lastCard, nextCard, toggleCopyWord, textToSpeech, getCurrentCard  } from "../store/actions/cardAction";

class FC_Card extends React.Component{
    constructor(props){
        super(props);
        this.state={     
            cardIndex: 0,
            flipped: false,
            flipStyle: { transition: "transform 0.5s" },
      
        }
    }

    handleFlip(){
        this.setState({ 
			flipped: !this.state.flipped,
			flipStyle: { transition: 'transform 0.5s' }
        });
        this.props.toggleCopyWord()
    }
    // card index
    handleLastCard(){
       this.props.lastCard( this.props.indexCard )
       
    }

    handleNextCard(){
        const uid = this.props.auth.uid;
        const cards = this.props.cards[uid];
        const bookDocName = this.props.match.params.title;
        const currentBookLength = cards[bookDocName].cards.length;
        this.props.nextCard( this.props.indexCard, currentBookLength )
    }

    handleTTS( targetSide ){
        this.props.textToSpeech( this.props.currentCard, targetSide )
    }
    componentDidMount(){
        const clipboard = new ClipboardJS("#copyWord")
    }



    render(){
        
        const uid = this.props.auth.uid;
        const cards = this.props.cards[uid];
        const bookDocName = this.props.match.params.title;
        const rotation = this.state.flipped ? 180 : 0;
		const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` }
        const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` }
      
        if( !uid ){ return <Redirect to = "/signin"/> }
        if( !cards ){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )
        }else{
            const currentBook = cards[ bookDocName ].cards;
            const index = this.props.indexCard - 1;
            this.props.getCurrentCard( currentBook[index] );
            return(
                
                <>
                
                    <Header/>    
                    <div className="FC_CardEach container">
                    
                        <div className="FC_cardEach card">

                            <div className="frontSide" style={frontStyle}>
                                <i className="material-icons waves-effect blue-text" onClick={ this.handleTTS.bind(this, "front" )} >volume_up
                                    <audio id="audio"/>
                                </i> 
                                <span>{ currentBook[ index ].front }</span>
                            </div>

                            <div className="backSide" style={backStyle}>
                                <i className="material-icons waves-effect blue-text" onClick={ this.handleTTS.bind(this, "back" ) }>volume_up
                                    <audio id="audio"/>
                                </i> 
                                <span className="grey-text">{ currentBook[ index ].back }</span>                               
                            </div>
                        
                        </div>

                        <span className="page">{ `${ this.props.indexCard } / ${ currentBook.length }` }</span>

                        <div className="controlMenu">
                            
                            <i className="material-icons waves-effect"  onClick={ this.handleFlip.bind(this) }>flip_camera_android</i>                  
                            <i className="material-icons waves-effect" id="copyWord" data-clipboard-text={ this.props.copyWord? currentBook[ index ].front:currentBook[ index ].back} >file_copy</i>                                          
                            <i className="socket waves-effect" >
                                <div className="record"></div>
                            </i>
                            <i className="material-icons waves-effect" >play_arrow</i>
                                        
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
        cards : state.firestore.data,
        indexCard : state.card.indexCard,
        copyWord : state.card.copyWord,
        currentCard : state.card.currentCard
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastCard:  ( indexCard ) => dispatch(lastCard( indexCard )),
        nextCard:  ( indexCard, maxCard  ) => dispatch(nextCard( indexCard, maxCard )),
        toggleCopyWord: ()=> dispatch(toggleCopyWord()),
        getCurrentCard: ( currentCard )=> dispatch(getCurrentCard( currentCard)),
        textToSpeech: ( targetWords,targetSide )=> dispatch(textToSpeech( targetWords,targetSide ))
        
    }
}
export default compose( 
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
    }),
    
    connect( mapStateToProps, mapDispatchToProps )
)( FC_Card )