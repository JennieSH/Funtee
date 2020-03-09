import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/common/loading";
import Header from "../components/common/header";
import MapTw from "../components/lesson/mapTw";
import CardTw from "../components/lesson/cardTw";
import "../css/tcLessonCategoryTw.css";

class tcCategoryTw extends React.Component{   
    render(){
        if ( !this.props.lessonData){
            return (
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            return(
                <Fragment>
                    <Header/> 
                    <div className="lessonCategoryTw container">
                        <span className="titleTw">Meet Charming Taiwan</span>
                        <div className="mapTw">
                            <MapTw/>
                        </div>
                        <CardTw/>
                    </div>
                </Fragment>              
            )
        }    
    }
}
const mapStateToProps = ( state ) => {
    return{
        lessonData: state.firestore.data.Topics
    }
}
export default compose( 
    firestoreConnect(() => [
     {
        collection: "Topics",
        doc: "lessonTw",
      }
    ]),
    connect( mapStateToProps )
)( tcCategoryTw  )