import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Router
import Homepage from "./homepage";
import Category from "./category";
import TcCategory from "./tcCategory";
import TcSymbol from "./tcSymbol";
import TcLesson from "./tcLesson";
import TcLessonTw from "./tcLessonTw";
import TcLessonCategory from "./tcLessonCategory";
import TcLessonCategoryTw from "./tcLessonCategoryTw"

import FcCategory from "./fcCategory";
import FcCollection from "./fcCollection";
import FcMyCollection from "./fcMyCollection";
import FcCard from "./fcCard";
import FcMyCard from "./fcMyCard";
// import FC_Spelling from "./fcSpelling"; // next version
import Account from "./account";
import ResetPassword from "../components/common/auth/resetPassword"; 
// for test 
// import AudioData from "../components/data/audioData";
// import SymbolData from "../components/data/symbolData";
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
               <Route path="/mycollection" component={ FcMyCollection }/>
               <Route path="/card/:title/:index/:key" component={ FcCard }/>       
               <Route path="/mycard/:index" component={ FcMyCard }/>    
               {/* <Route path="/spelling" component={ FC_Spelling }/> */}
            </BrowserRouter>
        )    
    }
}


export default App