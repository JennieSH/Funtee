import React from "react";
import { connect } from "react-redux";
import { createData } from "../../store/actions/testAction"; //w

import {  firestoreConnect } from "react-redux-firebase"; // r
import { compose } from "redux";

class  Dictionary extends React.Component{

    constructor(props){
        super(props);
        this.state={
           chinese:""
        }
    }
    handleChange(e){
        this.setState({
            chinese: e.currentTarget.value
        })
  
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createData(this.state)    
    }

    getDic(){
            
        fetch(`https://www.moedict.tw/a/${this.state.chinese}.json`,{
                    method: 'GET',
                }).then(function(response) {
                    
                        return response.json()
                    
                }).then((res)=>{
                     this.setState({
                        ...this.state,
                        english:res.English,
                        pinyin:res.h[0].p,
                        zhuyin:res.h[0].b
                        })                   
                }).then(()=>{
                    console.log("get dic")
                }).catch(function(err) {
                    console.log("fetch dic err"+err)
                })
        
    }


    getImg(){
        let url =
                `https://api.unsplash.com/search/photos/?client_id=9c89b71b1f64592d8c158c4e09c3b76207d2c066b97cb231396dbff515e7aec7&per_page=1&query=${this.state.english}`;

                fetch(url, {method: 'get'})
                .then(function(response) {
                    return response.json()
                }).then((res)=>{                
                    this.setState({
                        ...this.state,
                    imgs: res.results[0].urls.small
                    })
                }).then(()=>{
                    console.log("get img")
                }).catch(function(err) {
                    console.log("fetch img err"+err)
                })   
    }

    getAudio(){
        let apiKey = "AIzaSyD-I8KgXlOZVldg8tK77bL-jpfcL6GKKZ4";
            let ttssrc = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
                    fetch( ttssrc , {
                        method: 'POST',
                        body: JSON.stringify({
                            "audioConfig": {
                            "audioEncoding": "MP3",
                            "pitch": 0,
                            "speakingRate": 1
                            },
                            "input": {
                            "text": `${this.state.chinese}`
                            },
                            "voice": {
                            "languageCode": "en-US",
                            "name": "en-US-Standard-B"
                            }            
                        }),                    
                    }).then(function(response) {
                            return response.json()      
                    }).then((res)=>{
                        
                        this.setState({
                            ...this.state,
                            audio:res.audioContent
                         })
         
                    }).then(()=>{
                        console.log("get audio")
                    }).catch((err)=>{
                        console.log("tts API err"+err)
                    })   
    }
    

    render(){
       
       
        return(
            <>
                <button onClick={ this.getDic.bind(this)}>dic</button>
                <button onClick={ this.getImg.bind(this)}>img</button>
                <button onClick={ this.getAudio.bind(this)}>audio</button>
                <form onSubmit={ this.handleSubmit.bind(this) }>
                        <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)}  id="base64"/>
                        <input type="submit" value="Submit"/>
                        
                </form>  
                
            </> 
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        createData: (data)=>dispatch(createData(data))
    }
}
// export default Dictionary
export default connect( null, mapDispatchToProps )(Dictionary)