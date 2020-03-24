import React, { Fragment } from "react";
import { connect } from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Information from "../components/homepage/Information";
import Tool from "../components/homepage/Tool";
import { Guest, Member } from "../components/homepage/AuthBtn";
import "../css/homepage.css";

class Homepage extends React.Component{

    render(){   
        return(
            <Fragment>        
                <div className="homepageContainer">
                    <Header/>            
                    <div className="bubbleContainer ">
                        <div className="underContainer bubble " ></div>
                        <div className="contentContainer ">
                            <div className="slogan">Making Language Fun and Easy !</div>
                            <div className="authBtn">     
                                { this.props.auth.uid? <Member/> : <Guest/> }               
                            </div>
                        </div> 
                    </div>  
                </div>
                <Information/>  
                <div className="toolContainer">        
                    <Tool/>
                </div>
                <Footer/>  
            </Fragment>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(Homepage)