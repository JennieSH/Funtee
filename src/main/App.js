import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Router
import Homepage from "./Homepage";
import Category from "./Category";
import TC_Category from "./TC_Category";
import TC_Symbol from "./TC_Symbol";
import TC_Unit from "./TC_Unit";
import TC_UnitCategory from "./TC_UnitCategory";
import FC_Collection from "./FC_Collection";
import FC_Card from "./FC_Card";
import FC_Category from "./FC_Category";
import FC_Spelling from "./FC_Spelling";
import SignIn from "../components/common/auth/signIn";
import SignUp from "../components/common/auth/signUp";
import ResetPassword from "../components/common/auth/resetPassword";
// test 
import TC_Symbol_test from "./TC_Symbol_test";
import AudioData from "../components/data/audioData";
import SymbolData from "../components/data/symbolData";



class App extends React.Component{

    render(){
       
        return(              
            <BrowserRouter>       
               <Route exact path="/" component={Homepage}/>
               <Route path="/signin" component={SignIn}/> 
               <Route path="/signup" component={SignUp}/>
               <Route path="/resetpassword" component={ResetPassword}/>   
                 
               <Route path="/category" component={Category}/>                                       
               <Route path="/learning" component={TC_Category}/>
               <Route path="/symbol" component={TC_Symbol}/>            
               <Route path="/units" component={TC_UnitCategory}/>
               <Route path="/vocabulary" component={TC_Unit}/>

               <Route path="/flashcard" component={TC_Symbol_test}/>
               <Route path="/flashcard/Collection" component={FC_Collection}/>
               <Route path="/flashcard/card" component={FC_Card}/>       
               <Route path="/flashcard/spelling" component={FC_Spelling}/>
            </BrowserRouter>
        )    
    }
}



export default App