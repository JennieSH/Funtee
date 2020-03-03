import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleStar } from "../../store/actions/cardAction";

class FC_MyCard extends React.Component{

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
            <div className="FCCard">
                <i className="star material-icons yellow-text text-darken-2 waves-effect end" onClick={ this.handleRemoveStar.bind(this)}>star</i>
                <Link to={`/mycard/${this.props.index}`} >
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

const mapDispatchToProps = ( dispatch ) => {
    return{
        toggleStar :  ( cardData, previousCardArr ) => dispatch(toggleStar( cardData, previousCardArr )),
    }
}
export default connect( null, mapDispatchToProps)( FC_MyCard )