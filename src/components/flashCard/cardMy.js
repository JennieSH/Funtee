import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleStar } from "../../store/actions/cardAction";

class MyCard extends React.Component{

    handleRemoveStar(){
        const cardArr = this.props.userBooks.filter((book) =>{
            if( book.id ===  this.props.card.bookDocName){
                return book
            }
        })
        this.props.toggleStar( this.props.card , cardArr[0].cards )
    }

    render(){
        const card = this.props.card;
        return(
            <div className="cardContainer">
                <i className="star material-icons waves-effect" onClick={ this.handleRemoveStar.bind(this)}>star</i>
                <Link to={`/mycard/${this.props.index}`} >
                        <div className="fcCard card">                       
                            <div className="card-content">                            
                                <span className="card-title">
                                    <span>{card.front}</span>                 
                                </span>
                                <div className="card-description">
                                    <span>{card.back}</span>    
                                </div>
                            </div>            
                        </div>
                </Link>   
            </div>
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        toggleStar :  ( cardData, previousCardArr ) => dispatch(toggleStar( cardData, previousCardArr )),
    }
}

export default connect( null, mapDispatchToProps)( MyCard )