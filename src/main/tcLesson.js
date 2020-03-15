import React, { Fragment } from "react";
import Header from "../components/common/header";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { lastPage, nextPage, initPage, initTTS, textToSpeech } from "../store/actions/lessonAction";
import { LastPageBtn, NextPageBtn } from "../components/lesson/pageBtn";
import LessonMenu from "../components/lesson/menu";
import Content from "../components/lesson/content";
import Loading from "../components/common/loading";
import "../css/tcLesson.css";

class TcLesson extends React.Component{
 
    handleLastPage(){
        const { indexPage, location, lastPage } = this.props;
        lastPage( indexPage, location.pathname )
    }
    handleNextPage(){
        const { firestore, location, indexPage, nextPage } = this.props;
        const lessonLength = firestore.ordered[location.state].length;
        nextPage(indexPage, lessonLength, location.pathname, location.state);
    }
    componentDidMount(){
        const { previousLesson, location, initPage, initTTS } = this.props;
        if ( previousLesson !== location.state){
            initPage( location.pathname )
        }
        initTTS();
    }
    render(){
        const lesson = this.props.firestore.ordered[this.props.location.state];
        if( !lesson ){
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )
        }else{
            const indexPage = this.props.indexPage;
            const index = indexPage-1;
            const maxPage = lesson.length;
            if (this.props.lessonTTS === null  ){
                this.props.textToSpeech( lesson[index].chinese );
            }
            return(
                <Fragment>  
                    <Header/>
                    <LastPageBtn handleLastPage = { this.handleLastPage.bind(this) } id="lastPageBtnLesson"/>
                    <NextPageBtn handleNextPage={ this.handleNextPage.bind(this) } id="nextPageBtnLesson"/> 
                    <div className="tcLessonContainer">
                        <Content lesson={ lesson } index={ index } id="content"/>
                        <LessonMenu audio={ lesson[index].audio }/>  
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
        indexPage: state.lesson.indexPageLesson,
        previousLesson: state.lesson.previousLesson,
        lessonTTS: state.lesson.lessonTTS
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        lastPage: ( indexPage, path ) => dispatch(lastPage( indexPage, path )),
        nextPage: ( indexPage, maxPage, path, currentLesson ) => dispatch(nextPage( indexPage, maxPage, path, currentLesson)),
        initPage: ( path ) => dispatch(initPage(path)),
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
                doc: "lesson",
                subcollections: [{collection: lesson}],
                storeAs: lesson
            }]
        )
    }),
    connect( mapStateToProps, mapDispatchToProps )
)( TcLesson )
