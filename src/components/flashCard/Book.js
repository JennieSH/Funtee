import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteBook, currentEditBook } from "../../store/actions/cardAction";

class FcBook extends React.Component{

    handleToggleDeleteBookIcon(){
        const { uid, bookData, currentDeleteBook } = this.props;
        currentDeleteBook( uid, bookData.time, bookData.book.id )
    }
    handleToggleEditBookIcon(){
        const { uid, bookData, currentEditBook } = this.props;
        currentEditBook( uid, bookData.time, bookData.book )
    }

    render(){
        const bookData = this.props.bookData;
        return(
            <div className="fcBookContainer">
                { this.props.deleteBookIcon? <i className="delete material-icons" onClick={ this.handleToggleDeleteBookIcon.bind(this) }>cancel</i> : null }
                { this.props.editBookIcon? <i className="edit material-icons" onClick={ this.handleToggleEditBookIcon.bind(this) }>edit</i> : null }
                <Link to={`/collection/${bookData.time}`}>
                        <div className="fcBook card">
                            <div className="card-content">
                                <div className="card-description">
                                    <span>{ bookData.book.lang }</span> 
                                    <span>{ bookData.cards.length } cards</span>   
                                </div>
                                <span className="card-title center">{ bookData.book.id }</span>
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
export default connect( mapStateToProps, mapDispatchToProps)( FcBook )