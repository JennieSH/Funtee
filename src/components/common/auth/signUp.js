import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {  signUp } from "../../../store/actions/authActions";
import "../../../css/common.css";
import Header from "../header";
import BB from "../../../imgs/BB.jpg";



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
        const { authError } = this.props       
        return(
            <>
                <Header/>  
                {/* <img src={BB} className="banner"/> */}
                <div className="AuthContainer">
                    
                    <form onSubmit={ this.handleSubmit.bind(this) } className="authForm">       
                        <input onChange={ this.handleChange.bind(this) } type="text" placeholder="Name" id="name"/>  
                        <input onChange={ this.handleChange.bind(this) } type="email" placeholder="Email"id="email"/>                            
                        <input onChange={ this.handleChange.bind(this) } type="password" placeholder="Password" id="password"/>
                        <input onChange={ this.handleChange.bind(this) } type="password" placeholder="Confirm Password" id="confirmPassword"/>
                       { authError ? <h5>{authError}</h5> : null }
                        <button> SIGN UP </button>
                    </form>

               
                    <Link to="/signin"><button>SIGN IN</button></Link> 
                   
                </div>
            </> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    console.log(state)  
    return{
        authError: state.auth.authError
    }
}


const mapDispatchToProps = ( dispatch ) => {
    return{
        signUp: ( userInfo ) => dispatch( signUp(userInfo) )
    }
} 

export default connect( mapStateToProps, mapDispatchToProps )( SignUp )