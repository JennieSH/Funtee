import React from "react";
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
    // Mobile
    touchStart(e){
        this.draw = true;
        this.touch = e.targetTouches[0]; // default the first finger
        let ctx = this.getContext("2d");
        let startX = this.offsetLeft ;
        let startY = this.offsetTop ;
        ctx.strokeStyle = "#272727";
        ctx.lineWidth = 6;
    
        ctx.beginPath();
        ctx.moveTo(this.touch.pageX-startX ,this.touch.pageY-startY);
        e.preventDefault(); // avoiding other touching actions
    }  
    touchMove(e) {
        let ctx = this.getContext("2d");
        this.touch = e.targetTouches[0];   
        let startX = this.offsetLeft;
        let startY = this.offsetTop;
    
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
        this.ctx.strokeStyle="#272727";
        this.ctx.lineWidth=6;
    
        var o=this;
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
        return(
            <>
              <canvas id="cvs"/>
              <i className="material-icons waves-effect" id="undoBtn">replay</i>
            </>
        )
    }
}


export default WritingBoard