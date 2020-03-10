import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteCard, currentEditCard, toggleStar } from "../../store/actions/cardAction";

class Card extends React.Component{

    handleToggleDeleteCard(){
        const { uid, bookDocName, card, cardArr, index, currentDeleteCard } = this.props;
        currentDeleteCard( uid, bookDocName, card, cardArr, index)
    }
    handleToggleEditCardIcon(){
        const { uid, bookDocName, card, cardArr, index, currentEditCard } = this.props;
        currentEditCard( uid, bookDocName, card, cardArr, index )
    }
    handleToggleStar( ){
        const { card, index, bookDocName, uid, cardArr, toggleStar } = this.props;
        const cardData = {
                back : card.back,
                front : card.front,
                star : card.star,
                index : index,
                bookDocName : bookDocName,
                uid : uid
            }
        toggleStar( cardData, cardArr )
    }
    render(){   
        const { card, bookDocName, index } = this.props;
        return(
            <div className="cardContainer">
                { this.props.deleteCardIcon? <i className="delete material-icons" onClick={ this.handleToggleDeleteCard.bind(this) }>cancel</i> : null }
                { this.props.editCardIcon? <i className="edit material-icons" onClick={ this.handleToggleEditCardIcon.bind(this) }>edit</i> : null }
                <i className="star material-icons waves-effect" onClick={ this.handleToggleStar.bind(this, card.star) }> { card.star ? "star" : "star_border"}</i>
                <Link to={`/card/${bookDocName}/${index}/${card.front}`}>
                        <div className="fcCard card">                       
                            <div className="card-content">                            
                                <div className="card-title">{card.front}</div>
                                <div className="card-description">{card.back}</div>
                            </div>
                        </div>
                </Link>   
            </div>
        )
    }
}
const mapStateToProps = ( state ) =>{
    return{
        deleteCardIcon : state.card.deleteCardIcon,
        editCardIcon : state.card.editCardIcon 
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        currentDeleteCard : ( uid, bookDocName, card, cardArr, index )=> dispatch(currentDeleteCard( uid, bookDocName, card, cardArr, index )),
        currentEditCard : ( uid, bookDocName, card, cardArr, index ) => dispatch(currentEditCard( uid, bookDocName, card, cardArr, index )),
        toggleStar :  ( cardData, previousCardArr ) => dispatch(toggleStar( cardData, previousCardArr )),
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( Card )