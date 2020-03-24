import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Router
import Homepage from "./Homepage";
import Category from "./Category";
import TcCategory from "./TcCategory";
import TcSymbol from "./TcSymbol";
import TcLesson from "./TcLesson";
import TcLessonTw from "./TcLessonTw";
import TcLessonCategory from "./TcLessonCategory";
import TcLessonCategoryTw from "./TcLessonCategoryTw"

import FcCategory from "./FcCategory";
import FcCollection from "./FcCollection";
import FcMarkCollection from "./FcMarkCollection";
import FcCard from "./FcCard";
import FcMarkCard from "./FcMarkCard";
// import FcSpelling from "./fcSpelling"; // next version
import Account from "./account";
import ResetPassword from "../components/common/auth/ResetPassword"; 
// for test 
// import Dictionary from "../components/common/dictionary"

class App extends React.Component{
    render(){    
        return(              
            <BrowserRouter>  
               <Route exact path="/" component={ Homepage }/>
               <Route path="/signin" component={ Account }/> 
               <Route path="/resetpassword" component={ ResetPassword }/>   
                 
               <Route path="/category" component={ Category }/>                                       
               <Route path="/topics" component={ TcCategory }/>
               <Route path="/symbol" component={ TcSymbol }/>            
               <Route path="/lessons" component={ TcLessonCategory }/>
               <Route path="/lessonstw" component={ TcLessonCategoryTw }/>
               <Route path="/vocabulary" component={ TcLesson }/>
               <Route path="/vocabularytw" component={ TcLessonTw }/>

               <Route path="/flashcard" component={ FcCategory }/>
               <Route path="/collection/:title" component={ FcCollection }/>
               <Route path="/markcollection" component={ FcMarkCollection }/>
               <Route path="/card/:title/:index/:key" component={ FcCard }/>       
               <Route path="/markcard/:index" component={ FcMarkCard }/>    
               {/* <Route path="/spelling" component={ FcSpelling }/> */}
            </BrowserRouter>
        )    
    }
}


export default App