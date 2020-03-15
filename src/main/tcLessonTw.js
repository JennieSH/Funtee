import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { lastPage, nextPage, initPage, initTTS, textToSpeech } from "../store/actions/lessonAction";
import { LastPageBtn, NextPageBtn } from "../components/lesson/pageBtn";
import Content from "../components/lesson/content";
import Header from "../components/common/header";
import LessonMenuTw from "../components/lesson/menuTw";
import Loading from "../components/common/loading";
import "../css/tcLesson.css";

class TcLessonTw extends React.Component{
 
    handleLastPage(){
        const { indexPage, location, lastPage } = this.props;
        lastPage( indexPage, location.pathname )
    }
    handleNextPage(){
        const { indexPage, location, firestore, nextPage } = this.props;
        const cityId = location.state; 
        const lessonLength = firestore.ordered[cityId].length;
        nextPage( indexPage, lessonLength, location.pathname, cityId )
    }
    componentDidMount(){
        const { previousLessonTw, location, initPage, initTTS  } = this.props;
        if ( previousLessonTw !== location.state){
            initPage( location.pathname )
        }
        initTTS();
    }
    render(){
        const { location, firestore, indexPage } = this.props;
        const cityId = location.state;
        const lesson = firestore.ordered[cityId];
        const index = indexPage-1;    
        if( !lesson ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{      
            const maxPage=lesson.length; 
            if (this.props.lessonTTS === null  ){
                this.props.textToSpeech( lesson[index].chinese )
            }
            return(
                <Fragment>
                    <Header/>
                    <LastPageBtn handleLastPage = { this.handleLastPage.bind(this) } id="lastPageBtnLesson"/>
                    <NextPageBtn handleNextPage={ this.handleNextPage.bind(this) } id="nextPageBtnLesson"/> 
                    <div className="tcLessonContainer">
                        <Content lesson={ lesson } index={index} id="contentTw"/>
                        <LessonMenuTw audio={ lesson[index].audio }/>  
                        <span className="lessonPage">{ `${indexPage} / ${maxPage}` }</span>
                    </div>       
                </Fragment>        
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    return{
        firestore: state.firestore,
        indexPage: state.lesson.indexPageLessonTw,
        previousLessonTw: state.lesson.previousLessonTw,
        lessonTTS: state.lesson.lessonTTS
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastPage:  ( indexPage, path ) => dispatch(lastPage( indexPage, path )),
        nextPage:  ( indexPage, maxPage, path, currentLesson ) => dispatch(nextPage( indexPage, maxPage, path, currentLesson )),
        initPage:  ( path ) => dispatch(initPage( path )),
        initTTS: () => dispatch(initTTS()),
        textToSpeech: (targetWord ) => dispatch(textToSpeech(targetWord))
    }
}

export default compose( 
    firestoreConnect((props) =>{   
        const lesson = props.location.state;    
        return(
            [{
                collection: "Topics",
                doc: "lessonTw",
                subcollections: [{collection: lesson}],
                storeAs: lesson
            }]
        )
    }),
    connect( mapStateToProps, mapDispatchToProps )
)( TcLessonTw )
