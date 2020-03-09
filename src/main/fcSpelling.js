import React from "react";
// import "../css/spelling.css";
import { Link, Redirect } from "react-router-dom";
// import facebook from "../../../imgs/facebook.jpg";
// import google from "../../../imgs/google.jpg";
import Header from "../components/common/header";
class FC_Spelling extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signIn:true,

        }
    }


    handleToggleIn_M(){
        document.getElementById("auth").classList.remove("active");
    }
    handleToggleUp_M(){
        document.getElementById("auth").classList.add("active")
    }

    handleToggleIn_W(){
        document.getElementById("authCover").classList.remove("active");
        this.setState({
            signIn:true
        })
    }
    handleToggleUp_W(){
        document.getElementById("authCover").classList.add("active");
        this.setState({
            signIn:false
        })
    }

    render() {
      
        return (

            <>
            <Header/>
            <div className="authContainer">
                <div className="authMenu">



                    <div className="authBg">
                        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60"/>
                    </div>

                    <div className="auth" id="auth">
                            <div className="authCover" id="authCover">

                                <div className="auth_in_info" style={{display: this.state.signIn? "none": "block" }}>
                                    <h3>Welcome Back</h3>
                                    <p>To keep connected with us please login with your personal information.</p>
                                    <button className="signInBottom" onClick={this.handleToggleIn_W.bind(this)}>SIGN IN</button>
                                </div>
                                
                                <div className="auth_up_info" style={{display: this.state.signIn ? "block" : "none" }}>
                                    <h3>Hello, Guest</h3>
                                    <p>Enter your personal details and create your own flash cards.</p>
                                    <button className="signUpBottom" onClick={this.handleToggleUp_W.bind(this)}>SIGN UP</button>
                                </div>

                            </div>






                            <div className="signIn">            
                                <form  className="authForm" id="authFormIn"> 
                                    <div className="input-field">
                                        <label htmlFor="email">Email</label>        
                                        <input  type="email"id="email" />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="password">Password</label>        
                                        <input  type="password" id="password" />
                                    </div>
                                 
                                    {/* { authError ? <h4 className="red-text center">{ authError }</h4> : null } */}
                                    
                                    
                                    <div className="authSignBtn">                     
                                        <button className="waves-effect waves-light"> SIGN IN</button>
                                    </div>
                                    <div className="authMethod">                
                                        <img />     
                                        <img />
                                        <Link to="/resetpassword"><h5 className="right-align grey-text">FORGOT  PASSWORD ></h5></Link>
                                    </div>

                                </form>    
                            </div>

                            
                            
                            
                            <div className="signUp">
                                <form className="authForm up">
                                    <div className="input-field">
                                        <label htmlFor="name">Name</label>  
                                        <input type="text" id="name"/>  
                                    </div> 
                                    <div className="input-field">
                                        <label htmlFor="email">Email</label>  
                                        <input type="email" id="email"/> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="password">Password</label>  
                                        <input type="password" id="password"/>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="confirmPassword">Confirm Password</label>  
                                        <input  type="password" id="confirmPassword"/>
                                    </div>
                                    {/* { authError ? <h4  className="red-text center">{authError}</h4> : null } */}
                                    <div className="authSignBtn">                                 
                                        <button className="waves-effect waves-light"> SIGN UP</button>                          
                                    </div>                   
                                </form>
                            </div>
                            

                    </div>

                    <div className="authMobileContainer">
                        <div className="authMobile">
                            <div className="authMobile_Btn">
                                <button className="signInBottom" onClick={this.handleToggleIn_M.bind(this)}>SIGN IN</button>   
                                <button className="signUpBottom" onClick={this.handleToggleUp_M.bind(this)}>SIGN UP</button>
                            </div>
                        </div>
                    </div>     




                </div>
            </div>
                    </>
           
        );
    }
  }


export default FC_Spelling
