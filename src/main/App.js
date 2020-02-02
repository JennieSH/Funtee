import React from 'react';
import {BrowserRouter, Route, HashRouter} from 'react-router-dom';
// Router
import Homepage from "./Homepage";
import TC_Catalog from "./TC_Catalog";
import TC_Symobol from "./TC_Symbol";
import TC_Unit from "./TC_Unit";
import TC_UnitCatalog from "./TC_UnitCatalog";
import FC_Collection from "./FC_Collection";
import FC_Card from "./FC_Card";
import FC_Catalog from "./FC_Catalog";
import FC_Spelling from "./FC_Spelling";
// Firebase
import firebase from "firebase/app";
import firebaseConfig from "../components/firebase/firebaseConfig";

import TC_Symbol_test from "./TC_Symbol_test";



class App extends React.Component{

    render(){
       
        return(              
            <HashRouter>                      
               <Route exact path="/" component={Homepage}/>
               
               <Route path="/learning" component={TC_Catalog}/>
               <Route path="/symobol" component={TC_Symobol}/>            
               <Route path="/units" component={TC_UnitCatalog}/>
               <Route path="/vocabulary" component={TC_Unit}/>

               <Route path="/flashcard" component={TC_Symbol_test}/>
               <Route path="/flashcard/Collection" component={FC_Collection}/>
               <Route path="/flashcard/card" component={FC_Card}/>       
               <Route path="/flashcard/spelling" component={FC_Spelling}/>
            </HashRouter>
        )    
    }
}

export default App;