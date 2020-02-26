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
import EditBook from "../components/flashCard/editBook";


class FC_Category extends React.Component{

    constructor(props){
        super(props);
        this.state={
            previousData : this.props.bookData[ this.props.auth.uid ]
        }
    }


    handleToggleAddBook(){
        this.props.toggleCreateBook()
    }
    handleToggleDeleteBookIcon(){
        this.props.toggleDeleteBookIcon()
    }
    handleToggleEditBookIcon(){
       this.props.toggleEditBookIcon()
    }


    render(){
        const uid = this.props.auth.uid ;
        const userBooks = this.props.bookData[ uid ] ;
        // console.log(userBooks)
        if( !uid ){ return <Redirect to="/signin"/> }
 

        if ( userBooks === undefined){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )
        }else{      
            const books = userBooks.map(( book, index )=>{
                return(
                    <FCBook key={ index } bookData ={ book } uid={ uid }/>         
                )
            })
            const starCardArr = [];
            const starCard = userBooks.map(book => book.cards);
                  starCard.forEach(card => card.forEach(cardEach => starCardArr.push(cardEach)));
            const starCardLength = starCardArr.filter(starCard => starCard.star === true).length;
            return(
                <>
                    <Header/>                 
                    <div className="FC_Category container"> 
                        <div className="stickyCard"> 
                            <Link to="/mycollection">
                                <div className="FC_book card">
                                    <div className="card-content">
                                        <div className="card-description">                               
                                            <span className="grey-text right">{ starCardLength }  cards</span>   
                                        </div>                                
                                        <span className="card-title center-align"> 
                                            <i className="material-icons yellow-text text-darken-2 ">star</i>
                                            My Collection
                                        </span>
                                    </div>                 
                                </div>
                            </Link>                            
                            <div className="FC_book card edit" >                              
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleAddBook.bind(this)}>add</i> 
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleDeleteBookIcon.bind(this)}>remove</i>
                                <i className="material-icons white-text waves-effect" onClick={ this.handleToggleEditBookIcon.bind(this)} >edit</i> 
                            </div>
                        </div>
                        { this.props.createBookMenu? <AddBook uid={ this.props.auth.uid }/> : null}
                        { this.props.deleteBookMenu ? <DelBook currentDeleteBook={ this.props.currentDeleteBook }/> : null }
                        { this.props.editBookMenu ? <EditBook currentEditBook={ this.props.currentEditBook }/> : null }
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
        editBookMenu : state.card.editBookMenu,
        currentDeleteBook : state.card.currentDeleteBook,
        currentEditBook : state.card.currentEditBook,
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
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        return(
            [{
                collection: "Cards",
                doc: uid ,
                subcollections: [{collection: `${uid}`}],
                storeAs: `${uid}`
            }]
        )
    }),
)( FC_Category )
