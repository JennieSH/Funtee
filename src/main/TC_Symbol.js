import React from "react";
import Header from "../components/common/header";
import "../css/TC_Symobol.css";
import WritingBoard from "../components/symobol/writingBoard";
import TC_SymobolContent from "../components/symobol/Content";
import PageController from "../components/common/pageController";


class TC_Symobol extends React.Component{

    componentDidMount(){
        const cvs = document.getElementById("cvs");
        const TC_SymobolContent = document.getElementById("TC_SymobolContent");  
        cvs.height = TC_SymobolContent.offsetHeight;
        cvs.width = TC_SymobolContent.offsetWidth;
        this.screenChange();
    }

    screenChange(){
        window.addEventListener("resize",this.resize);
    }

    resize(){
        location.reload()
    }

    // componentWillUnmount(){
    //     window.removeEventListener("resize",this.resize);

    // }

    render(){ 
        return(
            <>
                <Header/>              
                <div className="TC_SymobolContainer">
                    <TC_SymobolContent/>
                    <WritingBoard/>
                    <PageController/>
                </div>
            </>
        )
    }
}

export default TC_Symobol


