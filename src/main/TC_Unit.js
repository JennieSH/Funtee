import React from "react";
import Header from "../components/common/header";
import "../css/TC_Unit.css";
import PageController from "../components/common/pageController";





class TC_Unit extends React.Component{

    constructor(props){
        super(props);
        this.state={
            dic:null,
            url:null,
            record:null
        }
       
    }

    componentDidMount(){

        fetch("https://www.moedict.tw/a/香蕉.json",{
            method: 'GET',
        }).then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            } else {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then((res)=>{
            
            this.setState({
                dic: res
            })

        //    console.log(res)
        //    console.log(res.h[0].b)
        //    console.log(res.h[0].p)
        //    console.log(res.t) //水果
        //    console.log(res.English) // fruit          
            
        }).then(()=>{

            console.log(this.state.dic) // fruit 

            let url =
            `https://api.unsplash.com/search/photos/?client_id=812193ef71ca946e361ed541979a0cfd91e9419a19235fd05f51ea14233f020a&per_page=1&query=${this.state.dic.English}`;

                fetch(url, {method: 'get'})
                .then(function(response) {
                    return response.json()
                }).then((res)=>{
                console.log(res.results[0].urls.small)
                 this.setState({
                   ...this.state,
                   url:res.results[0].urls.small
                })

                
                }).catch(function(err) {
                    console.log(err)
                })

               
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
                            "text": "香蕉"
                            },
                            "voice": {
                            "languageCode": "en-US",
                            "name": "en-US-Standard-B"
                            }            
                        }),                    
                    }).then(function(response) {
                            return response.json()      
                    }).then((res)=>{
                        console.log(res)
                        this.setState({
                            ...this.state,
                            record:res.audioContent
                         })
         
                    }).catch((err)=>{
                        console.log("API err")
                    })

        })
    }
 
    play(){
        // let fileName ="//NExAAQwAJAAAhGTAsCDmlIPnziKw/BCGMTvE8EHTn5yp6wflAQWD85B8QT40Hz4fKAhKDT8MLB+oEx4f7yhwu+D5854PjgwJ3bwyXB95Nt0tI/GQrwy+ylpR7dL1XR//NExBASONpQABiGccpxiXJ8bdNvflftAWXIHF7k2HpVmjtIgW9GVvvcVa2NzCsL6VZfxOO1bJmrfduZxUl6CG9/LC99sPUm4zKTATgK/8b1Uss3zeVkKWa5QFi9kfly//NExBoSeTY0AUMQAeUppQEsIqVFXO74K4KJHHAvgvwn5eNtYUFPFfYF+39ZyFEm//d+Pxy5jbLX5Igr9f4mT3AT/9twSAd36o0aqs5qSY5x7joEU81MzclAoA5oGOCR//NExCMbGypkAY9oAPzE3WTyXHgUzJzf88m77InDJf+nvzrzroK/+mm7abGxKGpmdRMv/6enq+Uy+YLZ3TWsvn///+m9CzodAoDyKCRumMOSBJrKRaYKyh2lggxJw5ws//NExAkUCsKQAdo4ARWZSMfcYVBHAYMtdaHeVsNc1qKXs6lgRw3IMaTJixjz3Vlb///5/////9T3VKn////////+ZRT3MHFJqYfHBYjNJctq2G+YVdVZqSqdGI2QQePj//NExAsUktqYANqOuWmskgMaEoprUu8bsCO8wuIQwwxQRCYYUQiG/3////5zf///7t1Kfb///////fuhqGD5oiD5QaEAseJYiKTZyJdiR8OjD3JK1eUNmuxUw8GA7Awa//NExAsVOuqQANtKuQ6Ql9jEWoeG2o37OMlepx/B5E6NDGkLpOZdbf/////b///0eYxSC8xjSf//////+alBMjGMJBEOFEzlCQAszIHynPQaKv9ao/KKzqYW4BMDAM44//NExAkUSsqEAONOuQdoeD9PAQlYOD8apN/BJTOMiJKB9C1CemyzEaSitWr/////6N////9nb////////u3HjRw8ajo8EQyKDSymA+OLwVSUq1t+7dW7HLrChQFmP1Cc//NExAoSmrZ4AOKEuVhiPAJ2fjBhMuCwSh+Q9xbqTmj0RQrAMiCHw2HyELP///////////qXzf///////+rLlCgNimCidKzFJXW5/8GqkbrqnGQCMDAiNPKRM/hlBwTI//NExBIOuHJcAO5YSAdYdOg2sx42B6KmjjElsC5aEwHo+ZlP//////t////WViUBC4KgKHclssNSuKpI3cQ8sB1EChCAKoNLSYXvAETt5aNQwQAIBKQFjwuxaGgXZMYK//NExCoSmuJgANKEuISZhhja//////////k///7//////eja5CdCEyCCHBBxyqG81hcwiJzCVQikC8Y0BF9jPoQ4pCIQFX8zBaK8iH8eQk4DUBYFZLIiBgGkBpCiRDRM//NExDIZYxJ8ANtKuKaziSKvv////cnT+vvWp0bI/26p939e3////60ZHxNGVzmKHxeRAmYPjBofRRhXO50iDIr+YStRw5E9qjoU6cgBbBuFV/zEMpaUKzQtAOULlLxe//NExB8UasKYANTKuRtGwEzkgO4vIFFJm/////+78nt5C6nEzNO5zvu3/////////oVJ1CD0sPEeBp3oeafWte8yvMrN6Aam3SWpSmptg5C40O5ZIk5JKL4AhjwLSs3C//NExCASirakANNEuZxbDoo6il//////6uXu3V9as7HFoKyL//////////TVuwMXqZfdxn997ar8rsEEgqZEBRlnMlXwcIXSCGqsyA/ilWRJohALIni+sUOGgmhETZ1P//NExCgSSX6cANxElP//////6FLoXqcpqi4UUHUI/////1GpYk4k8aAQoAnFyFX+4yJlom5YoqJIIQWBDJd6J1m7haA5giTYBKE7OS5MAnw+VMtybR///////zenrtBp//NExDESMZ6UANRElCwwCV4JTC/////9bDxgiVMEwWBcqHQEPe8qjoEHDjpC1L3ELtCN+ObKhoCg6fetH29fueocqaVa8/IMXp2CIODf//8qdSKhplQ0FSIiBk89n/////NExDsRiHKIANbeSP/c00tDCSgaDxPIqoNLguqZCKeKaFGxwSSYhpTxmcB1xBlCawjc2axKRTKoqnAjNrD4OQCrxJdWutBX///p+x6hLEpENf+t2v//2noiKnVnaxKu//NExEcSKIZYANaYSDDVixTlL9PZWqwfQ4GnGMXXSyiOTLb4cDY/XACFM3PC+0WG2V9qUn+x9gBvl/91F1JULObjlJ+0gAzWxYE0seA10lPObdRxVf7Vqo6LWkMyd2xP//NExFESCL48AHpYTDg7gQwKB4W26k4/6w8WgNr4BaLDMVB6DvgRxwgTZNY2Xo9hBHtf6ExeGIpXmJ7C79etjn9jf///vu//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"      
        let snd = new Audio("data:audio/wav;base64," + this.state.record);
        snd.play();
    }
    
    render(){
        let url = this.state.url;
        console.log(this.state)
        if(this.state.dic===null){
            return(
                <>
                    <Header/>
                    <div>Loading</div>
                </>
            )
            }else{
                return(
                    <>
                        <Header/>
                        <div className="TC_UnitContainer">
                        <div className="unitImg"><img src={url}/></div>
                        {/* { url ? null:<img src={url}/> } */}
                            <ul>
                                <li>{this.state.dic.h[0].b}</li>
                                <li>{this.state.dic.h[0].p}</li>
                                <li>香蕉</li>
                                <li>{this.state.dic.English}</li>
                            
                            </ul>
                            <PageController/>
                        
                            
                            <div className="controlMenu">                 
                                <div onClick={ this.play.bind(this)}>撥放</div>
                                {/* <div >錄音</div>
                                <div>play</div> */}
                                {/* <div>複製</div> */}
                                <div className="controlPage_W">←</div>
                                <div className="controlPage_W">→</div>
                            </div>                                    
                        </div>
                    
                    </>        
                )
            }
    }
}

export default TC_Unit