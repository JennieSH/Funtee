import React from "react";
import { connect } from "react-redux";
import { editBook,  toggleEditBook } from "../../store/actions/cardAction";

class EditBook extends React.Component{

    constructor(props){
        super(props);
        this.state={
            editBookValue: this.props.currentEditBook.id
        }
    }
    handleEditValue(e){
        this.setState({
            editBookValue: e.currentTarget.value
        })
    }
    handleToggleEditBookIcon(){
        this.props.toggleEditBook()
    }

    handleEdit(){
        if (this.state.editBookValue === this.props.currentEditBook.id){
            console.log("The editBookValue is the same")
        }else{
           this.props.editBook( this.props.currentEditBook.uid, this.props.currentEditBook.bookDocName, this.state.editBookValue )
        } 
    }

    render(){
        return(
            <div className="FC_book addForm card" >         
                
                  <h5 className="blue-grey-text center">Edit Folder</h5>
                    <input type="text"  defaultValue={ this.props.currentEditBook.id} onChange={ this.handleEditValue.bind(this) }/>
                    <div className="editBookBtn">
                        <button className="btn white-text  waves-effect left" onClick={ this.handleEdit.bind(this) }>Edit</button> 
                        <button className="btn red white-text  waves-effect right" onClick={ this.handleToggleEditBookIcon.bind(this)}>Back</button>      
                    </div>
                
            </div>          
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       editBook: ( uid, bookDocName, id ) => dispatch(editBook( uid, bookDocName, id )),
       toggleEditBook: ()=> dispatch(toggleEditBook())
    }
}
export default connect( null, mapDispatchToProps )( EditBook  )