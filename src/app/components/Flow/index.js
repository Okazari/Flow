import React, {Component} from 'react';

import FlowColumn from "../FlowColumn";
import './index.scss';

export default class Flow extends Component {
    
    constructor(){
        super();
        this.state = {
            gameMap : [[1,2,1,1,2],[1,3,2,3,2],[1,3,2,2,3],[1,1,2,3,3],[1,2,2,3,1]]
        }
        console.log(this.state.columns);
    }
    
    getRandomMap() {
        let randomMap = [];
        let size = parseInt(3+(Math.random()*3)+1);
        for(let i = 0; i < size; i++){
            let columnArray = [];
            for(let i = 0; i < size; i++){
                columnArray.push(parseInt((Math.random()*3)+1));
            }
            randomMap.push(columnArray);
        }
        return randomMap;
    }
    
    renderColumns(elements, key){
        return (
            <FlowColumn key={key} elements={elements}>
            </FlowColumn>
            )
    }
    
    render() {
        const randomize = () => {
            this.setState({
                gameMap : this.getRandomMap()
            })
        };
        
        return (
            <div>
                <div className="flow-container">
                    {this.state.gameMap.map(this.renderColumns)}
                </div>
                <button onClick={randomize}>Randomize</button>
            </div>
        );
    }
    
}