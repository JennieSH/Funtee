import React from "react";
import { connect } from "react-redux";
import { deleteCard,  toggleDeleteCard } from "../../store/actions/cardAction";

class DelCard extends React.Component{

  
    handleToggleDeleteCard(){
        this.props.toggleDeleteCard()
    }

    handleDelete(){
        this.props.deleteCard( this.props.currentDeleteCard )
    }

    render(){
        return(
            <div className="FC_book addForm card" >         
                
                  <h5 className="blue-grey-text center">Delete Card</h5>
                    <h6> 你想要刪除{ this.props.currentDeleteCard.card.front }? </h6>
                    <div className="deleteBookBtn">
                        <button className="btn white-text  waves-effect left" onClick={ this.handleDelete.bind(this) }>Delete</button> 
                        <button className="btn red white-text  waves-effect right" onClick={ this.handleToggleDeleteCard.bind(this)}>Back</button>      
                    </div>
                
            </div>          
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       deleteCard: ( currentDeleteCard) => dispatch(deleteCard( currentDeleteCard )),
       toggleDeleteCard: ()=> dispatch(toggleDeleteCard())
    }
}
export default connect( null, mapDispatchToProps )( DelCard )