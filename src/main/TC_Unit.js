import React, { Fragment } from "react";
import Header from "../components/common/header";
import "../css/TC_Unit.css";
import UnitlMenu from "../components/unit/menu";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/common/loading";
import { lastPage, nextPage, textToSpeech } from "../store/actions/unitAction";

class TC_Unit extends React.Component{
 
    handleLastPage(){
        this.props.lastPage( this.props.indexPage )
    }
 
    handleNextPage(){
        const lessonLength = this.props.firestore.ordered[this.props.location.state].length
        this.props.nextPage(this.props.indexPage, lessonLength)
    }

    render(){
        console.log(this.props.location.state);
        const lesson = this.props.firestore.ordered[this.props.location.state];
        if( !lesson ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            const index = this.props.indexPage-1;
            const indexPage = this.props.indexPage;
            const maxPage=lesson.length;
            console.log(this.props.firestore)


            // if (this.props.unitTTS === null ){
            //     this.props.textToSpeech( lesson[index].chinese  ) 
            // }
            return(
                <Fragment>  
                    <Header/>
                    <i className="material-icons waves-effect" id="lastPageBtn_U" onClick={ this.handleLastPage.bind(this) }>navigate_before</i>
                    <i className="material-icons waves-effect" id="nextPageBtn_U" onClick={ this.handleNextPage.bind(this) }>navigate_next</i> 
                    <div className="TC_UnitContainer">
                        <div className="unitImg"><div><img src={ lesson[index].imgs }/></div></div>                    
                            <ul>
                                <li>{ lesson[index].zhuyin }</li>
                                <li>{ lesson[index].pinyin }</li>
                                <li>{ lesson[index].chinese }</li>
                                <li>{ lesson[index].english }</li>                            
                            </ul>                                             
                            <UnitlMenu audio={ lesson[index].audio }/>  
                            <span  className="page">{ `${indexPage} / ${maxPage}` }</span>
                    </div>
                    
                </Fragment>        
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    return{
        firestore: state.firestore,
        indexPage: state.unit.indexPage,
        unitTTS: state.unit.unitTTS
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        lastPage:  ( indexPage ) => dispatch(lastPage( indexPage )),
        nextPage:  ( indexPage, maxPage ) => dispatch(nextPage( indexPage, maxPage )),
        textToSpeech: (targetWord ) => dispatch(textToSpeech(targetWord))
    }
}

export default compose( 
    firestoreConnect((props) =>{   
        const lesson = props.location.state;    
        return(
            [{
                collection: "Topics",
                doc: "lesson",
                subcollections: [{collection: lesson}],
                storeAs: lesson
            }]
        )
    }),
    // firestoreConnect((props) =>{   
    //     const lesson = props.location.state;    
    //     return(
    //         [{
    //             collection: "Topics",
    //             doc: "lessonTw",
    //             subcollections: [{collection: lesson}],
    //             storeAs: lesson
    //         }]
    //     )
    // }),
    
    connect( mapStateToProps, mapDispatchToProps )
)( TC_Unit )
