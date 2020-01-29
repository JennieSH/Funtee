import React from "react";
import {Route, Link} from 'react-router-dom';
// import Homepage from "./homepage"



class Header extends React.Component{
    render(){
        return(
            <header>
                <div>DAWAN</div>   
                {/* <div><Link to="/">DAWAN</Link></div>    */}
                <input type="checkbox" name="" id="menu_control"/>
                <label htmlFor="menu_control" className="menuBtn">
                        <div className="lineContainer">
                            <span className="line line-first"></span>
                            <span className="line line-second"></span>
                            <span className="line line-third"></span>
                        </div>  
                </label>
                <nav>
                    {/* <div><Link to="/Learning">Learning Chinese</Link></div>
                    <div><Link to="/Vocabulary">Flash Card</Link></div> */}
                    <div>Learning Mandarin</div>
                    <div>Flash Card</div>
                    <div>Log In</div>
                    <div>Language</div>
                </nav>
                <span className="bgImg">
                    <img src="https://live.staticflickr.com/5761/21920201841_7a39d248aa_k.jpg"/>
                </span>

                {/* <Route exact path="/"  render={(props) => <Homepage {...this.props} isAuthed={true} path="/"/>}/> */}
                {/* <Route exact path="/Learning" render={<Learning/>}/>
                <Route exact path="/Vocabulary" render={<Vocabulary/>}/> */}

            </header>
        )
    }
}

export default Header