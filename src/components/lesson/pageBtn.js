import React from "react";

class LastPageBtn extends React.Component{
    render(){
        return(
            <i  className="material-icons waves-effect" id={ this.props.id }  onClick={ this.props.handleLastPage }>navigate_before</i>
        )         
    }
}

class NextPageBtn extends React.Component{
    render(){  
        return(
            <i  className="material-icons waves-effect" id={ this.props.id } onClick={ this.props.handleNextPage }>navigate_next</i>   
        )         
    }
}
export { LastPageBtn, NextPageBtn }