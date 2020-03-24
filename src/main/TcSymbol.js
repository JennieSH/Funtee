import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { lastPage, nextPage } from "../store/actions/lessonAction";
import { LastPageBtn, NextPageBtn } from "../components/lesson/PageBtn";
import Header from "../components/common/Header";
import WritingBoard from "../components/symbol/WritingBoard";
import TcSymbolContent from "../components/symbol/Content";
import Loading from "../components/common/Loading";
import Footer from "../components/common/Footer";
import "../css/tcSymbol.css";

class TcSymbol extends React.Component{
    // page
    handleLastPage(){
        const { indexPage, location, lastPage } = this.props;
        lastPage( indexPage, location.pathname )
    }
    handleNextPage(){
        const { learningData, indexPage, location, nextPage } = this.props;
        const symbolArrLength = learningData.symbol.chinese.length;
        nextPage(indexPage, symbolArrLength, location.pathname, learningData);
    }
    // canvas - fix canvas size
    componentDidMount(){
        window.addEventListener("resize", this.resize);
    }
    componentDidUpdate(){
        const cvs = document.getElementById("cvs");
        const tcSymbolContent = document.getElementById("tcSymbolContent");  

        if ( tcSymbolContent.offsetHeight > tcSymbolContent.offsetWidth){        
            cvs.height = tcSymbolContent.offsetWidth;
            cvs.width = tcSymbolContent.offsetWidth;
        }else{
            cvs.height =  tcSymbolContent.offsetHeight;
            cvs.width =  tcSymbolContent.offsetHeight;
        }  
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.resize);
    }
    resize(){
        location.reload();
    }
    render(){  
        if(!this.props.learningData){    
            return(
                <Fragment>
                    <Header/>
                    <Loading/>
                </Fragment>
            )           
        }else{
            const symbolArrLength = this.props.learningData.symbol.chinese.length;
            return(
                <div className="tcSymobolContainer">
                    <Header/>          
                    <LastPageBtn handleLastPage = { this.handleLastPage.bind(this) } id="lastPageBtnSymbol"/>
                    <NextPageBtn handleNextPage={ this.handleNextPage.bind(this) } id="nextPageBtnSymbol"/>          
                    <div className="tcSymobol">                  
                        <TcSymbolContent symbol={ this.props.learningData.symbol }/>
                        <WritingBoard symbolZhuyin={ this.props.learningData.symbol.svg } index={ this.props.indexPage }/>
                        <div className="symbolPage">{ this.props.learningData? `${this.props.indexPage}/${ symbolArrLength }` : null }</div>                 
                    </div>  
                    <Footer/>                
                </div>
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    return{
        learningData: state.firestore.data.Learning,
        indexPage: state.lesson.indexPageSymbol,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastPage:  ( indexPage, path ) => dispatch(lastPage( indexPage, path )),
        nextPage:  ( indexPage, maxPage, path, currentLesson ) => dispatch(nextPage( indexPage, maxPage, path, currentLesson )),
    }
}

export default compose( 
    firestoreConnect(() => [
     {
        collection: "Learning",
        doc: "symbol",
      }
    ]),
    connect( mapStateToProps, mapDispatchToProps )
)( TcSymbol);