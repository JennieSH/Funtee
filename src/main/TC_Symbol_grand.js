import React from "react";
import { connect } from "react-redux";
import { createFruit } from "../store/actions/testAction";

class TC_Symobol_grand extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={title:""}
    // }

    // handleChange(e){
    //     this.setState({
    //         title: e.currentTarget.value
    //     })
    // }

    // handleSubmit(e){
    //     e.preventDefault();       
    //     this.props.createFruit(this.state)
    // }
    render(){
        return(
            <>
                {/* <form onSubmit={ this.handleSubmit.bind(this) }>
                    <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)}/>
                    <input type="submit" value="Submit"/>
                </form> */}
                <div style={{backgroundColor:"white"}}>
                    {this.props.data.title}
                </div>
            </>
        )
    }    
}
// const mapDispatchToProps = (dispatch) =>{
//     return{
//         createFruit: (fruit)=>dispatch(createFruit(fruit))
//     }
// }

// export default connect(null, mapDispatchToProps)(TC_Symobol_grand)
// 第一個參數為 mapStateToProps，此處沒有所以為 null

export default TC_Symobol_grand
