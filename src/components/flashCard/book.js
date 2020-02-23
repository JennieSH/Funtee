import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteBook, currentEditBook } from "../../store/actions/cardAction";



class FCBook extends React.Component{

    handleToggleDeleteBookIcon(){
        this.props.currentDeleteBook( this.props.uid, this.props.book.time, this.props.book.id )
    }
    handleToggleEditBookIcon(){
        this.props.currentEditBook( this.props.uid, this.props.book.time, this.props.book.id )
    }

    render(){

        const book = this.props.book;
        return(
            <div className="FCBook">
                { this.props.deleteBookIcon? <i className="delete material-icons red-text" onClick={ this.handleToggleDeleteBookIcon.bind(this) }>cancel</i> : null }
                { this.props.editBookIcon? <i className="edit material-icons green-text" onClick={ this.handleToggleEditBookIcon.bind(this) }>edit</i> : null }
                <Link to={`/collection/${book.time}`}>
                        <div className="FC_book card">
                            <div className="card-content">
                                <div className="card-description">
                                    <span className="grey-text ">{ book.lang }</span> 
                                    <span className="grey-text ">{ book.cards.length } cards</span>   
                                </div>
                                <span className="card-title center-align">{ book.id }</span>
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
        currentEditBook : ( uid, bookDocName, id ) => dispatch(currentEditBook( uid, bookDocName, id ))

    }
}
export default connect( mapStateToProps, mapDispatchToProps)( FCBook )