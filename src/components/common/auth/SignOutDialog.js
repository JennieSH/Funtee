import React, { Fragment } from "react";
import { connect } from "react-redux"
import { signOut, toggleSignOut } from "../../../store/actions/authActions";

class SignOutDialog extends React.Component{
    handleCloseSignOutDialog(){
        this.props.toggleSignOut();
    }
    handleSignOut(){
        this.props.signOut();
    }
    render(){
        return(
            <Fragment>
                <div className="signOut card">
                    <span>Do you want to sign out?</span> 
                    <div>
                        <button onClick={ this.handleSignOut.bind(this) } className="waves-effect waves-light btn">YES</button>
                        <button onClick={ this.handleCloseSignOutDialog.bind(this) } className="waves-effect waves-light btn">NO</button>
                    </div>
                </div>
            </Fragment> 
        )
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        signOut : ()=> dispatch(signOut()),
        toggleSignOut : () => dispatch(toggleSignOut())
    }
}

export default connect( null, mapDispatchToProps )( SignOutDialog )
