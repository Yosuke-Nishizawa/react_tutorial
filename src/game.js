import React from 'react';
import {Board} from './board.js';
import * as nishi_weak from './nishi.js';
import * as nishi_strong from './nishi3.js';

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winnerHistory: [],
    };
  }
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const winner = calculateWinner(squares);
    const wh = this.state.winnerHistory.slice();
    let winnerHistory;
    if(winner){
      winnerHistory = wh.concat(winner);
    }else{
      winnerHistory = wh;
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winnerHistory: winnerHistory,
    });
  }
  handleReset(){
    this.setState({squares: Array(9).fill(null)});
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      if(this.state.xIsNext === false){
        let index = nishi_weak.judge(this.state.squares,this.state.xIsNext ? 'X' : 'O');
        this.handleClick(index);
      }
    }
    const tableTags = this.state.winnerHistory.map((val,i) =>{
      return(
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{val}</td>
        </tr>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>
            <label className="container">
              <input type="radio" name="strong" value="weak" defaultChecked></input>
              弱い
              <span className="checkmark"></span>
            </label>
            <label className="container">
              <input type="radio" name="strong" value="strong"></input>
              強い
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <button className="reset_button" onClick={()=>this.handleReset()}>リセット</button>
            <span>先攻 : 俺</span>
          </div>
          <div>{status}</div>
          <div>
            <div>
              <span>対戦成績</span>
              <span>勝率 : 25.0%</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>回</th>
                  <th>勝者</th>
                </tr>
              </thead>
              <tbody>{tableTags}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export{Game};