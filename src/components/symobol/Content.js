import React from "react";


class TC_SymobolContent extends React.Component{

    render(){     
        return(
            <div className="TC_SymobolContent">
                <div className="ContentImg">
                    <div>img</div>
                    <div className="TC_SymobolExample_M">ㄅ</div>
                </div>
                <div className="ContentImgDetail">
                    <span>注音</span>
                    <span>國字</span>
                    <span>拼音</span>
                    <span>英文</span>
                </div>
                <div className="TC_SymobolMenu">
                    <img/>
                    <img/>
                    <img/>
                </div>
                    
            </div>
        )
    }
}

export default TC_SymobolContent