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
        const { uid, bookDocName, cardArr } =this.props;
        this.props.createCard( uid, bookDocName, cardArr, this.state)  ;  
    }
    handleToggleAddCard(){
        this.props.toggleCreateCard();
    }
    render(){
        return(
            <div className="fcBook addForm card" >         
                <form onSubmit={ this.handleSubmit.bind(this) }>
                  <h5>New Card</h5>
                    <div className="input-field">
                        <label htmlFor="name">Front</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="front"/>
                        { this.props.frontErr ? <span>required field</span> : null }
                    </div> 
                    <div className="input-field">
                        <label htmlFor="name">Back</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="back"/>
                        { this.props.backErr ? <span>required field</span> : null }
                    </div> 
                    <div className="createCardBtn">
                        <button className="btn waves-effect left" onSubmit={ this.handleSubmit.bind(this) }>Add</button> 
                        <button className="btn waves-effect right" onClick={ this.handleToggleAddCard.bind(this)}>Back</button>      
                    </div>
                </form>
            </div>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth,
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
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) =>{     
        const uid = props.auth.uid;
        return(
            [{
                collection: "Cards",
                doc: uid ,
                subcollections: [{collection: uid}],
                storeAs: uid
            }]
        )
    })
)( AddCard )