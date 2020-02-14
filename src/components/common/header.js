// // import React from "react";
// // import { Link } from 'react-router-dom';
// // import { connect } from "react-redux";
// // import { signOut } from "../../store/actions/authActions";
// // import "../../css/common.css";


// // class Header extends React.Component{

// //     clickSignOut(){
// //         let checkSignOut=confirm("Do you want to Sign out")
// //         if ( checkSignOut ){
// //             this.props.signOut();
// //         }
// //     }

// //     render(){
// //         let  authSignAction; 
// //         if( this.props.authState ){
// //             authSignAction= <div onClick={ this.clickSignOut.bind(this) }>Sign Out</div>        
// //         }else{
// //             authSignAction = <div><Link to="/signin">Sign In</Link></div>        
// //         }

// //         return(
// //             <header>
// //                 <div><Link to="/">DAWAN</Link></div>   
// //                 <input type="checkbox" name="" id="menu_control"/>
// //                 <label htmlFor="menu_control" className="menuBtn">
// //                         <div className="lineContainer">
// //                             <span className="line line-first"></span>
// //                             <span className="line line-second"></span>
// //                             <span className="line line-third"></span>
// //                         </div>  
// //                 </label>
// //                 <nav>
// //                     <div><Link to="/learning">Learning Chinese</Link></div>
// //                     <div><Link to="/flashcard">Flash Card</Link></div>
// //                     { authSignAction }
// //                     <div>Language</div>
// //                 </nav>    
// //             </header>
// //         )
// //     }
// // }
// // const mapStateToProps = ( state ) => {
// //     // console.log(state.firebase.auth.uid)
// //     return{
// //         authState : state.firebase.auth.uid
// //     }
// // }
// // const mapDispatchToProps = ( dispatch ) => {
// //     return{
// //         signOut : ()=> dispatch(signOut())
// //     }
// // }
// // export default connect( mapStateToProps, mapDispatchToProps )( Header )


// import React from "react";
// import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
// import { signOut } from "../../store/actions/authActions";
// import "../../css/common.css";


// class Header extends React.Component{

//     clickSignOut(){
//         let checkSignOut=confirm("Do you want to Sign out")
//         if ( checkSignOut ){
//             this.props.signOut();
//         }
//     }

//     render(){
//         let  authSignAction; 
//         if( this.props.authState ){
//             authSignAction= <div onClick={ this.clickSignOut.bind(this) }>Sign Out</div>        
//         }else{
//             authSignAction = <div><Link to="/signin">Sign In</Link></div>        
//         }

//         return(
//             <header>
//                 <div><Link to="/">DAWAN</Link></div>   
//                 <input type="checkbox" name="" id="menu_control"/>
//                 <label htmlFor="menu_control" className="menuBtn">
//                         <div className="lineContainer">
//                             <span className="line line-first"></span>
//                             <span className="line line-second"></span>
//                             <span className="line line-third"></span>
//                         </div>  
//                 </label>
//                 <nav>
//                     <div><Link to="/learning">Learning Chinese</Link></div>
//                     <div><Link to="/flashcard">Flash Card</Link></div>
//                     { authSignAction }
//                     <div>Language</div>
//                 </nav>    
//             </header>
//         )
//     }
// }
// const mapStateToProps = ( state ) => {
//     // console.log(state.firebase.auth.uid)
//     return{
//         authState : state.firebase.auth.uid
//     }
// }
// const mapDispatchToProps = ( dispatch ) => {
//     return{
//         signOut : ()=> dispatch(signOut())
//     }
// }
// export default connect( mapStateToProps, mapDispatchToProps )( Header )



// import React from "react";
// import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
// import { signOut } from "../../store/actions/authActions";
// import "../../css/common.css";


// class Header extends React.Component{

//     clickSignOut(){
//         let checkSignOut=confirm("Do you want to Sign out")
//         if ( checkSignOut ){
//             this.props.signOut();
//         }
//     }

