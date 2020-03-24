import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/common/Loading";
import Header from "../components/common/Header";
import MapTw from "../components/lesson/MapTw";
import CardTw from "../components/lesson/CardTw";
import "../css/tcLessonCategoryTw.css";

class TcLessonCategoryTw extends React.Component{   
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
)( TcLessonCategoryTw )