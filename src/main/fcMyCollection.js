import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Header from "../components/common/header";
import MyCard from "../components/flashCard/cardMy";
import Loading from "../components/common/loading";
import "../css/fcCollection.css";

class FcMyCollection extends React.Component{
    
    render(){
        const { auth, cards,} = this.props;
        const uid = auth.uid;
        const userBooks = cards[uid];
        if( !uid ){ return <Redirect to = "/signin"/> }
        if ( userBooks === undefined ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            const allCardArr = [];        
                userBooks.map( book => {
                    book.cards.map((card, index)=>{     
                        card.index = index;
                        card.bookDocName = book.id;
                        card.uid = uid;
                        allCardArr.push(card)
                    })             
                });
            const starCardArr = allCardArr.filter( card => card.star === true)
            const cards = starCardArr.map(( card, index )=>{
                    return(
                        <MyCard key={ index } card = { card } userBooks={ userBooks } index={ index }/>
                    )
                })
            return(         
                <Fragment>
                    <Header/>
                    <div className="fcCollection container"> 
                        <div className="stickyCard">
                            <div className="fcCard card">
                                <div className="card-content comment">          
                                    <span className="card-title">My Collection</span>
                                    <span>- { starCardArr.length }  cards</span>
                                </div>     
                                   
                            </div>                   
                            <Link to="/spelling">
                                <div className="fcCard card">
                                    <div className="card-content spelling">                                
                                        <span className="card-title"> 
                                            <i className="material-icons">spellcheck</i>
                                            Spelling
                                        </span>
                                    </div>                 
                                </div>
                            </Link>
                        </div>  
                        { cards }
                    </div>               
                </Fragment>  
            )
        }
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
        cards : state.firestore.ordered,
    }
}

export default compose( 
    connect( mapStateToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        if(uid){
            return(
                [{
                    collection: "Cards",
                    doc: uid ,
                    subcollections: [{collection: uid}],
                    storeAs: uid
                }]
            )
        }
    }),
)( FcMyCollection )


