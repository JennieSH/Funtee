import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentDeleteBook } from "../../store/actions/cardAction";



class FCBook extends React.Component{
    handleToggleDeleteBook(){
        this.props.currentDeleteBook( this.props.uid, this.props.book.time, this.props.book.id )
    }
    // handleToggleEditBook(){
    //     this.props.currentEditBook( this.props.uid, this.props.book.time, this.props.book.id )
    // }
    render(){
        const book = this.props.book;
        return(
            <div className="FCBook">
                { this.props.deleteBookIcon? <i className="delete material-icons red-text" onClick={ this.handleToggleDeleteBook.bind(this) }>cancel</i> : null }
                {/* <i className="delete material-icons green-text">edit</i>           */}
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
        deleteBookIcon : state.card.deleteBookIcon
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        currentDeleteBook : ( uid, bookDocName, id)=> dispatch(currentDeleteBook( uid, bookDocName, id ))
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( FCBook )