import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import SignOutDialog from "../common/auth/signOutDialog";
import { toggleSignOut } from "../../store/actions/authActions";
import "../../css/common.css";
import "materialize-css";
class Header extends React.Component{

    handlePath(e){
        if ( !this.props.auth.uid ){
            e.stopPropagation();
            e.preventDefault();
            this.props.history.push("/signin");
        }
    }

    handleSignOut(){
        this.props.toggleSignOut();
    }

    render(){
        const auth =this.props.auth;
        let name;
        let fabName;
        let authSignAction; 

        // the status of sign in / sign out 
        if( auth.uid ){
            authSignAction= <a onClick={ this.handleSignOut.bind(this) }><i className="navI material-icons" >lock_open</i>Sign Out</a>
        }else{
            name = "Hi, Guest";
            authSignAction = <Link to="/signin"><i className="navI material-icons">lock</i>Sign In</Link>       
        }

        // fab name
        if ( auth.uid ){
            if ( auth.displayName ){
                name = `Hi, ${auth.displayName.split(" ")[0]}`;
                fabName = auth.displayName.substr(0,1)
            }else{
                name = auth.email.split("@")[0]
                fabName = auth.email.substr(0,1)
            }
        }

        return(
            <header>
                <nav className="nav-wrapper">
                    <div className="container">
                        <Link to="/" className="brand-logo">FUNTEE</Link>

                        <input type="checkbox" id="menu_control"/>
                        <label htmlFor="menu_control" className="menuBtn">
                            <div className="lineContainer">
                                <span className="line line-first"></span>
                                <span className="line line-second"></span>
                                <span className="line line-third"></span>
                            </div>  
                        </label>

                        <ul className="right hide-on-med-and-down ">
                            <li><Link to="/topics">Learning Chinese</Link></li>
                            <li><Link to="/flashcard" onClick={this.handlePath.bind(this)}>Flash Card</Link></li>
                            <li>{ authSignAction }</li>
                            {/* <li><a>Language</a></li> */}
                            { auth.uid ?<li><Link to="/" className="web-info btn btn-floating "><span className="white-text ">{ fabName }</span></Link></li> : null}
                        </ul>     

                        <ul className="sidenav" id="mobile-menu">
                            <li className="userName">
                                <Link to="/" className="btn btn-floating"><span className="fabName">{ fabName }</span></Link>
                                <span className="brown-text text-darken-3">{name}</span>
                            </li>             
                            <li>
                                <Link to="/topics"><i className=" material-icons" >translate</i>
                                    Learning Chinese
                                </Link>
                            </li>                            
                            <li>
                                <Link to="/flashcard" onClick={this.handlePath.bind(this)} ><i className="material-icons" >style</i>
                                    Flash Card
                                    { auth.uid? null : <span className="badge grey lighten-2  grey-text ">member only</span> }
                                </Link>
                            </li>                                                       
                            <li>{ authSignAction }</li>                        
                            {/* <li>
                                <a>
                                    <i className=" material-icons" >language</i>   
                                    Language
                                </a>
                            </li> */}
                        </ul>                                    
                    </div>
                    { this.props.signOutDialogBox? <SignOutDialog/> : null }
                </nav>     
            </header>
        )
    }
}
const mapStateToProps = ( state ) => {
    return{
        auth : state.firebase.auth,
        signOutDialogBox : state.auth.signOutDialogBox 
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        toggleSignOut : ()=> dispatch(toggleSignOut())
    }
}
export default  withRouter(connect( mapStateToProps, mapDispatchToProps )( Header ))