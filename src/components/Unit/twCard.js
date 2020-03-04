import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { closeDescription} from "../../store/actions/unitAction";




class TWCard extends React.Component{

    handleCloseDescription(){              
        this.props.closeDescription();    
    }
    
    render(){   
        const cityArr = this.props.lessonData.lessonTw.city;
        const currentCity = this.props.currentCity;
        if ( currentCity !== null ){
            cityArr.forEach( city =>{
                if (currentCity.cityID  === city.id){
                    currentCity.img= city.img
                }
            })
        }
          
        if( this.props.description ){
            return(                   
                <div className="twCard card" >    
                    <div className="card-image">
                        <img src={ currentCity ?  currentCity.img : this.props.lessonData.lessonTw.twImg }/>
                    </div>                                   
                    <div className="card-content">                           
                        <div className="card-title">
                            <span>{ currentCity? currentCity.cityName : "臺灣" }</span>
                            <span>{ currentCity? currentCity.cityEnglishName : "Taiwan" }</span>
                        </div>
                        <div className="card-action center">
                            { currentCity? <Link to={{pathname:"/vocabularytw", state: currentCity.cityID }}>START</Link> : <span className="orange-text">WELCOME</span> }
                            <span className="back blue-text" onClick={ this.handleCloseDescription.bind(this) }>BACK</span>
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
        currentCity: state.unit.currentCity,
        lessonData: state.firestore.data.Topics,
        description: state.unit.description
    }
}
const mapStateToDispatch = ( dispatch ) => {
    return{
        closeDescription: () => dispatch(closeDescription())
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
