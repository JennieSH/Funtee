import React from "react";
import {Route, Link} from 'react-router-dom';
import Header from "../components/common/header";
import TaiwanMap from "../components/unit/taiwanMap";
import "../css/TC_UnitCategory_TW.css";
// import { connect } from "react-redux";
// import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";
import test from "../imgs/banner.jpg";

class TC_UnitCategory_TW extends React.Component{
    render(){
        return(
            <>
                <Header/>
               
                <div className="UnitCatalogTW container">
                    <span className="twTitle blue-grey-text text-darken-3">Meet charming Taiwan</span>
                    <div className="twMap">
                        <TaiwanMap/>
                    </div>
                  
                    <div className="twCard card">    

                         <div className="card-image">
                                <img src="https://i1.wp.com/imreadygo.com/wp-content/uploads/2018/11/41937201_320727102028520_1161058216185862699_n.jpg?resize=1024%2C681&ssl=1"/>
                                {/* <span className="card-title grey-text">Card Title</span> */}
                        </div>
                                       
                        <div className="card-content"> 

                          
                            <div className="card-title">
                                <span>Chiayi</span>
                                <span>嘉義</span>
                            </div>
                            <div className="card-action center">
                                <Link to="#">GO</Link>
                                <span className="blue-text">BACK</span>
                            </div>

                        </div>                            
                    </div>
                </div>
            </>
            
        )
    }
}
// const mapStateToProps = ( state ) => {
//     console.log(state)
// return{
//     number: state.firestore
// }
// }

// export default compose( 
//     firestoreConnect(() => [
//      {
//         collection: "Topics",
//         doc: "lesson",
//         subcollections: [{collection: "number"}],
//         storeAs: "number"
//       }
//     ]),
//     connect( mapStateToProps, null )
// )( TC_UnitCategory )

export default TC_UnitCategory_TW