import React from "react";


class Tool extends React.Component{
    render(){
        const text = [
            {
                icon : "record_voice_over",
                title : "Text To Speech",
                inner : "We provide standard pronunciations in any language"
            },
            {
                icon : "mic",
                title : "Record",
                inner : "It allows you to record your voice and compare with Google pronunciation quickly."
            },
            {
                icon : "edit",
                title : "Writing Board",
                inner : "Writing Board is the best way to learning how to write the correct character."
            },
        ]
        return(
            text.map((tool, index)=>                       
                <div className="tool card" key={index}>
                    <div className="card-image" >             
                        <i className="material-icons">{tool.icon}</i> 
                    </div>
                    <div className="card-content">
                        <span className="card-title center ">{tool.title}</span>
                        <p>{tool.inner}</p>
                    </div>                      
                </div>    
            )
        )         
    }
}
export default Tool