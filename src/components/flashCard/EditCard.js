import React from "react";
import { connect } from "react-redux";
import { editCard,  toggleEditCard, toggleEditCardIcon } from "../../store/actions/cardAction";

class EditCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            editFrontValue: this.props.currentEditCard.card.front,
            editBackValue: this.props.currentEditCard.card.back,
            star: this.props.currentEditCard.card.star
        }
    }
    handleEditValue(e){
        this.setState({
            [ e.currentTarget.id ]: e.currentTarget.value
        })
    }
    handleToggleEditCardIcon(){
        this.props.toggleEditCard();
    }
    handleEdit(){
        const currentEditCard = this.props.currentEditCard;
        if (this.state.editFrontValue === currentEditCard.card.front && this.state.editBackValue === currentEditCard.card.back){
            // console.log("The editCardValue is the same");
            this.props.toggleEditCard();
            this.props.toggleEditCardIcon();
        }else{
            const newCard={
                front: this.state.editFrontValue,
                back: this.state.editBackValue,
                star: this.state.star
            }
            this.props.editCard( currentEditCard.uid, currentEditCard.bookDocName, newCard, currentEditCard.cardArr, currentEditCard.index )
        } 
    }

    render(){
        return(
            <div className="fcBook addForm card" >         
                <h5>Edit Card</h5>
                <input type="text"  defaultValue={ this.props.currentEditCard.card.front } onChange={ this.handleEditValue.bind(this) } id="editFrontValue"/>
                { this.props.frontErr ? <span>required field</span> : null }
                <input type="text"  defaultValue={ this.props.currentEditCard.card.back } onChange={ this.handleEditValue.bind(this) } id="editBackValue"/>
                { this.props.backErr ? <span>required field</span> : null }        
                <div className="editCardBtn">
                    <button className="btn waves-effect left" onClick={ this.handleEdit.bind(this) }>Edit</button> 
                    <button className="btn waves-effect right" onClick={ this.handleToggleEditCardIcon.bind(this)}>Back</button>      
                </div>
            </div>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        frontErr: state.card.editFrontErr,
        backErr: state.card.editBackErr    
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
       editCard: ( uid, bookDocName, newCard, previousCardArr, index ) => dispatch(editCard( uid, bookDocName, newCard, previousCardArr, index )),
       toggleEditCard: ()=> dispatch(toggleEditCard()),
       toggleEditCardIcon: ()=> dispatch(toggleEditCardIcon())
    }
}

export default connect( mapStateToProps, mapDispatchToProps )( EditCard )