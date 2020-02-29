import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authActions";
import firebase from 'firebase/app';
import Header from "../header";
import  "../../../css/auth.css";
import facebook from "../../../imgs/facebook.jpg";
import google from "../../../imgs/google.jpg";





class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state={
            email:null,
            password:null,
        }

    }

    handleChange(e){
        this.setState({
            [ e.currentTarget.id ] : e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();

        if ( this.state.email === null ){
            alert("請輸入信箱")
        }else if( this.state.password === null ){
            alert("請輸密碼")
        }else if ( this.state.password.trim().length < 6 ){
            alert("密碼至少六個字");         
        }else{
            this.props.signIn(this.state)            
        }
    }

   
  
    FB_Redirect(){
        let providerF = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(providerF).then(function(result) {
            // let token = result.credential.accessToken;      
            let user = result.user;    
        
          })
    }


    GO_Redirect(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            let token = result.credential.accessToken;      
            let user = result.user;
          })
    }


    render(){
        const { authError } = this.props;
        if( this.props.auth.uid )return <Redirect to="/"/>
        return(
            <>
                <Header/>  
                <div className="AuthContainer">            
                    <form onSubmit={ this.handleSubmit.bind(this) } className="authForm" id="authFormIn"> 

                        <div className="input-field">
                            <label htmlFor="email">Email</label>        
                            <input onChange={ this.handleChange.bind(this) } type="email"id="email" />
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>        
                            <input onChange={ this.handleChange.bind(this) } type="password" id="password" />
                        </div>

                        { authError ? <h4 className="red-text center">{ authError }</h4> : null }
                        
                        
                        <div className="authSignBtn">                     
                            <button className="waves-effect"> SIGN IN</button>
                            <Link to="/signup"><button className="waves-effect">SIGN UP</button></Link>
                        </div>
                        <div className="authMethod">                
                            <img src={ facebook }  onClick={ this.FB_Redirect.bind(this) }/>     
                            <img src={ google } onClick={ this.GO_Redirect.bind(this) }/>
                            <Link to="/resetpassword"><h5 className="right-align grey-text">FORGOT  PASSWORD ></h5></Link>
                        </div>

                    </form>
               
                    
                  
                </div>
            </> 
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
        signIn : (creds) => dispatch(signIn(creds))
    }
}
export default connect( mapStateToProps, mapDispatchToProps)( SignIn )