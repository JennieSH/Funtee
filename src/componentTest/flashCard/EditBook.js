import React from "react";
import { connect } from "react-redux";
import { editBook, toggleEditBook } from "../../store/actions/cardAction";

class EditBook extends React.Component{

    constructor(props){
        super(props);
        this.state={
            editBookValue: {
               id: this.props.currentEditBook.bookData.id,
               lang : this.props.currentEditBook.bookData.lang
            }
        }
    }
    handleEditValue(e){
        this.setState({
            editBookValue:{
                id: e.currentTarget.value,
                lang : this.props.currentEditBook.bookData.lang
            } 
        })
    }
    handleToggleEditBookIcon(){
        this.props.toggleEditBook()
    }
    handleEdit(){
        const currentEditBook = this.props.currentEditBook ;
        if (this.state.editBookValue.id !== currentEditBook.bookData.id){
           this.props.editBook( currentEditBook.uid, currentEditBook.bookDocName, this.state.editBookValue )
        } 
    }
    render(){
        const currentEditBook = this.props.currentEditBook.bookData;
        return(
            <div className="fcBook addForm card" >         
                <h5>Edit Collection</h5>
                <input type="text"  defaultValue={ currentEditBook.id } onChange={ this.handleEditValue.bind(this) }/>
                { this.props.editBookNameErr ? <span>required field</span> : null } 
                <div className="editBookBtn">
                    <button className="btn waves-effect left" onClick={ this.handleEdit.bind(this) }>Edit</button> 
                    <button className="btn waves-effect right" onClick={ this.handleToggleEditBookIcon.bind(this)}>Back</button>      
                </div>
                
            </div>          
        )
    }
}
const mapStateToProps = ( state ) =>{
    return{
        editBookNameErr: state.card.editBookNameErr,  
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
       editBook: ( uid, bookDocName, bookEditData ) => dispatch(editBook( uid, bookDocName, bookEditData )),
       toggleEditBook: ()=> dispatch(toggleEditBook())
    }
}
export default connect(  mapStateToProps, mapDispatchToProps )( EditBook  )