//     render(){
//         let  authSignAction; 
//         if( this.props.authState ){
//             authSignAction= <div onClick={ this.clickSignOut.bind(this) }>Sign Out</div>        
//         }else{
//             authSignAction = <div><Link to="/signin">Sign In</Link></div>        
//         }

//         return(
//             <header>
//                 <div><Link to="/">DAWAN</Link></div>   
//                 <input type="checkbox" name="" id="menu_control"/>
//                 <label htmlFor="menu_control" className="menuBtn">
//                         <div className="lineContainer">
//                             <span className="line line-first"></span>
//                             <span className="line line-second"></span>
//                             <span className="line line-third"></span>
//                         </div>  
//                 </label>
//                 <nav>
//                     <div><Link to="/learning">Learning Chinese</Link></div>
//                     <div><Link to="/flashcard">Flash Card</Link></div>
//                     { authSignAction }
//                     <div>Language</div>
//                 </nav>    
//             </header>
//         )
//     }
// }
// const mapStateToProps = ( state ) => {
//     // console.log(state.firebase.auth.uid)
//     return{
//         authState : state.firebase.auth.uid
//     }
// }
// const mapDispatchToProps = ( dispatch ) => {
//     return{
//         signOut : ()=> dispatch(signOut())
//     }
// }
// export default connect( mapStateToProps, mapDispatchToProps )( Header )


import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import "../../css/common.css";
import language from "../../imgs/language_nav.png";
import flashcard from "../../imgs/flashcard.png";
import signin from "../../imgs/signin.png";
import languageNav from "../../imgs/language.png";
import M from "materialize-css";

import BT from "../../imgs/BT.png";


class Header extends React.Component{

    // componentDidMount() {
    //     let sidenav = document.querySelectorAll(".sidenav");
    //     M.Sidenav.init(sidenav, {});
        
    // }

    handleSignOut(){
        let checkSignOut=confirm("Do you want to Sign out")
        if ( checkSignOut ){
            this.props.signOut();
        }
    }

    render(){
        let  authSignAction; 
        if( this.props.authState ){
            authSignAction= <Link to="/" onClick={ this.handleSignOut.bind(this) }><img src={ signin } className="navImgs"/>Sign Out</Link>     
        }else{
            authSignAction = <Link to="/signin"><img src={ signin } className="navImgs"/>Sign In</Link>       
        }

        return(
            <header>

                <nav className="nav-wrapper">
                    <div className="container">
                        <Link to="/" className="brand-logo">FUNTEE</Link>

                        <input type="checkbox" name="" id="menu_control"/>
                        <label htmlFor="menu_control" className="menuBtn">
                            <div className="lineContainer">
                                <span className="line line-first"></span>
                                <span className="line line-second"></span>
                                <span className="line line-third"></span>
                            </div>  
                        </label>

                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/learning">Learning Chinese</Link></li>
                            <li><Link to="/flashcard">Flash Card</Link></li>
                            <li>{ authSignAction }</li>
                            <li><a>Language</a></li>
                            <li><Link to="/" className="btn btn-floating teal"><img className="a" src={ BT } /></Link></li>
                        </ul>

                        <ul className="sidenav grey lighten-3 right" id="mobile-menu">
                            <li>
                                <Link to="/" className="btn btn-floating teal">
                                    <img className="usrImgs" src={ BT }/>
                                </Link>
                            </li>
                            <hr/>
                            <li><Link to="/learning"><img src={ languageNav } className="navImgs"/>Learning Chinese</Link></li>
                            <li><Link to="/flashcard"><img src={ flashcard } className="navImgs"/>Flash Card</Link></li>
                            <li>{ authSignAction }</li>
                            <li><a><img src={ language } className="navImgs"/>Language</a>
                            </li>
                        </ul>           
                    </div>
                </nav> 





            </header>
        )
    }
}
const mapStateToProps = ( state ) => {
    // console.log(state.firebase.auth.uid)
    return{
        authState : state.firebase.auth.uid
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        signOut : ()=> dispatch(signOut())
    }
}
export default connect( mapStateToProps, mapDispatchToProps )( Header )
