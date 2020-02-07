import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import "../../css/common.css";


class Header extends React.Component{

    clickSignOut(){
        let checkSignOut=confirm("Do you want to Sign out")
        if ( checkSignOut ){
            this.props.signOut();
        }
    }

    render(){
        let  authSignAction; 
        if( this.props.authState ){
            authSignAction= <div onClick={ this.clickSignOut.bind(this) }>Sign Out</div>        
        }else{
            authSignAction = <div><Link to="/signin">Sign In</Link></div>        
        }

        return(
            <header>
                <div><Link to="/">DAWAN</Link></div>   
                <input type="checkbox" name="" id="menu_control"/>
                <label htmlFor="menu_control" className="menuBtn">
                        <div className="lineContainer">
                            <span className="line line-first"></span>
                            <span className="line line-second"></span>
                            <span className="line line-third"></span>
                        </div>  
                </label>
                <nav>
                    <div><Link to="/learning">Learning Chinese</Link></div>
                    <div><Link to="/flashcard">Flash Card</Link></div>
                    { authSignAction }
                    <div>Language</div>
                </nav>    
            </header>
        )
    }
}
const mapStateToProps = ( state ) => {
    // console.log(state.firebase.auth.uid)
    return{
        authState : state.firebase.auth.uid
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        signOut : ()=> dispatch(signOut())
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( Header )