import React, {Component} from 'react';

import FlowStone from "../FlowStone";
import './index.scss';

export default class Flow extends Component {

    constructor(){
        super();
        //this.startMusic();
        this.directions = ['LEFT','UP','RIGHT','DOWN']
        this.size = 6;
        this.state = {
            gameMap : this.getRandomMap(),
            selectedStone: {}
        }
    }

    findStone(map,x,y){
        return map.filter(element => {
            return x === element.x && y === element.y;
        })[0];
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
        rythm.addRythm('stone-4','size',0,600);
        rythm.start();
    }

    getRandomStoneValue(){
      return parseInt((Math.random()*4)+1)
    }

    getRandomMap() {
        let randomMap = [];
        let size = this.size;
        for(let x = 0; x < size; x++){
            for(let y = 0; y < size; y++){
                randomMap.push({
                    x:x,
                    y:y,
                    value: this.getRandomStoneValue()
                });
            }

        }
        return randomMap;
    }

    getMatchs(map, stone){
      let result = {}
      this.directions.forEach(direction => {
        result[direction] = this.getMatchsByDirection(map, stone, direction);
      })
      return result;
    }

    getMatchsByDirection(map, stone, direction){
      if(direction === 'LEFT'){
        if(stone.x > 0){
          let leftStone = this.findStone(map, stone.x-1, stone.y);
          if(leftStone.value === stone.value){
            return 1 + this.getMatchsByDirection(map, leftStone, direction);
          }
        }
        return 0;
      }
      else if(direction === 'RIGHT'){
        if(stone.x < this.size-1){
          let rightStone = this.findStone(map, stone.x+1, stone.y);
          if(rightStone.value === stone.value){
            return 1 + this.getMatchsByDirection(map, rightStone, direction);
          }
        }
        return 0;
      }
      else if(direction === 'UP'){
        if(stone.y > 0){
          let upStone = this.findStone(map, stone.x, stone.y-1);
          if(upStone.value === stone.value){
            return 1 + this.getMatchsByDirection(map, upStone, direction);
          }
        }
        return 0;
      }
      else if(direction === 'DOWN'){
        if(stone.y < this.size-1){
          let downStone = this.findStone(map, stone.x, stone.y+1);
          if(downStone.value === stone.value){
            return 1 + this.getMatchsByDirection(map, downStone, direction);
          }
        }
        return 0;
      }
    }

    swapStone(gameMap, stone1, stone2){
        let tmpX = stone1.x;
        let tmpY = stone1.y;
        stone1.x = stone2.x;
        stone1.y = stone2.y;
        stone2.x = tmpX;
        stone2.y = tmpY;
        return gameMap;
    }



    render() {

        const removeStone = (map, stone) => {
            delete map[map.indexOf(stone)];
            map.push({x:stone.x,
                      y:-1,
                      value:this.getRandomStoneValue()});
            map.forEach(otherStone =>{
              if(otherStone.x === stone.x && otherStone.y < stone.y){
                otherStone.y++;
              }
            })
            return map;
        }

        const selectStone = (event, stone) => {
            if(this.state.selectedStone.value){
                let newGameMap = this.state.gameMap;
                if((Math.abs(stone.x - this.state.selectedStone.x) + Math.abs(stone.y - this.state.selectedStone.y)) == 1){
                    newGameMap = this.swapStone(this.state.gameMap, this.state.selectedStone, stone)
                }
                this.setState({
                  gameMap: newGameMap
                })
                setTimeout(() => {
                  let direction = this.getMatchs(newGameMap,stone);
                  if(direction.LEFT + direction.UP + direction.DOWN + direction.RIGHT >= 2){
                    newGameMap = removeStone(newGameMap,stone);
                  }
                  direction = this.getMatchs(newGameMap, this.state.selectedStone);
                  if(direction.LEFT + direction.UP + direction.DOWN + direction.RIGHT >= 2){
                    newGameMap = removeStone(newGameMap,this.state.selectedStone);
                  }
                  this.setState({
                      selectedStone: {},
                      gameMap: newGameMap
                  });
                },300)
            }else{
                this.setState({
                    selectedStone:stone
                })
            }
        }

        const renderStone = (stone, key) => {
            return (
                <FlowStone key={key} stone={stone} onSelect={(e,x,y,value) => selectStone(e,stone)}>
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
