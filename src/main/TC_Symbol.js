import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { lastPage, nextPage } from "../store/actions/symbolAction";
import "../css/TC_Symbol.css";
import Header from "../components/common/header";
import WritingBoard from "../components/symbol/writingBoard";
import TC_SymbolContent from "../components/symbol/content";
import Loading from "../components/common/loading";

class TC_Symbol extends React.Component{
    // page
    handleLastPage(){
       this.props.lastPage(this.props.indexPage)
    }
    handleNextPage(){
        const symbolArrLength = this.props.learningData.symbol.chinese.length;
        this.props.nextPage(this.props.indexPage, symbolArrLength)
    }
    // canvas
    componentDidMount(){
        window.addEventListener("resize", this.resize);
    }
    componentDidUpdate(){
        // fix canvas size
        const cvs = document.getElementById("cvs");
        const TC_SymbolContent = document.getElementById("TC_SymbolContent");  

        if ( TC_SymbolContent.offsetHeight > TC_SymbolContent.offsetWidth){        
            cvs.height = TC_SymbolContent.offsetWidth;
            cvs.width = TC_SymbolContent.offsetWidth;
        }else{
            cvs.height =  TC_SymbolContent.offsetHeight;
            cvs.width =  TC_SymbolContent.offsetHeight;
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
                <div className="TC_Symobol">
                    <Header/>          
                    <i className="material-icons waves-effect lastPageBtnSymbol" onClick={ this.handleLastPage.bind(this) }>navigate_before</i>
                    <i className="material-icons waves-effect nextPageBtnSymbol" onClick={ this.handleNextPage.bind(this) }>navigate_next</i>           
                    <div className="TC_SymobolContainer">                  
                        <TC_SymbolContent symbol={ this.props.learningData.symbol }/>
                        <WritingBoard symbolZhuyin={ this.props.learningData.symbol.svg } index={ this.props.indexPage }/>
                        <div className="page">{this.props.learningData? `${this.props.indexPage}/${ symbolArrLength }` : null}</div>                 
                    </div>                     
                </div>
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    return{
        learningData: state.firestore.data.Learning,
        indexPage: state.symbol.indexPage,
    }
}
const mapDispatchToProps = ( dispatch ) => {
    return{
        lastPage:  ( indexPage ) => dispatch(lastPage( indexPage )),
        nextPage:  ( indexPage, maxPage ) => dispatch(nextPage( indexPage, maxPage )),
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
)( TC_Symbol);