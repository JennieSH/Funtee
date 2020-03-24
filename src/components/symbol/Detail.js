import React from "react";

class FrontSymbol extends React.Component{
    render(){ 
        const symbol = this.props.symbol;
        const index = this.props.index;
        return(
            <div className="ContentImg">
                <div>{ symbol.imgs ? <img src={ symbol.imgs[index] }/> : null }</div>
                <span className="center">{ symbol.zhuyin[index] }</span>
            </div>
        )         
    }
}

class BackSymbol extends React.Component{
    render(){
        const symbol = this.props.symbol;
        const index = this.props.index;
        return(
            <div className="ContentImgDetail">
                <span>{ symbol.zhuyin[index] }</span>
                <span>{ symbol.pinyin[index] }</span>
                <span>{ symbol.chinese[index] }</span>
                <span>{ symbol.english[index] }</span>
            </div>
        )         
    }
}
export { FrontSymbol, BackSymbol }