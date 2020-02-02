import React from "react";
import { connect } from "react-redux";
import TC_Symobol_grand from "./TC_Symbol_grand";

const TC_Symobol_child = ({ data }) =>{
    // console.log(data)
    return(

        <div>
            { data && data.map((each,index)=>{
                return(
                    <TC_Symobol_grand data={each} key={index}/>
                )
            })}

            
        </div>
    )
}

export default TC_Symobol_child