import React from "react";

class Loading extends React.Component{

    render(){

        return(
            <div className="loadingContainer">
                <div className="loading">
                    <div className="binding"></div>
                    <div className="pad">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                    </div>
                    <div className="text">
                        Loading
                    </div>
                </div>
            </div>
        )
    }

}
export default Loading