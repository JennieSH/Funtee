import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { closePasswordDialogBox } from "../../../store/actions/authActions";


class PasswordDialog extends React.Component{
    handleClosePasswordDialog(){
        this.props.history.push("/signin");
        this.props.closePasswordDialogBox()
    }
    render(){
 
        return(
            <>
                <div className="resetPassword card" >
                    <span>Your password have been sent to your e-mail address.</span> 
                    <button onClick={ this.handleClosePasswordDialog.bind(this) } className="waves-effect waves-light btn  brown lighten-1">Close</button>
                </div>
            </> 
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        passwordError : state.auth.passwordError,
        auth : state.firebase.auth
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        closePasswordDialogBox: ()=> dispatch( closePasswordDialogBox() )
    }
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps )( PasswordDialog ))


// export { Guest, Member }