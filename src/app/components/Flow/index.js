import React, {Component} from 'react';

import FlowStone from "../FlowStone";
import './index.scss';

export default class Flow extends Component {
    
    constructor(){
        super();
        this.startMusic();
        this.state = {
            gameMap : this.getRandomMap(),
            selectedStone: {}
        }
        console.log(this.state.columns);
    }
    
    startMusic(){
        let rythm = new Rythm();
        rythm.setMusic('rythm.mp3');
        rythm.startingScale  = 0.90;
        rythm.pulseRatio  = 0.10;
        rythm.maxValueHistory = 50;
        rythm.setGain(0.05);
        rythm.addRythm('stone-1','size',0,10);
        rythm.addRythm('stone-2','size',150,40);
        rythm.addRythm('stone-3','size',500,100);
        rythm.start();
    }
    
    getRandomMap() {
        let randomMap = [];
        let size = parseInt(3+(Math.random()*3)+1);
        for(let x = 0; x < size; x++){
            for(let y = 0; y < size; y++){
                randomMap.push({
                    x:x,
                    y:y,
                    value: parseInt((Math.random()*3)+1)
                });
            }
            
        }
        return randomMap;
    }
    
    swapStone(gameMap, stone1, stone2){
        let newMap = gameMap.map(function(column, columnIndex){
            return column;
        });
        let tmpX = stone1.x;
        let tmpY = stone1.y;
        stone1.x = stone2.x;
        stone1.y = stone2.y;
        stone2.x = tmpX;
        stone2.y = tmpY;
        return gameMap;
    }
    
    
    
    render() {
        
        const selectStone = (event, stone) => {
            console.log("Selecting stone", stone);
            if(this.state.selectedStone.value){
                let newGameMap = this.state.gameMap;
                if((Math.abs(stone.x - this.state.selectedStone.x) + Math.abs(stone.y - this.state.selectedStone.y)) == 1){
                    newGameMap = this.swapStone(this.state.gameMap, this.state.selectedStone, stone)
                }
                this.setState({
                    selectedStone: {},
                    gameMap: newGameMap
                });
            }else{
                this.setState({
                    selectedStone:stone
                })    
            }
        }
        
        const renderStone = (stone, key) => {
            return (
                <FlowStone key={key} stone={stone} onSelect={(e,x,y,value) => selectStone(e, stone)}>
                </FlowStone>
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
                    {this.state.gameMap.map(renderStone)}
                </div>
            </div>
        );
    }
    
}