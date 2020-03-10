import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleCreateCard, toggleDeleteCardIcon, toggleEditCardIcon, initCardState } from "../store/actions/cardAction";
import Header from "../components/common/header";
import Card from "../components/flashCard/card";
import AddCard from "../components/flashCard/addCard";
import Loading from "../components/common/loading";
import DelCard from "../components/flashCard/delCard";
import EditCard from "../components/flashCard/editCard";
import "../css/fcCollection.css";

class FcCollection extends React.Component{

    handToggleAddCard(){
        this.props.toggleCreateCard()
    }
    handleToggleDeleteCardIcon(){
        this.props.toggleDeleteCardIcon()
    }
    handleToggleEditCardIcon(){
        this.props.toggleEditCardIcon()
    }
    componentDidMount(){
        this.props.initCardState()
    }

    render(){
        const { auth, match, cards, currentDeleteCard, currentEditCard } = this.props;
        const uid = auth.uid;
        const userBook = cards[uid];
        const bookDocName = match.params.title;
        
        if( !uid ){ return <Redirect to = "/signin"/> }
        if ( userBook === undefined ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            const userCard= userBook.filter(( book )=> book.time === parseInt(bookDocName) )
            const cardArr = userCard[0].cards;
            const cards = cardArr.map(( card, index )=>{
                return(
                    <Card key={ index } uid={ uid } bookDocName={ bookDocName } card={ card } cardArr={ cardArr } index={ index }  />
                )
            })
            return(         
                <Fragment>
                    <Header/>
                    <div className="fcCollection container"> 
                        <div className="stickyCard">
                            
                            {/* <Link to="/spelling">
                                <div className="fcCard card">
                                    <div className="card-content spelling">                                
                                        <span className="card-title"> 
                                            <i className="material-icons">spellcheck</i>
                                            Spelling
                                        </span>
                                    </div>                 
                                </div>
                            </Link> */}

                            <div className="fcCard card edit">                              
                                <i className="material-icons waves-effect" onClick={ this.handToggleAddCard.bind(this) }>add</i>                          
                                <i className="material-icons waves-effect" onClick={ this.handleToggleDeleteCardIcon.bind(this)}>remove</i>
                                <i className="material-icons waves-effect" onClick={ this.handleToggleEditCardIcon.bind(this)} >edit</i> 
                            </div>                                           
                        </div>  
                        { this.props.createCardMenu? <AddCard uid={ uid } bookDocName = { bookDocName } cardArr={ cardArr }/> : null}             
                        { this.props.deleteCardMenu? <DelCard currentDeleteCard={ currentDeleteCard }/> : null }
                        { this.props.editCardMenu ? <EditCard currentEditCard={ currentEditCard }/> : null }
                        { cards }
                    </div>               
                </Fragment>  
            )
        }
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
        cards : state.firestore.ordered,
        createCardMenu : state.card.createCardMenu,
        deleteCardMenu : state.card.deleteCardMenu,
        editCardMenu : state.card.editCardMenu,
        currentDeleteCard : state.card.currentDeleteCard,
        currentEditCard : state.card.currentEditCard,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        initCardState: ()=>dispatch(initCardState()),
        toggleCreateCard: ()=> dispatch(toggleCreateCard()),
        toggleDeleteCardIcon: ()=> dispatch(toggleDeleteCardIcon()),
        toggleEditCardIcon: ()=>dispatch(toggleEditCardIcon()),
    }
}
export default compose( 
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        if( uid ){
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
)( FcCollection )


