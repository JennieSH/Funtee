import React from "react";
import {  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../components/common/header";
import "../css/FC_Card.css";




class FC_Card extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardArr: [
				{ front: 'Hej', back: 'Hello' },
				{ front: 'Varsågod', back: 'You\'re welcome' },
				{ front: 'Snälla', back: 'Please' },
				{ front: 'Ursäkta mig', back: 'Excuse me' },
				{ front: 'Jag förstår inte', back: 'I do not understand' },
				{ front: 'Talar du engelska?', back: 'Do you speak English?' },
				{ front: 'Vad heter du?', back: 'What is your name?' },
				{ front: 'Offentlig telefon', back: 'Public telephone' },
				{ front: 'Nyhetsbyrå', back: 'News agency' },
				{ front: 'Ingång', back: 'Entrance' },
				{ front: 'Utgång', back: 'Exit' },
				{ front: 'Herrar', back: 'Men' },
				{ front: 'Damer', back: 'Women' }
			],
            cardIndex: 0,
            flipped: false,
			flipStyle: { transition: 'transform 0.5s' }
        }
    }

    handleFlip(){
        this.setState({ 
			flipped: !this.state.flipped,
			flipStyle: { transition: 'transform 0.5s' }
		});
    }
    // page
    handleLastPage(){
       
    }

    handleNextPage(){
        
    }

    render(){
        if( !this.props.auth.uid ){ return <Redirect to = "/signin"/> }
        const rotation = this.state.flipped ? 180 : 0;
		const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` }
		const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` }
        return(
            <>
               
                <Header/>    
                <div className="FC_CardEach container">
                  
                     <div className="FC_cardEach card">

                        <div className="frontSide" style={frontStyle}>
                            <i className="material-icons waves-effect blue-text" >edit</i> 
                            <span>apple</span>
                        </div>

                        <div className="backSide" style={backStyle}>
                            <i className="material-icons waves-effect blue-text" >edit</i> 
                            <span className="grey-text">蘋果</span>                               
                        </div>
                       
                    </div>

                    <span className="page">1/100</span>

                    <div className="controlMenu">
                        
                        <i className="material-icons waves-effect"  onClick={ this.handleFlip.bind(this) }>flip_camera_android</i>                  
                        <i className="material-icons waves-effect">
                            volume_up
                            <audio id="audio"/>
                        </i>                                          
                        <i className="socket waves-effect" >
                            <div className="record"></div>
                        </i>
                        <i className="material-icons waves-effect" >play_arrow</i>
                                       
                    </div>
                    <div className="pageControl">
                        <i className="material-icons waves-effect " onClick={ this.handleLastPage.bind(this) }>navigate_before</i>
                        <i className="material-icons waves-effect " id="nextPageBtn_F" onClick={ this.handleNextPage.bind(this) }>navigate_next</i>                       
                    </div>
                   
                </div>          
            </>
            
        )
    }
}
const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(FC_Card)