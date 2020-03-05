import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Header from "../components/common/header";
import FC_MyCard from "../components/flashCard/cardMy";
import Loading from "../components/common/loading";
import "../css/FC_Collection.css";

class FC_MyCollection extends React.Component{
    
    render(){
        const uid = this.props.auth.uid;
        const userBooks = this.props.cards[this.props.auth.uid];
        if( !uid ){ return <Redirect to = "/signin"/> }
        if ( userBooks === undefined ){
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
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
                    <FC_MyCard key={ index } card = { card } userBooks={ userBooks }index = { index }/>
                )
            })
          
            return(         
                <>
                    <Header/>
                    <div className="FC_Collection container"> 
                        <div className="stickyCard">
                            <div className="FC_card card">
                                <div className="card-content">          
                                    <span className="card-title left-align">My Collection</span>
                                </div>     
                                <span className="grey-text ">- { starCardArr.length }  cards</span>   
                            </div>                   
                            {/* <Link to="/spelling">
                                <div className="FC_card card">
                                    <div className="card-content">                                
                                        <span className="card-title center-align"> 
                                            <i className="material-icons green-text text-darken-1">spellcheck</i>
                                            Spelling
                                        </span>
                                    </div>                 
                                </div>
                            </Link>              */}
                        </div>  
                        { cards }
                    </div>               
                </>  
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
)( FC_MyCollection )


