import React from "react";
import { connect } from "react-redux";
import { createBook, toggleCreateBook } from "../../store/actions/cardAction";

class AddBook extends React.Component{

    constructor(props){
        super(props);
        this.state={
            bookName:null,
            lang:null
        }
    }
 
    handleChange(e){
        this.setState({
            [ e.currentTarget.id ] : e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createBook( this.props.uid, this.state)    
    }

    handleToggleAddBook(){
        this.props.toggleCreateBook()
    }

    render(){
        return(
            <div className="fcBook addForm card" >         
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <h5>New Folder</h5>                
                    <div className="input-field">
                        <label htmlFor="name">Name</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="bookName"/>
                        { this.props.nameErr ? <span>required field</span> : null }
                    </div> 
                   
                    <div className="input-field">
                        <label htmlFor="name">Language</label>  
                        <input onChange={ this.handleChange.bind(this) } type="text" id="lang"/>
                        { this.props.langErr ? <span>required field</span> : null }
                    </div> 
                    <div className="createFolderBtn">
                        <button className="btn waves-effect left" onSubmit={ this.handleSubmit.bind(this) }>Add</button> 
                        <button className="btn waves-effect right" onClick={ this.handleToggleAddBook.bind(this)}>Back</button>      
                    </div>
                </form>
            </div>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        nameErr: state.card.nameErr,
        langErr: state.card.langErr,
        cards: state.firestore.data.Cards,
       
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
       createBook: ( uid, data ) => dispatch(createBook( uid, data )),
       toggleCreateBook: ()=> dispatch(toggleCreateBook())
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( AddBook  )