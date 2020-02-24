import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteBook, currentEditBook } from "../../store/actions/cardAction";



class FCBook extends React.Component{

    handleToggleDeleteBookIcon(){
        this.props.currentDeleteBook( this.props.uid, this.props.bookData.time, this.props.bookData.book.id )
    }
    handleToggleEditBookIcon(){
        this.props.currentEditBook( this.props.uid, this.props.bookData.time, this.props.bookData.book )
    }

    render(){
        // console.log(this.props.bookData.book)
        const bookData = this.props.bookData;
        // console.log(bookData)
        return(
            <div className="FCBook">
                { this.props.deleteBookIcon? <i className="delete material-icons red-text" onClick={ this.handleToggleDeleteBookIcon.bind(this) }>cancel</i> : null }
                { this.props.editBookIcon? <i className="edit material-icons green-text" onClick={ this.handleToggleEditBookIcon.bind(this) }>edit</i> : null }
                <Link to={`/collection/${bookData.time}`}>
                        <div className="FC_book card">
                            <div className="card-content">
                                <div className="card-description">
                                    <span className="grey-text ">{ bookData.book.lang }</span> 
                                    <span className="grey-text ">{ bookData.cards.length } cards</span>   
                                </div>
                                <span className="card-title center-align">{ bookData.book.id }</span>
                            </div>  
                        </div>
                </Link>
            </div>          
        )
    }
}
const mapStateToProps = ( state ) =>{
    return{
        deleteBookIcon : state.card.deleteBookIcon,
        editBookIcon : state.card.editBookIcon,
       
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        currentDeleteBook : ( uid, bookDocName, id )=> dispatch(currentDeleteBook( uid, bookDocName, id )),
        currentEditBook : ( uid, bookDocName, bookData  ) => dispatch(currentEditBook( uid, bookDocName, bookData ))

    }
}
export default connect( mapStateToProps, mapDispatchToProps)( FCBook )