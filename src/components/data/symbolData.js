import React, {Fragment} from "react";
import firebase from "firebase/app";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class SymobolData extends React.Component{


    
    // componentDidMount(){
    //     // updating auduo completed
    //     if (window.File && window.FileReader && window.FileList && window.Blob) {
    //         document.getElementById('files').addEventListener('change', handleFileSelect, false);
    //         } else {
    //         alert('The File APIs are not fully supported in this browser.');
    //     }
    // }
   
    // componentDidMount(){
    //     // updating img completed
    //     let previousEnglishData;
    //     let imgsArr=[];
    //     let db =firebase.firestore().collection("Learning").doc("symobol");

    //     db.get().then(doc => {
    //         previousEnglishData = doc.data().english;
    //         console.log(doc.data().english);
    //         return previousEnglishData
    //       })
    //       .then((previousEnglishData)=>{           
    //         for(let i=36;i<previousEnglishData.length;i++){
              
    //             let url =
    //             `https://api.unsplash.com/search/photos/?client_id=**&per_page=1&query=${previousEnglishData[i]}`;

    //             fetch(url, {method: 'get'})
    //             .then(function(response) {
    //                 return response.json()
    //             }).then((res)=>{
    //                 console.log(res.results[0].urls.small)
    //                 // imgsArr.push(res.results[0].urls.small)
    //             }).catch(function(err) {
    //                 console.log("fetch img err"+err)
    //             })
    //         }       
    //       })
    //     //   .then(()=>{          
    //     //         db.update({
    //     //             imgs:imgsArr
    //     //         }).catch((err)=>{
    //     //             console.log("update fail"+err)
    //     //         });
    //     //   })
    //       .catch((err)=>{
    //         console.log("get EnglishData fail"+err)
    //       })
    // }


    // componentDidMount(){
    //     // chinese completed 
    //     let chineseArr = [ "爸爸", "朋友", "媽媽", "方法", "刀", "桃子", "牛", "樓梯", "狗", "可樂", "海", "雞", "茄子", "夏天", "蜘蛛", "船",
    //                            "樹木", "日曆", "嘴巴", "草", "掃把", "醫生", "網球", "魚", "阿姨", "喔", "鱷魚", "椰子", "愛", "飛機", "澳洲", "歐洲", "安全",
    //                            "恩會", "骯髒", "永遠", "兒童" ];



    //     let db =firebase.firestore().collection("Learning").doc("symobol");

    //     db.update({
    //         chinese:chineseArr
    //     }).then(() => {
    //         console.log("chinese data successful");
    //     }).catch((err)=>{
    //         console.log("get fail"+err)
    //     })
    // }

    // componentDidMount(){
    //     // !!!!!!!!! content completed [warning] !!!!!!!!!!!!!!
    //     let englishArr=[];
    //     let pinyinArr=[];
    //     let zhuyinArr=[];
    //     let previousChineseData;
    //     let db =firebase.firestore().collection("Learning").doc("symobol");

    //     db.get().then(doc => {
    //         previousChineseData = doc.data().chinese;
           
    //         return previousChineseData
    //     })
    //     .then((previousChineseData)=>{         
         
    //         for(let i=0;i<previousChineseData.length;i++){ // 30 33 fail
                      
    //             let src = `https://www.moedict.tw/a/${previousChineseData[i]}.json`;
    //                     fetch( src ,{method: 'GET',})
    //                     .then((res)=>{         
    //                         return res.json()        
    //                     })
    //                     .then((res)=>{
    //                         console.log(res)
    //                         englishArr.push(res.English);
    //                         pinyinArr.push(res.h[0].p);
    //                         zhuyinArr.push(res.h[0].b);
    //                     })
    //                     .catch((err)=>{
    //                             console.log("fetch fail"+err)
    //                     })             
    //          }
             
    //     })
    //     // .then((res)=>{
    //     //     console.log(res)
    //     //     db.update({
    //     //         english : res.englishArr,
    //     //         pinyin : res.pinyinArr,
    //     //         zhuyin : res.zhuyinArr
    //     //     }).then(() => {
    //     //         console.log("chinese data successful");
    //     //     }).catch((err)=>{
    //     //         console.log("update fail"+err)
    //     //     })
    //     // })
    //     .catch((err)=>{
    //                 console.log("get fail"+err)
    //     })
    // }


    // componentDidUpdate(){
    //     console.log(this.props.firestore.Learning.symobol.data)
    // }
     
    render(){     
       
        // console.log(this.props)
        
        // if(this.state.symobol !== undefined ){
        //     console.log(this.state.symobol.data[0]);
        //     let a= this.state.symobol.data[0];
        //     return(
        //         <div>
        //             <div className="ContentImg">
        //                 <div></div>
        //                 <div className="TC_SymobolExample_M">ㄅ</div>
        //             </div>
        //             <div className="ContentImgDetail">
        //                 {/* <span>{a.pinyin}</span>
        //                 <span>{a.chinese}</span> */}
        //                 <span>拼音</span>
        //                 <span>英文</span>
        //             </div>
        //             <div className="TC_SymobolMenu">
        //                 {/* <img src={a.img}/> */}
        //                 <img/>
        //                 <img/>
        //             </div>
                
        //         </div>
        //     )
        // }else{
        //     return <div>nothing</div>
        // }
        return(
            <Fragment>
          
                {/* <input type="file" id="files" name="files" />
                <br/> */}
                {/* <textarea id="base64" rows="5" ></textarea> */}
            </Fragment>
        )
    }
}   


// updating auduo completed
// function handleFileSelect(evt) {
//     let f = evt.target.files[0]; // FileList object
//     let reader = new FileReader();
//     // Closure to capture the file information.
//     reader.onload = (function(theFile) {
//         return function(e) {
//             let binaryData = e.target.result;
//             //Converting Binary Data to base 64
//             let base64String = window.btoa(binaryData);
//             //showing file converted to base64
//             document.getElementById("base64").value = base64String;
//             updateAudio(base64String)
//         };


//         function updateAudio(base64String){
//             let previousAudioArr=[];
//             let db =firebase.firestore().collection("Learning").doc("symobol").collection("audio").doc("audioSecond");
//             db.get().then(doc => {
//                 previousAudioArr = doc.data().audio;
//                 previousAudioArr.push(base64String);
//                 // console.log(previousAudioArr)
//                 return previousAudioArr
//             })
//             .then((previousAudioArr)=>{
//                 db.update({
//                     audio : previousAudioArr
//                 }).then(() => {
//                     console.log("audio data successful");
//                 }).catch((err)=>{
//                     console.log("update fail"+err)
//                 })  
//             })
              
//         }
//     })(f);
   
//     reader.readAsBinaryString(f);
// }









const mapStateToProps = ( state ) => {
   
    return{
      firestore: state.firestore
    }
}

export default compose( 
    firestoreConnect(() => [
      {
        collection: "Learning"
      }
    ]),
    connect(mapStateToProps)
)( SymobolData );
