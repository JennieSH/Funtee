import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';
// import { createStore, combineReducers } from 'redux';
// import { connect, Provider } from 'react-redux';
import Header from "./component/header"
import Homepage from "./component/homepage"
import "./css/common.css";
import "./css/homepage.css";
class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {isLoading:true};
    }

    render(){
        if (this.state.isLoading === false){
            return <div>loading</div>
        }else{
            return(
                // <Provider store={store}>
                    <BrowserRouter>                      
                        <Header/>
                        <Homepage/>
                    </BrowserRouter>
                // </Provider>
            )
        }     
    }
}

ReactDOM.render(<App/>, document.querySelector("#root"));





































// click >> change Link to {new url} >> Route renders the component according to the path 
// HashRouter : # 後的所有字串都不會發GET請求到server端 ( Link 組件中的 to 會改變網址，但不會刷新頁面 )

// <Route exact path="/" component={Content}/> : 一般寫法 ( 加入 exact 就會進行嚴格比對 path )
// <Route exact path="/" render={(props) => <Content {...this.props} isAuthed={true} path="/"/>}/> : pass props via <Route>




// // Redux
// let store;
// let reducer = function(state,action){
//     switch(action.type){
//         default:
//             return state;
//     }
// }
// store=Redux.createStore(reducer, {isLoading:false});
