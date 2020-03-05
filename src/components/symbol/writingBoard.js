import React, { Fragment } from "react";
class WritingBoard extends React.Component{

    componentDidMount(){
        const cvs = document.getElementById("cvs");
        const undoBtn = document.getElementById("undoBtn");
        // addEventListener : false 時，採用bubbing（冒泡，且不能用 arrow func)

        // Mobile
        cvs.addEventListener("touchstart", this.touchStart, false);
        cvs.addEventListener("touchmove",  this.touchMove, false);
        cvs.addEventListener("touchend", this.touchEnd, false);

        // Web
        cvs.addEventListener("mousedown", this.mouseDown);
        cvs.addEventListener("mousemove",  this.mouseMove);
        cvs.addEventListener("mouseup", this.mouseUp);

        // Undo
        undoBtn.addEventListener("click", this.clearCanvas)
    }
    componentWillUnmount(){

        // Mobile
        cvs.removeEventListener("touchstart", this.touchStart, false);
        cvs.removeEventListener("touchmove",  this.touchMove, false);
        cvs.removeEventListener("touchend", this.touchEnd, false);

        // Web
        cvs.removeEventListener("mousedown", this.mouseDown);
        cvs.removeEventListener("mousemove",  this.mouseMove);
        cvs.removeEventListener("mouseup", this.mouseUp);

        // Undo
        undoBtn.removeEventListener("click", this.clearCanvas)
    }
    // Mobile
    touchStart(e){
        this.draw = true;
        this.touch = e.targetTouches[0]; // default the first finger
        const ctx = this.getContext("2d");
        const startX = this.offsetLeft ;
        const startY = this.offsetTop ;
        ctx.strokeStyle = "#d50000";
        ctx.lineWidth = 6;
    
        ctx.beginPath();
        ctx.moveTo(this.touch.pageX-startX ,this.touch.pageY-startY);
        e.preventDefault(); // avoiding other touching actions
    }  
    touchMove(e) {
        const ctx = this.getContext("2d");
        this.touch = e.targetTouches[0];   
        const startX = this.offsetLeft;
        const startY = this.offsetTop;
    
        if (this.draw){
            ctx.lineTo(this.touch.pageX-startX, this.touch.pageY-startY);
            ctx.stroke();
        };
        e.preventDefault();
    } 
    touchEnd(e){
        this.draw=false;
        e.preventDefault();
    }
    // Web
    mouseDown(e){
        this.draw=true;
        this.ctx = this.getContext("2d");
        this.ctx.strokeStyle = "#d50000";
        this.ctx.lineWidth=6;
    
        let o=this;
        this.offsetX=this.offsetLeft;
        this.offsetY=this.offsetTop;
    
        while(o.offsetParent){
            o=o.offsetParent;
            this.offsetX+=o.offsetLeft;
            this.offsetY+=o.offsetTop;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX-this.offsetX,e.pageY-this.offsetY);
    }
    mouseMove(e){
        if (this.draw){
            this.ctx.lineTo(e.pageX-this.offsetX,e.pageY-this.offsetY);
            this.ctx.stroke();
        }
    }
    mouseUp(e){       
        this.draw = false;
    }
    // Undo
    clearCanvas(e) {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext("2d");
        ctx.clearRect( 0, 0, cvs.width, cvs.height);
    }

    render(){      
        const zhinyinArr = this.props.symbolZhuyin;
        const style={
            backgroundImage: `url(${zhinyinArr[this.props.index-1]})`,
            backgroundSize: "contain",
            WebkitBackgroundSize: "contain",
            backgroundRepeat:"no-repeat", 
            opacity: 0.4,    
        } 
        return(
            <Fragment>
                <div className="writingBoard">
                    <canvas id="cvs" style={ style }/>
                    <div className="writingBoardMenu">
                        <i className="material-icons waves-effect" id="undoBtn">replay</i>  
                    </div>  
                </div>        
            </Fragment >
        )
    }
}


export default WritingBoard