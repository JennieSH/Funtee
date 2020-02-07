import React from "react";
import { Link } from "react-router-dom";
import "../css/homepage.css";
import Header from "../components/common/header";
import Banner from "../imgs/Banner.png";
import BB from "../imgs/BB.jpg";


class Homepage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            auth:null
        }
    }

    render(){   
        if (this.state.auth === null){
            return(
                <>
                    <Header/>
                    <div className="homepageContainer">
                        {/* <img src={BB} className="banner"/> */}
                        <Link to="/signin"><button>SIGNIN</button></Link>
                        <Link to="/category"><button>Guest</button></Link>
                    </div>          
                </>
            )
         }else{   
            return(
                <>
                    <Header/>
                    <div className="homepageContainer">
                        {/* <img src={BB}  className="banner"/>  */}
                        <div>hello</div>
                        <Link to="/category"><button>Start now</button></Link>
                    </div>               
                </>               
            )
        }
    }
}

export default Homepage