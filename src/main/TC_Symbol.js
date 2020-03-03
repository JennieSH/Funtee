import React from "react";
import Header from "../components/common/header";
import "../css/TC_Symbol.css";
import WritingBoard from "../components/symbol/writingBoard";
import TC_SymbolContent from "../components/symbol/content";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { lastPage, nextPage } from "../store/actions/symbolAction";
import Loading from "../components/common/loading";

class TC_Symbol extends React.Component{

    // page
    handleLastPage(){
       this.props.lastPage(this.props.indexPage)
    }

    handleNextPage(){
        this.props.nextPage(this.props.indexPage,37)
    }


    // canvas

    componentDidMount(){
        window.addEventListener("resize", this.resize);
    }

    componentDidUpdate(){
        // fix canvas
        const cvs = document.getElementById("cvs");
        const TC_SymbolContent = document.getElementById("TC_SymbolContent");  
        cvs.height = TC_SymbolContent.offsetHeight;
        cvs.width = TC_SymbolContent.offsetWidth;
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.resize);
    }

    resize(){
        location.reload()
    }
    
    render(){  
        
        if(!this.props.symbol){    
            return(
                <>
                    <Header/>
                    <Loading/>
                </>
            )           
        }else{
            return(
                <>
                    <Header/>     
                    <i className="material-icons waves-effect" id="lastPageBtn_S" onClick={ this.handleLastPage.bind(this) }>navigate_before</i>
                    <i className="material-icons waves-effect" id="nextPageBtn_S" onClick={ this.handleNextPage.bind(this) }>navigate_next</i>           
                    <div className="TC_SymobolContainer">                  
                        <TC_SymbolContent symbol={this.props.symbol.symbol}/>
                        <WritingBoard/>  
                        <div className="page">{this.props.symbol? `${this.props.indexPage}/37` : null}</div>                      
                    </div>
                                
                </>
            )
        }
    }
}

const mapStateToProps = ( state ) => {
    
    return{
        symbol: state.firestore.data.Learning,
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