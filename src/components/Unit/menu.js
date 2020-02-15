import React from "react";

class UnitlMenu extends React.Component{
    render(){
        return(
            <>
            
            <div className="TC_UnitlMenu">
                    <i className="material-icons waves-effect" >
                        volume_up
                        <audio id="audio"/>
                    </i>                                          
                    <i className="socket waves-effect" >
                        <div className="record" ></div>
                    </i>
                    <i className="material-icons waves-effect" >play_arrow</i>             
                </div> 
               
            </>           
        )
    }
}
export default UnitlMenu