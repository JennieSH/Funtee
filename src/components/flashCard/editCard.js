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
        this.props.toggleEditCard()
    }

    handleEdit(){
        if (this.state.editFrontValue === this.props.currentEditCard.card.front && this.state.editBackValue === this.props.currentEditCard.card.back){
            console.log("The editCardValue is the same");
            this.props.toggleEditCard();
            this.props.toggleEditCardIcon();
        }else{
            const newCard={
                front: this.state.editFrontValue,
                back: this.state.editBackValue,
                star: this.state.star
            }
            this.props.editCard( this.props.currentEditCard.uid, this.props.currentEditCard.bookDocName, newCard, this.props.currentEditCard.cardArr, this.props.currentEditCard.index )
        } 
    }

    render(){
        return(
            <div className="FC_book addForm card" >         
                
                  <h5 className="blue-grey-text center">Edit Card</h5>

                    <input type="text"  defaultValue={ this.props.currentEditCard.card.front } onChange={ this.handleEditValue.bind(this) } id="editFrontValue"/>
                    { this.props.frontErr ? <span className="red-text right">required field</span> : null }

                    <input type="text"  defaultValue={ this.props.currentEditCard.card.back } onChange={ this.handleEditValue.bind(this) } id="editBackValue"/>
                    { this.props.backErr ? <span className="red-text right">required field</span> : null }
                    
                    <div className="editCardBtn">
                        <button className="btn white-text  waves-effect left" onClick={ this.handleEdit.bind(this) }>Edit</button> 
                        <button className="btn red white-text  waves-effect right" onClick={ this.handleToggleEditCardIcon.bind(this)}>Back</button>      
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