import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteCard, currentEditCard, toggleStar } from "../../store/actions/cardAction";

class FCCard extends React.Component{
    handleToggleDeleteCard(){
        const uid = this.props.uid;
        const bookDocName = this.props.bookDocName;
        const card = this.props.card;
        const cardArr = this.props.cardArr;
        const index = this.props.index;
        this.props.currentDeleteCard( uid, bookDocName, card, cardArr, index)
    }
    handleToggleEditCardIcon(){
        const uid = this.props.uid;
        const bookDocName = this.props.bookDocName;
        const card = this.props.card;
        const cardArr = this.props.cardArr;
        const index = this.props.index;
        this.props.currentEditCard( uid, bookDocName, card, cardArr, index )
    }
    handleToggleStar( ){
        const cardData = {
                back : this.props.card.back,
                front : this.props.card.front,
                star : this.props.card.star,
                index : this.props.index,
                bookDocName : this.props.bookDocName,
                uid : this.props.uid
            }
        this.props.toggleStar( cardData, this.props.cardArr )
    }
    render(){   
        const card = this.props.card;
       
        return(
            <div className="FCCard">
                { this.props.deleteCardIcon? <i className="delete material-icons red-text" onClick={ this.handleToggleDeleteCard.bind(this) }>cancel</i> : null }
                { this.props.editCardIcon? <i className="edit material-icons white-text" onClick={ this.handleToggleEditCardIcon.bind(this) }>edit</i> : null }
                <i className="star material-icons yellow-text text-darken-2 waves-effect end" onClick={ this.handleToggleStar.bind(this, card.star) }> { card.star? "star" : "star_border"}</i>
                <Link to={`/card/${this.props.bookDocName}/${this.props.index}/${card.front}`}>
                        <div className="FC_card card">                       
                            <div className="card-content">                            
                                <span className="card-title center-align">
                                    <span>{card.front}</span>                   
                                </span>
                                <div className="card-description">
                                    <span className="grey-text">{card.back}</span>    
                                </div>
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
export default connect( mapStateToProps, mapDispatchToProps)( FCCard )