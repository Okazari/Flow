import React, {Component} from 'react';

import FlowStone from "../FlowStone";
import './index.scss';

export default class Flow extends Component {

    constructor(){
        super();
        //this.startMusic();
        this.directions = ['LEFT','UP','RIGHT','DOWN']
        this.size = 8;
        this.stonesToRemove = [];
        this.dirtyStones = [];

        this.lock = true;
        this.state = {
            gameMap : this.getRandomMap(),
            selectedStone: {}
        }
        this.lock = false;
    }

    componentDidMount(){
      this.tick();
    }

    tick(){
      let stone = this.dirtyStones.shift()
      while(stone){
        let matchs = this.getMatchs(this.state.gameMap, stone, stone.value);
        if(matchs.LEFT.length + matchs.RIGHT.length >= 2){
          if(this.stonesToRemove.indexOf(stone) === -1){
            this.stonesToRemove.push(stone)
          }
          matchs.LEFT.forEach(match => {
            if(this.stonesToRemove.indexOf(match) === -1){
              this.stonesToRemove.push(match)
            }
          })
          matchs.RIGHT.forEach(match => {
            if(this.stonesToRemove.indexOf(match) === -1){
              this.stonesToRemove.push(match)
            }
          })
        }
        if(matchs.UP.length + matchs.DOWN.length >= 2){
          if(this.stonesToRemove.indexOf(stone) === -1){
            this.stonesToRemove.push(stone)
          }
          matchs.UP.forEach(match => {
            if(this.stonesToRemove.indexOf(match) === -1){
              this.stonesToRemove.push(match)
            }
          })
          matchs.DOWN.forEach(match => {
            if(this.stonesToRemove.indexOf(match) === -1){
              this.stonesToRemove.push(match)
            }
          })
        }
        stone = this.dirtyStones.shift();
      }
      if(this.stonesToRemove.length > 0){
        let removedStonesPositions = this.stonesToRemove.map(stone => {
          return {x:stone.x, y:stone.y};
        });
        let newGameMap = this.removeStones(this.state.gameMap,this.stonesToRemove);
        this.stonesToRemove = []
        this.setState({
          gameMap: newGameMap,
        })
        setTimeout(() =>{
          newGameMap = this.gravity(newGameMap, removedStonesPositions);
          this.setState({
            gameMap: newGameMap
          })

          setTimeout(() => this.tick(), 300);
        }, 100);
      }else{
        this.clickTrigger = false;
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
        rythm.pulseRatio  = 0.20;
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
              let newStone = {
                  x:x,
                  y:y,
                  value: this.getRandomStoneValue()
              };
              randomMap.push(newStone);
              this.dirtyStones.push(newStone);
            }

        }
        return randomMap;
    }

    getMatchs(map, stone, value){
      let result = {}
      this.directions.forEach(direction => {
        result[direction] = this.getMatchsByDirection(map, stone, direction, value);
      })
      return result;
    }

    getMatchsByDirection(map, stone, direction, value){
      if(direction === 'LEFT'){
        if(stone.x > 0){
          let leftStone = this.findStone(map, stone.x-1, stone.y);
          if(leftStone && leftStone.value === stone.value){
            return [leftStone].concat(this.getMatchsByDirection(map, leftStone, direction, value));
          }
        }
        return [];
      }
      else if(direction === 'RIGHT'){
        if(stone.x < this.size-1){
          let rightStone = this.findStone(map, stone.x+1, stone.y);
          if(rightStone && rightStone.value === stone.value){
            return [rightStone].concat(this.getMatchsByDirection(map, rightStone, direction));
          }
        }
        return [];
      }
      else if(direction === 'UP'){
        if(stone.y > 0){
          let upStone = this.findStone(map, stone.x, stone.y-1);
          if(upStone && upStone.value === stone.value){
            return [upStone].concat(this.getMatchsByDirection(map, upStone, direction));
          }
        }
        return [];
      }
      else if(direction === 'DOWN'){
        if(stone.y < this.size-1){
          let downStone = this.findStone(map, stone.x, stone.y+1);
          if(downStone && downStone.value === stone.value){
            return [downStone].concat(this.getMatchsByDirection(map, downStone, direction));
          }
        }
        return [];
      }
    }

    gravity(gameMap, deletedStonesPositions){
      deletedStonesPositions.sort((a,b)=>{
        if(a.x < b.x){
          return -1;
        }else if(a.x > b.x){
          return 1;
        }else if(a.y < b.y){
          return  -1;
        }else if(a.y > b.y){
          return 1;
        }else{
          return 0;
        }
      })
      deletedStonesPositions.forEach(stone => {
        gameMap.forEach(otherStone =>{
          if(otherStone.x === stone.x && otherStone.y <= stone.y){
            otherStone.y++;
            if(this.dirtyStones.indexOf(otherStone) === -1){
              this.dirtyStones.push(otherStone);
            }
          }
        })
      })
      return gameMap;
    }

    removeStones(gameMap, stonesToDelete){
        stonesToDelete.forEach(stone => {
          delete gameMap[gameMap.indexOf(stone)];
          let newStone = {
            x:stone.x,
            y:this.getAddY(gameMap,stone.x),
            value:this.getRandomStoneValue()
          };
          this.dirtyStones.push(newStone);
          gameMap.push(newStone);

        })
        return gameMap;
    }

    getAddY(gameMap, x){
      let y = 0;
      gameMap.forEach(stone=>{
        if(stone.x === x){
          if(y >= stone.y){
            y = stone.y;
          }
        }
      })
      return y - 1
    }

    swapStone(gameMap, stone1, stone2){
        let tmpX = stone1.x;
        let tmpY = stone1.y;
        stone1.x = stone2.x;
        stone1.y = stone2.y;
        stone2.x = tmpX;
        stone2.y = tmpY;
        this.dirtyStones.push(stone1,stone2);
        return gameMap;
    }


    render() {

        const selectStone = (stone) => {
            if(this.state.selectedStone.value){
                let newGameMap = this.state.gameMap;
                if((Math.abs(stone.x - this.state.selectedStone.x) + Math.abs(stone.y - this.state.selectedStone.y)) == 1){
                    newGameMap = this.swapStone(this.state.gameMap, this.state.selectedStone, stone)
                }
                this.setState({
                  gameMap: newGameMap,
                  selectedStone: {}
                })
                if(!this.clickTrigger){
                  this.clickTrigger = true;
                  setTimeout(() => {this.tick()}, 4000);
                }
            }else{
                this.setState({
                    selectedStone:stone
                })
            }
        }

        const renderStone = (stone, key) => {
            return (
                <FlowStone key={key} stone={stone} onSelect={(e,x,y,value) => selectStone(stone)}>
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
