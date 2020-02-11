import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {  signUp } from "../../../store/actions/authActions";
import "../../../css/common.css";
import Header from "../header";
import  "../../../css/auth.css";



class SignUp extends React.Component{


    constructor(props){
        super(props);
        this.state={
            name:null,
            email:null,
            password:null,
            confirmPassword:null
        }
    }

    handleChange(e){
        this.setState({
            [e.currentTarget.id]:e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        
        if ( this.state.name === null ){
            alert("請輸入name")
        }else if( this.state.email === null ){
            alert("請輸email")
        }else if ( this.state.password === null){
            alert("請輸pw");         
        }else if( this.state.password !== this.state.confirmPassword){
            alert("Wrong password.")
            
        }else{
            this.props.signUp(this.state)
        }
    }
    

    render(){  
        const { authError, auth } = this.props;
        if( auth.uid )return <Redirect to="/"/>       
        return(
            <>
                <Header/>  
                {/* <img src={BB} className="banner"/> */}
                <div className="AuthContainer">
                <div className="container">
                    <form onSubmit={ this.handleSubmit.bind(this) } className="authForm up">
                        <div className="input-field">
                            <label htmlFor="name">Name</label>  
                            <input onChange={ this.handleChange.bind(this) } type="text" id="name"/>  
                        </div> 
                        <div className="input-field">
                            <label htmlFor="email">Email</label>  
                            <input onChange={ this.handleChange.bind(this) } type="email" id="email"/> 
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>  
                            <input onChange={ this.handleChange.bind(this) } type="password" id="password"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="confirmPassword">Confirm Password</label>  
                            <input onChange={ this.handleChange.bind(this) } type="password" id="confirmPassword"/>
                        </div>
                       { authError ? <h4  className="red-text center">{authError}</h4> : null }
                       <div className="authSignBtn"> 
                            <Link to="/signin"><button className="waves-effect">SIGN IN</button></Link>             
                            <button className="waves-effect"> SIGN UP</button>
                           
                        </div>
                   
                    </form>

                </div>    
                   
                   
                </div>
            </> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    console.log(state)  
    return{
        authError: state.auth.authError,
        auth : state.firebase.auth
    }
}


const mapDispatchToProps = ( dispatch ) => {
    return{
        signUp: ( userInfo ) => dispatch( signUp(userInfo) )
    }
} 

export default connect( mapStateToProps, mapDispatchToProps )( SignUp )