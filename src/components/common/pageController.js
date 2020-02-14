import React from "react";
import "../../css/common.css";


class PageController extends React.Component{

    handleRecord(){
        console.log("last")
    }
   
    render(){      
        return(
            <>
              <div className="pageController">
                            <span onClick={ this.handleRecord.bind(this)}>＜</span>
                            {/* <span>＞</span> */}
                    </div>
            </>
        )
    }
}

export default PageController