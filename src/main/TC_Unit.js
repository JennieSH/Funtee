import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "../components/header"
import "../css/TC_Unit.css";


class TC_Unit extends React.Component{
    render(){
        return(
            <>
                <Header/>
                <div className="TC_UnitContainer">
                    <div className="unitImg"><img/></div>
                    <ul>
                        <li>ㄌㄢˊ ㄙㄜˋ</li>
                        <li>lán sè</li>
                        <li>藍色</li>
                        <li>Blue</li>
                    </ul>
                    <div className="controlPage_M">
                        <span>＜</span>
                        <span>＞</span>
                    </div> 
  
                    <div className="controlMenu">                 
                        <div>撥放</div>
                        <div>錄音</div>
                        <div>回放</div>
                        <div>複製</div>
                        <div className="controlPage_W">←</div>
                        <div className="controlPage_W">→</div>
                    </div>                   
                    
                </div>
            </>
            
        )
    }
}

export default TC_Unit