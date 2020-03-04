import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {  signUp } from "../../../store/actions/authActions";


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : null,
            email : null,
            password : null,
            confirmPassword : null,
            blankName : false,
            blankEmail : false,
            blankPassword : false,
            blankConfirmPassword : false
        }
    }

    handleChange(e){
        this.setState({
            [e.currentTarget.name]:e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        
        if ( this.state.name === null ){
            this.setState({
                blankName : true
            })
        }else if( this.state.email === null ){
            this.setState({
                blankName : false,
                blankEmail : true

            })
        }else if ( this.state.password === null){
            this.setState({
                blankEmail : false,
                blankPassword : true
            })        
        }else if( this.state.password !== this.state.confirmPassword){
            this.setState({
                blankPassword : false,
                blankConfirmPassword : true
            })  
        }else{
            this.setState({
                blankConfirmPassword : false
            }) 
            this.props.signUp(this.state)
        }
    }
    
    render(){  
        const { authError, auth } = this.props;
        if( auth.uid )return <Redirect to="/"/>       
        return(
            <Fragment>          
                    <form onSubmit={ this.handleSubmit.bind(this) } className="authForm up">
                        <div className="input-field">
                            <label htmlFor="name">Name</label>  
                            <input onChange={ this.handleChange.bind(this) } type="text" id="newName" name="name"/>
                            { this.state.blankName? <h4>Please enter your name</h4> : null }
                        </div> 
                        <div className="input-field">
                            <label htmlFor="email">Email</label>  
                            <input onChange={ this.handleChange.bind(this) } type="email" id="newEmail" name="email"/>
                            { this.state.blankEmail? <h4>Please enter your Email</h4> : null }
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>  
                            <input onChange={ this.handleChange.bind(this) } type="password" id="newPassword" name="password"/>
                            { this.state.blankPassword? <h4>Please enter your password</h4> : null }
                        </div>
                        <div className="input-field">
                            <label htmlFor="confirmPassword">Confirm Password</label>  
                            <input onChange={ this.handleChange.bind(this) } type="password" id="confirmPassword" name="confirmPassword"/>
                            { this.state.blankConfirmPassword? <h4>Please enter your password again</h4> : null }
                        </div>
                       { authError ? <h4>{authError}</h4> : null }
                       <div className="authSignBtn">         
                            <button className="waves-effect"> SIGN UP</button>
                           
                        </div>
                   
                    </form>
            </Fragment> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        authError: state.auth.signUpError,
        auth : state.firebase.auth
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        signUp: ( userInfo ) => dispatch( signUp(userInfo) )
    }
} 

export default connect( mapStateToProps, mapDispatchToProps )( SignUp )