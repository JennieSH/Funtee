import React from "react";
import flashCard from "../../imgs/HP-flashCard.png";
import learn from "../../imgs/HP-learn.png";


class Information extends React.Component{

    render(){
        return(
            <div className="informationContainer">       
            
                <div className="information card">
                    <div className="card-image learn" > 
                        <img src={learn}/>            
                        <a className="btn-floating halfway-fab" ><i className="material-icons">extension</i></a>   
                    </div>
                    <div className="card-content">
                        <span className="card-title">Chinese Lessons</span>
                        <p>The beauty of Funtee is that you don't need to study our lessons in a specific order, they are self-contained.
                            <br/><br/>
                            We also provide Mandarin Phonetic Symbols to help you pronounce and remember Traditional Chinese.
                        </p>
                    </div>                      
                </div>

                <div className="information card">
                    <div className="card-image flashCard" >
                        <img src={flashCard}/>
                        <a className="btn-floating halfway-fab"><i className="material-icons">extension</i></a>   
                    </div>
                    <div className="card-content">
                        <span className="card-title">Flash Card</span>
                        <p>Flashcards are effective because they are founded on the principles of rote and memorization. 
                            <br/>
                            <br/>
                            With Funtee, you can use our web-based flashcard maker to create your own set. 
                        </p>
                    </div>                      
                </div>

            </div> 
        )         
    }
}
export default Information