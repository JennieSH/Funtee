import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../css/homepage.css";
import Header from "../components/common/header";
import BT from "../imgs/BT.png";


class Homepage extends React.Component{

    render(){   
        if (this.props.auth.uid === undefined){
            return(
                <>
                    <Header/>
                    <div className="homepageContainer">
                       <div className="container">
                            <h1>Welcome</h1>
                            <Link to="/signin"><button className="waves-effect waves-light btn">SIGN IN</button></Link>
                            <Link to="/topics"><button className="waves-effect waves-light btn">Guest</button></Link>
                        </div>
                    </div>          
                </>
            )
         }else{   
            return(
                <>
                    <Header/>
                    <div className="homepageContainer">
                        <div className="container">
                                <h1>Hello !</h1>
                                <div><img src={BT}/></div>
                                <Link to="/category"><button className="waves-effect waves-light btn">Start</button></Link>          
                        </div>
                       
                    </div>               
                </>               
            )
        }
    }
}

const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(Homepage)