import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleCreateBook, toggleDeleteBookIcon, toggleEditBookIcon } from "../store/actions/cardAction";
import "../css/FC_Category.css";

import Header from "../components/common/header";
import Loading from "../components/common/loading";
import FCBook from "../components/flashCard/book";
import AddBook from "../components/flashCard/addBook";
import DelBook from "../components/flashCard/delBook";


class FC_Category extends React.Component{

    handleToggleAddBook(){
        this.props.toggleCreateBook()
    }
    handleToggleDeleteBookIcon(){
        this.props.toggleDeleteBookIcon()
    }
    handleToggleEditBook(){
       this.props.toggleEditBookIcon()
    }
    render(){
        const uid = this.props.auth.uid ;
        const userBooks = this.props.bookData[ uid ] ;
        
        if( ! uid ){ return <Redirect to="/signin"/> }

        if ( userBooks === undefined ){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )
        }else{      
            // console.log(userBooks)  
            const books = userBooks.map(( book, index )=>{
                return(
                    <FCBook key={ index } book ={ book } uid={ uid }/>         
                )
            })
            return(
                <>
                    <Header/>                 
                    <div className="FC_Category container"> 
                        <div className="stickyCard"> 
                            <Link to="/collection">
                                <div className="FC_book card">
                                    <div className="card-content">
                                        <div className="card-description">                               
                                            <span className="grey-text right">100 cards</span>   
                                        </div>                                
                                        <span className="card-title center-align"> 
                                            <i className="material-icons yellow-text text-darken-2 ">star</i>
                                            收藏
                                        </span>
                                    </div>                 
                                </div>
                            </Link>                            
                            <div className="FC_book card edit" >                              
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleAddBook.bind(this)}>add</i> 
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleDeleteBookIcon.bind(this)}>remove</i>
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleEditBook.bind(this)} >edit</i> 
                            </div>
                        </div>
                        { this.props.createBookMenu? <AddBook uid={ this.props.auth.uid }/> : null}
                        { this.props.deleteBookMenu ? <DelBook currentDeleteBook={ this.props.currentDeleteBook }/> : null }
                        {books}
                    </div>               
                </>
                
            )
        }
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
        bookData: state.firestore.ordered,
        createBookMenu: state.card.createBookMenu,
        deleteBookMenu : state.card.deleteBookMenu,
        currentDeleteBook : state.card.currentDeleteBook
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       toggleCreateBook: ()=> dispatch(toggleCreateBook()),
       toggleDeleteBookIcon: ()=> dispatch(toggleDeleteBookIcon()),
       toggleEditBookIcon: ()=>dispatch(toggleEditBookIcon())
    }
}

export default 
compose( 
    firestoreConnect((props) =>{     
        const uid = props.firestore._.authUid;
        return(
            [{
                collection: "Cards",
                doc: uid ,
                subcollections: [{collection: uid}],
                storeAs: uid
            }]
        )
    }),
    
    connect( mapStateToProps, mapDispatchToProps )
)( FC_Category )
