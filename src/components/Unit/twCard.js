import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { toggleDescription } from "../../store/actions/unitAction";




class TWCard extends React.Component{

    handleCloseCard(){              
        this.props.toggleDescription();    
    }
    
    render(){   
        let cityArr = this.props.lessonData.lessonTw.city;
        let currentCityData = this.props.currentCity;
        if ( currentCityData !== null ){
            cityArr.forEach( city =>{
                if ( city.id ===  currentCityData.id ){
                    currentCityData.img= city.img
                }
            })
        }
          
        if( this.props.description ){
            return(                   
                <div className="twCard card" >    
                    <div className="card-image">
                        <img src={ currentCityData ?  currentCityData.img : this.props.lessonData.lessonTw.twImg }/>
                    </div>                                   
                    <div className="card-content">                           
                        <div className="card-title">
                            <span>{ currentCityData? currentCityData.zh : "臺灣" }</span>
                            <span>{ currentCityData? currentCityData.en : "Taiwan" }</span>
                        </div>
                        <div className="card-action center">
                            { currentCityData? <Link to={{pathname:"/vocabularytw", state: currentCityData.id}}>START</Link> : <span className="orange-text">WELCOME</span> }
                            <span className="back blue-text" onClick={ this.handleCloseCard.bind(this) }>BACK</span>
                        </div>
                    </div>                            
                </div>
            )
        }else{
            return null
        }
    }    
}
const mapStateToProps = ( state ) => {
    return{
        currentCity: state.unit.city,
        lessonData: state.firestore.data.Topics,
        description: state.unit.description
    }
}
const mapStateToDispatch = ( dispatch ) => {
    return{
        toggleDescription: () => dispatch(toggleDescription())
    }
}
export default compose( 
    firestoreConnect(() => [
     {
        collection: "Topics",
        doc: "lessonTw",
      }
    ]),
    connect( mapStateToProps, mapStateToDispatch )
)( TWCard )
