import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { createCard, toggleCreateCard } from "../../store/actions/cardAction";

class AddCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            front:null,
            back:null
        }
    }
 
    handleChange(e){
        this.setState({
            [ e.currentTarget.id ] : e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createCard( this.props.uid, this.props.bookDocName, this.props.cardArr, this.state)    
    }

    handleToggleAddCard(){
        this.props.toggleCreateCard()
    }

    render(){
        return(
            <div className="FC_book addForm card" >         
                <form onSubmit={ this.handleSubmit.bind(this) }>
                  <h5 className="blue-grey-text center">New Card</h5>




                {/* { this.props.nameErr ? <p className="red-text right">required field</p> : null } */}
                 
                    <div className="input-field">
                        <label htmlFor="name">Front</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="front"/>
                        { this.props.frontErr ? <span className="red-text right">required field</span> : null }
                    </div> 
                   
                    <div className="input-field">
                        <label htmlFor="name">Back</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="back"/>
                        { this.props.backErr ? <div className="red-text right">required field</div> : null }
                    </div> 
                    <div className="createCardBtn">
                        <button className="btn white-text  waves-effect left" onSubmit={ this.handleSubmit.bind(this) }>Add</button> 
                        <button className="btn red white-text  waves-effect right" onClick={ this.handleToggleAddCard.bind(this)}>Back</button>      
                    </div>
                </form>
            </div>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        frontErr: state.card.frontErr,
        backErr: state.card.backErr,
        cards: state.firestore.data.Cards,
       
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       createCard: ( uid, bookDocName, cardArr, data ) => dispatch(createCard( uid, bookDocName, cardArr, data )),
       toggleCreateCard: ()=> dispatch(toggleCreateCard())
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
)( AddCard  )