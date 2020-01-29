import React from "react";


class Header extends React.Component{

    constructor(props) {
        super(props);
        
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.hi = this.hi.bind(this);
      }
    hi(){
        alert("ddd")}

    render(){
        return(
            <header>
                <div>LOGO</div>   
                <input type="checkbox" name="" id="menu_control"/>
                <label htmlFor="menu_control" className="menuBtn">
                        <div className="lineContainer">
                            <span className="line line-first"></span>
                            <span className="line line-second"></span>
                            <span className="line line-third"></span>
                        </div>  
                </label>
                <nav>
                    <div onClick={this.hi}>chinese</div>
                    <div>flash card</div>
                    <div>log in</div>
                    <div>language</div>
                </nav>
            </header>
        )
    }
}

export default Header