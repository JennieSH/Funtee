import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { closeDescriptionMobile} from "../../store/actions/lessonAction";
class CardTw extends React.Component{

    handleCloseDescription(){              
        this.props.closeDescriptionMobile();    
    }    
    render(){  
        const { lessonData, currentCity, description } = this.props;
        const cityArr = lessonData.lessonTw.city;

        if ( currentCity !== null ){
            cityArr.forEach( city =>{
                if (currentCity.cityId  === city.id){
                    currentCity.img= city.img
                }
            })
        }
          
        if( description ){
            return(                   
                <div className="cardTw card" >    
                    <div className="card-image">
                        <img src={ currentCity ?  currentCity.img : this.props.lessonData.lessonTw.twImg }/>
                    </div>                                   
                    <div className="card-content">                           
                        <div className="card-title">
                            <span>{ currentCity? currentCity.cityName : "臺灣" }</span>
                            <span>{ currentCity? currentCity.cityEnglishName : "Taiwan" }</span>
                        </div>
                        <div className="card-action center">
                            { currentCity? <Link to={{pathname:"/vocabularytw", state: currentCity.cityId }}>START</Link> : <span className="start">WELCOME</span> }
                            <span className="back" onClick={ this.handleCloseDescription.bind(this) }>BACK</span>
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
        currentCity: state.lesson.currentCity,
        lessonData: state.firestore.data.Topics,
        description: state.lesson.description
    }
}
const mapStateToDispatch = ( dispatch ) => {
    return{
        closeDescriptionMobile: () => dispatch(closeDescriptionMobile())
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
)( CardTw )
