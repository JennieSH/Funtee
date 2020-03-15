import React from "react";

class Content extends React.Component{

    render(){   
        const { lesson, index, id } = this.props;
        return(                   
            <div className="tcLessonContent" id={ id }>
                <div className="lessonImg">
                    <img src={ lesson[index].imgs }/>
                </div>                    
                <ul className="lessonDetail">
                    <li>{ lesson[index].zhuyin }</li>
                    <li>{ lesson[index].pinyin }</li>
                    <li>{ lesson[index].chinese }</li>
                    <li>{ lesson[index].english }</li>                            
                </ul>    
            </div>
        )
    }    
}

export default Content
