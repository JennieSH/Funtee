import React from "react";
import Header from "../components/header";
import "../css/TC_Symobol.css";
import WritingBoard from "../components/symobol/writingBoard";
import TC_SymobolContent from "../components/symobol/Content";
class TC_Symobol extends React.Component{


    

    render(){
       
        return(
            <>
                <Header/>
                <div className="TC_SymobolContainer">

                    <TC_SymobolContent/>
                    <div className="TC_SymobolExample_W"/>
                    <WritingBoard/>
                    <div className="controlPage_M">
                            <span>＜</span>
                            <span>＞</span>
                    </div> 
                </div>
            </>
        )
    }
}


export default TC_Symobol