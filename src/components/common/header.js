import React from "react";
import { Link } from 'react-router-dom';
import "../../css/common.css";


class Header extends React.Component{
    render(){
        return(
            <header>
                <div><Link to="/">DAWAN</Link></div>   
                <input type="checkbox" name="" id="menu_control"/>
                <label htmlFor="menu_control" className="menuBtn">
                        <div className="lineContainer">
                            <span className="line line-first"></span>
                            <span className="line line-second"></span>
                            <span className="line line-third"></span>
                        </div>  
                </label>
                <nav>
                    <div><Link to="/learning">Learning Chinese</Link></div>
                    <div><Link to="/flashcard">Flash Card</Link></div>
                    <div>Log In</div>
                    <div>Language</div>
                </nav>    
            </header>
        )
    }
}

export default Header