import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleCreateBook, toggleDeleteBookIcon, toggleEditBookIcon, initBookState } from "../store/actions/cardAction";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Loading from "../components/common/loading";
import FcBook from "../components/flashCard/book";
import AddBook from "../components/flashCard/addBook";
import DelBook from "../components/flashCard/delBook";
import EditBook from "../components/flashCard/editBook";
import "../css/fcCategory.css";

class FcCategory extends React.Component{

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
    componentDidMount(){
        this.props.initBookState()
    }

    render(){
        const { auth, bookData, createBookMenu, deleteBookMenu, editBookMenu, currentDeleteBook, currentEditBook } = this.props;
        const uid = auth.uid;
        const userBooks = bookData[ uid ];
       
        if( !uid ){ return <Redirect to="/signin"/> }

        if ( userBooks === undefined){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{      
            const books = userBooks.map(( book, index )=>{
                return(
                    <FcBook key={ index } bookData ={ book } uid={ uid }/>         
                )
            })
            const starCardArr = [];
            const starCard = userBooks.map(book => book.cards);
                  starCard.forEach(card => card.forEach(cardEach => starCardArr.push(cardEach)));
            const starCardLength = starCardArr.filter(starCard => starCard.star === true).length;
            return(
                <Fragment>
                    <Header/>                 
                    <div className="fcCategory container"> 

                        <div className="stickyCard"> 
                            <Link to="/mycollection">
                                <div className="fcBook card">
                                    <div className="card-content">
                                        <div className="card-description">                               
                                            <span>{ starCardLength }  cards</span>   
                                        </div>                                
                                        <span className="card-title center"> 
                                            <i className="material-icons">star</i>
                                            My Collection
                                        </span>
                                    </div>                 
                                </div>
                            </Link>                            
                            <div className="fcBook card edit" >                              
                                <i className="material-icons waves-effect" onClick={ this.handleToggleAddBook.bind(this) }>add</i> 
                                <i className="material-icons waves-effect" onClick={ this.handleToggleDeleteBookIcon.bind(this) }>remove</i>
                                <i className="material-icons waves-effect" onClick={ this.handleToggleEditBookIcon.bind(this) } >edit</i> 
                            </div>
                        </div>

                        { createBookMenu ? <AddBook uid={ uid }/> : null}
                        { deleteBookMenu ? <DelBook currentDeleteBook={ currentDeleteBook }/> : null }
                        { editBookMenu ? <EditBook currentEditBook={ currentEditBook }/> : null }
                        { books }
                    </div>               
                </Fragment>   
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
        initBookState: ()=>dispatch(initBookState()),
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
        if( uid ){
            return(
                [{
                    collection: "Cards",
                    doc: uid ,
                    subcollections: [{collection: `${uid}`}],
                    storeAs: `${uid}`
                }]
            )
        }
    }),
)( FcCategory )
