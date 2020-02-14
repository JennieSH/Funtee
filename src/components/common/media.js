import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getSymbolAudio } from "../../store/actions/symbolAction";


class Media extends React.Component{





    handleRead (e){
        console.log("a")
        document.getElementById("a").play()
    }  
    handleRecord (){
        console.log("2")
        // console.log(this.props.symbolAudio.symbolAudioArr[0])   
     }
    handlePlay (){
        console.log("3")
     }    

    render(){  
        
        
        return(
        
            // <div className="TC_SymobolMenu">
            <>
                <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>
                    volume_up
                    {/* { this.props.symbolAudio.symbolAudioArr ? <audio src={this.props.symbolAudio.symbolAudioArr[0]} id="a"/> : null} */}
                </i>
                
              
                
                <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
                    <div className="record"></div>
                </i>
                <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow</i>


            </>
            // </div>     
         
        )
    }

}






export default  Media

// const mapStateToProps = ( state ) => {
//     return{
//         symbolAudio : state.symbol
//     }
// }

// const mapDispatchToProps = ( dispatch ) => {
//     return{
//         getSymbolAudio:  () => dispatch(getSymbolAudio())
//     }
// }

// export default compose( 
//     firestoreConnect(() => [
//       {
//         collection: "Learning",
//         doc: "symobol",
//         subcollections: [{collection: "audio"}],
//         storeAs: "audio"
//       },{
//         collection: "Learning",
//         doc: "symobol",
//       }
//     ]),
//     connect( mapStateToProps, mapDispatchToProps )
// )( Media );
