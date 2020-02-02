import React from "react";
import { connect } from "react-redux";
import TC_Symobol_child from "./TC_Symbol_child";

import {  firestoreConnect } from "react-redux-firebase"; // r
import { compose } from "redux";
import { createFruit } from "../store/actions/testAction"; //w
class TC_Symbol_test extends React.Component{

    constructor(props){
        super(props);
        this.state={title:""}
    }

    handleChange(e){
        this.setState({
            title: e.currentTarget.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createFruit(this.state)    
    }

    render(){
        const { test } = this.props; // 選擇 this.props 中的 test 資料
        return(
            <>
            <form onSubmit={ this.handleSubmit.bind(this) }>
                    <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" value="Submit"/>
            </form>


            <TC_Symobol_child data={ test }/>       

            </> 
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{
        test: state.firestore.ordered.fruit_type
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createFruit: (fruit)=>dispatch(createFruit(fruit))
    }
}

// export default connect(mapStateToProps)(TC_Symobol)
export default compose(
        connect(mapStateToProps, mapDispatchToProps ),
        firestoreConnect([
            { collection : "fruit_type" }
        ])
    )(TC_Symbol_test)