import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleCreateCard, toggleDeleteCardIcon, toggleEditCardIcon } from "../store/actions/cardAction";
import Header from "../components/common/header";
import FCCard from "../components/flashCard/card";
import AddCard from "../components/flashCard/addCard";
import Loading from "../components/common/loading";
import DelCard from "../components/flashCard/delCard";
import EditCard from "../components/flashCard/editCard";
import "../css/FC_Collection.css";


class FC_Collection extends React.Component{


    handToggleAddCard(){
        this.props.toggleCreateCard()
    }
    handleToggleDeleteCardIcon(){
        this.props.toggleDeleteCardIcon()
    }
    handleToggleEditCardIcon(){
        this.props.toggleEditCardIcon()
    }


    render(){
        const uid = this.props.auth.uid;
        const bookDocName = this.props.match.params.title;
        const userBook = this.props.cards[this.props.auth.uid];
        
        if( !uid ){ return <Redirect to = "/signin"/> }

        if ( userBook === undefined ){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )
        }else{
            const userCard= userBook.filter(( book )=> book.time === parseInt(bookDocName) )
            const cardArr = userCard[0].cards;
            // console.log(userCard)
            const cards = cardArr.map(( card, index )=>{
                return(
                    <FCCard key={ index } uid={ uid } bookDocName={ bookDocName } card={ card } cardArr={ cardArr } index={ index }/>
                )
            })
            
            return(         
                <>
                    <Header/>
                    <div className="FC_Collection container"> 
                        <div className="stickyCard">
                            
                            <Link to="/spelling">
                                <div className="FC_card card">
                                    <div className="card-content">                                
                                        <span className="card-title center-align"> 
                                            <i className="material-icons green-text text-darken-1">spellcheck</i>
                                            Spelling
                                        </span>
                                    </div>                 
                                </div>
                            </Link>

                            <div className="FC_card card plus">                              
                                <i className="material-icons white-text material-icons waves-effect" onClick={ this.handToggleAddCard.bind(this) }>add</i>                          
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleDeleteCardIcon.bind(this)}>remove</i>
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleEditCardIcon.bind(this)} >edit</i> 
                            </div>                                           
                        </div>  
                        { this.props.createCardMenu? <AddCard uid={ this.props.auth.uid } bookDocName = {bookDocName} cardArr={ cardArr }/> : null}             
                        { this.props.deleteCardMenu? <DelCard currentDeleteCard={ this.props.currentDeleteCard }/> : null }
                        { this.props.editCardMenu ? <EditCard currentEditCard={ this.props.currentEditCard }/> : null }
                        { cards }
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
        createCardMenu : state.card.createCardMenu,
        deleteCardMenu : state.card.deleteCardMenu,
        editCardMenu : state.card.editCardMenu,
        currentDeleteCard : state.card.currentDeleteCard,
        currentEditCard : state.card.currentEditCard,

    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
       toggleCreateCard: ()=> dispatch(toggleCreateCard()),
       toggleDeleteCardIcon: ()=> dispatch(toggleDeleteCardIcon()),
       toggleEditCardIcon: ()=>dispatch(toggleEditCardIcon())
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
)( FC_Collection )


