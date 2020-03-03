import React from "react";
import { Link } from "react-router-dom";

class Guest extends React.Component{
    render(){ 
        return(
           <>
                <Link to="/signin"><button className="member waves-effect waves-light btn">SIGN IN</button></Link>
                <Link to="/topics"><button className="guest waves-effect waves-light btn">GUEST</button></Link> 
           </>
        )         
    }
}

class Member extends React.Component{
    render(){
      
        return(
           <>
                <Link to="/category"><button className="member waves-effect waves-light btn">LESSON</button></Link>
                <Link to="/flashcard"><button className="guest waves-effect waves-light btn">CARDS</button></Link> 

           </>
        )         
    }
}
export { Guest, Member }