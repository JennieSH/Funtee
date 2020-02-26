import React from "react";
import { connect } from "react-redux";
import { deleteBook,  toggleDeleteBook } from "../../store/actions/cardAction";

class DelBook extends React.Component{

  
    handleToggleDeleteBook(){
        this.props.toggleDeleteBook()
    }

    handleDelete(){
        this.props.deleteBook( this.props.currentDeleteBook.uid, this.props.currentDeleteBook.bookDocName )
    }

    render(){
        console.log(this.props.currentDeleteBook)
        return(
            <div className="FC_book addForm card" >         
                
                    <h5 className="blue-grey-text center">Delete Collection</h5>
                    <h6 className="center"> Are you sure you want to delete { this.props.currentDeleteBook.id } ? </h6>
                    <div className="deleteBookBtn">
                        <button className="btn white-text  waves-effect left" onClick={ this.handleDelete.bind(this) }>Delete</button> 
                        <button className="btn red white-text  waves-effect right" onClick={ this.handleToggleDeleteBook.bind(this)}>Back</button>      
                    </div>
                
            </div>          
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       deleteBook: ( uid, bookDocName ) => dispatch(deleteBook( uid, bookDocName )),
       toggleDeleteBook: ()=> dispatch(toggleDeleteBook())
    }
}
export default connect( null, mapDispatchToProps )( DelBook  )