import React, {Component} from 'react';

import FlowColumn from "../FlowColumn";
import './index.scss';

export default class Flow extends Component {
    
    constructor(){
        super();
        this.state = {
            gameMap : this.getRandomMap(),
            selectedStone: {}
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
    
    swapStone(gameMap, stone1, stone2){
        /*console.log(gameMap);
        console.log(stone1);
        console.log(stone2);*/
        let newMap = gameMap.map(function(column, columnIndex){
            return column;
        });
        gameMap[stone1.x][stone1.y] = stone2.value
        gameMap[stone2.x][stone2.y] = stone1.value;
        return gameMap;
    }
    
    
    
    render() {
        
        const selectStone = (event, stoneIndexX, stoneIndexY, value) => {
            if(this.state.selectedStone.value){
                console.log(this.state.selectedStone);
                let stoneToSwap = {
                    x: stoneIndexX,
                    y: stoneIndexY,
                    value: value
                }
                let newGameMap = this.swapStone(this.state.gameMap, this.state.selectedStone, stoneToSwap)
                this.setState({
                    selectedStone: {},
                    gameMap: newGameMap
                })
            }else{
                this.setState({
                    selectedStone:{
                        x: stoneIndexX,
                        y: stoneIndexY,
                        value: value
                    }
                })    
            }
        }
        
        const renderColumns = (elements, key) => {
            return (
                <FlowColumn key={key} elements={elements} onClickElement={(event,indexX, value) => selectStone(event, key, indexX, value)}>
                </FlowColumn>
                )
        }  
        
        const randomize = () => {
            this.setState({
                gameMap : this.getRandomMap()
            })
        };
        
        return (
            <div>
                <div className="flow-container">
                    {this.state.gameMap.map(renderColumns)}
                </div>
                <button onClick={randomize}>Randomize</button>
            </div>
        );
    }
    
}