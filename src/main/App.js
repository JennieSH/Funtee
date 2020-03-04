import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Router
import Homepage from "./Homepage";
import Category from "./Category";
import TC_Category from "./TC_Category";
import TC_Symbol from "./TC_Symbol";
import TC_Unit from "./TC_Unit";
import TC_UnitTw from "./TC_UnitTw";
import TC_UnitCategory from "./TC_UnitCategory";
import TC_UnitCategory_TW from "./TC_UnitCategory_Tw"

import FC_Category from "./FC_Category";
import FC_Collection from "./FC_Collection";
import FC_MyCollection from "./FC_MyCollection";
import FC_Card from "./FC_Card";
import FC_MyCard from "./FC_MyCard";
import FC_Spelling from "./FC_Spelling";
import Account from "./Account";
import ResetPassword from "../components/common/auth/resetPassword";
// test 
import TC_Symbol_test from "./TC_Symbol_test";
import AudioData from "../components/data/audioData";
import SymbolData from "../components/data/symbolData";
import Dictionary from "../components/common/dictionary"


class App extends React.Component{

    render(){    
        return(              
            <BrowserRouter>  
               <Route exact path="/" component={Homepage}/>
               <Route path="/signin" component={Account}/> 
               <Route path="/resetpassword" component={ResetPassword}/>   
                 
               <Route path="/category" component={Category}/>                                       
               <Route path="/topics" component={TC_Category}/>
               <Route path="/symbol" component={TC_Symbol}/>            
               <Route path="/lessons" component={TC_UnitCategory}/>
               <Route path="/lessonstw" component={TC_UnitCategory_TW}/>
               <Route path="/vocabulary" component={TC_Unit}/>
               <Route path="/vocabularytw" component={TC_UnitTw}/>

               <Route path="/flashcard" component={ FC_Category }/>
               <Route path="/collection/:title" component={FC_Collection}/>
               <Route path="/mycollection" component={FC_MyCollection}/>
               <Route path="/card/:title/:index/:key" component={FC_Card}/>       
               <Route path="/mycard/:index" component={FC_MyCard}/>    
               <Route path="/spelling" component={FC_Spelling}/>
            </BrowserRouter>
        )    
    }
}


export default App