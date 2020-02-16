import React from "react";
import { connect } from "react-redux";
import { getSymbolAudio, getSymbolAudioEach } from "../../store/actions/symbolAction";
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
class TC_SymbolContent extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            isRecording: false,
            blobURL: "",
            isBlocked: false,
          }
    }

    componentDidMount(){      
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              this.setState({ isBlocked: false });
            },
            () => {
              console.log('Permission Denied');
              this.setState({ isBlocked: true })
            },
          );
    }
    handleRead(){
        document.getElementById("audio").play()
    }  

    handleRecord (){
        if( this.state.isRecording === false){
            if (this.state.isBlocked) {
                console.log('Permission Denied');
              } else {
                Mp3Recorder
                  .start()
                  .then(() => {
                    this.setState({ isRecording: true });
                  
                  }).catch((e) => console.error(e));
              }
        }else{
            Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
              const blobURL = URL.createObjectURL(blob)
             
              this.setState({ blobURL, isRecording: false });
            }).catch((e) => console.log(e));
        }
    }

    handlePlay (){
        document.getElementById("audioRecord").play()
    }  



    render(){
        let index = this.props.indexPage-1;
        let symbol = this.props.symbol;
        console.log(this.state.isRecording)
        return(
            <div className="TC_SymobolContent" id="TC_SymbolContent">           
                <div className="ContentImg">
                    <div>{ symbol.imgs ? <img src={ symbol.imgs[index] }/>:null}</div>
                    <div className="TC_SymobolExample"><img src={ symbol.svg[index]}/></div>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 2048 2048" version="1.1">
                        <g x="0" y="0"><g x="0" y="0">
                            <path d="M 768 1686 L 728 1640 Q 717 1630, 720 1626 Q 723 1622, 733 1626 L 794 1655 Q 927 1721, 958.5 1730.5 Q 990 1740, 1024 1739 Q 1095 1737, 1162 1684.5 Q 1229 1632, 1333.5 1476 Q 1438 1320, 1503.5 1156.5 Q 1569 993, 1588 919 L 1602 860 Q 1607 840, 1609.5 828 Q 1612 816, 1611 803 Q 1609 780, 1587 754.5 Q 1565 729, 1510 734 L 1301 754 L 1060 780 L 830 803 Q 578 830, 455 851 Q 332 872, 321 871 Q 272 870, 248 829.5 Q 224 789, 224 742 Q 224 718, 230 705.5 Q 236 693, 263.5 670.5 Q 291 648, 311.5 627.5 Q 332 607, 399 523.5 Q 466 440, 507 363.5 Q 548 287, 557.5 266 Q 567 245, 592.5 183 Q 618 121, 624.5 114 Q 631 107, 641 105 Q 653 104, 706 127 Q 759 150, 782 175.5 Q 805 201, 805.5 211.5 Q 806 222, 794 244 L 774 282 Q 760 307, 715 376 Q 670 445, 601 528 L 534 608 Q 518 627, 509 637 Q 500 647, 498 652.5 Q 496 658, 495.5 664.5 Q 495 671, 508 680 Q 521 689, 554 686 Q 576 685, 672 675 Q 768 665, 1145 632 L 1412 609 Q 1551 598, 1586 589 Q 1621 580, 1628 580 Q 1640 581, 1652 587.5 Q 1664 594, 1694 621 Q 1724 648, 1736 662 Q 1748 676, 1774.5 709 Q 1801 742, 1811.5 758.5 Q 1822 775, 1822.5 791.5 Q 1823 808, 1814 832 Q 1792 891, 1785 912 L 1762 981 L 1709 1135 Q 1693 1182, 1651 1282 Q 1609 1382, 1565.5 1475.5 Q 1522 1569, 1451 1674.5 Q 1380 1780, 1271.5 1851 Q 1163 1922, 1109 1932.5 Q 1055 1943, 1016 1943 Q 961 1945, 940.5 1926.5 Q 920 1908, 889.5 1855.5 Q 859 1803, 836 1771 Q 813 1739, 768 1686 Z" fill="black" strokeWidth="1"></path>
                            </g>
                        </g>
                    </svg> */}
                </div>
                <div className="ContentImgDetail">
                    <span className="pink-text text-darken-3">{ symbol.zhuyin[index] }</span>
                    <span className="grey-text text-darken-2">{ symbol.pinyin[index] }</span>
                    <span className=" teal-text text-lighten-">{ symbol.chinese[index] }</span>
                    <span className="blue-text text-darken-2">{ symbol.english[index] }</span>
                </div>

                <div className="TC_SymobolMenu">
                    <i className="material-icons waves-effect" onClick={ this.handleRead.bind(this) }>
                        volume_up
                        <audio src={symbol.audio[index]} id="audio"/>
                    </i>                                          
                    <i className="socket waves-effect" onClick={ this.handleRecord.bind(this) }>
                        <div className={`record ${ this.state.isRecording? "active":null}`}></div>                      
                    </i>
                    <i className="material-icons waves-effect" onClick={ this.handlePlay.bind(this) }>play_arrow
                        <audio src={this.state.blobURL} id="audioRecord"/>
                    </i>             
                </div> 
            </div>
        )       
    }
}

const mapStateToProps = ( state ) => {
    return{
        indexPage: state.symbol.indexPage,
        symbolAudio: state.symbol
    }
}

// const mapDispatchToProps = ( dispatch ) => {
//     return{
//         getSymbolAudio:  () => dispatch(getSymbolAudio()),
//         getSymbolAudioEach: ( audioEach )=> dispatch(getSymbolAudioEach(audioEach))
//     }
// }

export default connect(mapStateToProps, null)( TC_SymbolContent);