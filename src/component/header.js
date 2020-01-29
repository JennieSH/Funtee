import React from "react";


class Header extends React.Component{
    render(){
        return(
            <header>
                <div>DAWAN</div>   
                <input type="checkbox" name="" id="menu_control"/>
                <label htmlFor="menu_control" className="menuBtn">
                        <div className="lineContainer">
                            <span className="line line-first"></span>
                            <span className="line line-second"></span>
                            <span className="line line-third"></span>
                        </div>  
                </label>
                <nav>
                    <div>Learning Chinese</div>
                    <div>Flash Card</div>
                    <div>Log In</div>
                    <div>Language</div>
                </nav>
                <span className="bgImg">
                    <img src="https://live.staticflickr.com/5761/21920201841_7a39d248aa_k.jpg"/>
                </span>
            </header>
        )
    }
}

export default Header