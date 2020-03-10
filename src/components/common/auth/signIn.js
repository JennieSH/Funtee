import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signInFacebook, signInGoogle } from "../../../store/actions/authActions";
import facebook from "../../../imgs/facebook.png";
import google from "../../../imgs/google.png";

class SignIn extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            email:null,
            password:null,
            blankEmail:false,
            blankPassword:false
        }
    }

    handleChange(e){
        this.setState({
            [ e.currentTarget.name ] : e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        if ( this.state.email === null  ){
            this.setState({
                blankEmail:true
            })
        }else if( this.state.password === null ){
            this.setState({
                blankEmail:false,
                blankPassword:true
            })
        }else{
            this.setState({
                blankPassword:false
            })
            this.props.signIn(this.state)            
        }
    }
    FacebookRedirect(){
        this.props.signInFacebook()
    }

    GoogleRedirect(){
        this.props.signInGoogle()
    }

    render(){
        const { authError } = this.props;
        return(
            <Fragment>
                <form onSubmit={ this.handleSubmit.bind(this) } className="authForm"> 
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input onChange={ this.handleChange.bind(this) } type="email"id="email" name="email"/>
                        { this.state.blankEmail? <h4>Please enter your Email</h4> : null }
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input onChange={ this.handleChange.bind(this) } type="password" id="password" name="password"/>
                        { this.state.blankPassword? <h4>Please enter your password</h4> : null }
                    </div>

                    { authError ? <h4>{ authError }</h4> : null }

                    <div className="authSignBtn">                     
                        <button className="waves-effect"> SIGN IN</button>
                    </div>

                    <div className="authMethod">                
                        <img src={ google } onClick={ this.GoogleRedirect.bind(this) }/>
                        <img src={ facebook }  onClick={ this.FacebookRedirect.bind(this) }/>     
                        <Link to="/resetpassword"><h5 className="right-align">FORGOT  PASSWORD ></h5></Link>               
                    </div>
                </form>
            </Fragment> 
        )
    }
}

const mapStateToProps = ( state ) => {
    return{
       authError : state.auth.authError,
       auth : state.firebase.auth
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        signIn : (creds) => dispatch(signIn(creds)),
        signInFacebook : () => dispatch(signInFacebook()),
        signInGoogle : () =>dispatch(signInGoogle())
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( SignIn )