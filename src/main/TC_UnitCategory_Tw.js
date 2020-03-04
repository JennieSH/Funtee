import React, { Fragment } from "react";
import "../css/TC_UnitCategory_Tw.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/common/loading";
import Header from "../components/common/header";
import TaiwanMap from "../components/unit/taiwanMap";
import TWCard from "../components/unit/twCard";



class TC_UnitCategory_TW extends React.Component{
    
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
                    <div className="UnitCatalogTW container">
                        <span className="twTitle blue-grey-text text-darken-3">Meet charming Taiwan</span>
                        <div className="twMap">
                            <TaiwanMap/>
                        </div>
                        <TWCard/>
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
    connect( mapStateToProps, null )
)( TC_UnitCategory_TW )