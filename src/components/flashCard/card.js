import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteCard } from "../../store/actions/cardAction";

class FCCard extends React.Component{
    handleToggleDeleteCard(){
        const uid = this.props.uid;
        const bookDocName = this.props.bookDocName;
        const card = this.props.card;
        const cardArr = this.props.cardArr;
        const index = this.props.index;
        this.props.currentDeleteCard( uid, bookDocName, card, cardArr, index)
    }
    render(){
        const card = this.props.card;
        return(
            <div className="FCCard">
                { this.props.deleteCardIcon? <i className="delete material-icons red-text" onClick={ this.handleToggleDeleteCard.bind(this) }>cancel</i> : null }
                <Link to={`/card/${this.props.bookDocName}/${card.front}`}>
                        <div className="FC_card card">                       
                            <div className="card-content">                            
                                <span className="card-title center-align">
                                    <span>{card.front}</span>
                                    <i className="material-icons yellow-text text-darken-2 end">star_border</i>
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
        deleteCardIcon : state.card.deleteCardIcon
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        currentDeleteCard : ( uid, bookDocName, card, cardArr, index )=> dispatch(currentDeleteCard( uid, bookDocName, card, cardArr, index ))
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( FCCard )