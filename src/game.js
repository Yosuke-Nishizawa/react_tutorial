import React from 'react';
import {Board} from './board.js';

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
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
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
            <button>リセット</button>
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
              <tbody>
                <tr>
                  <td>1</td>
                  <td>君</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>俺</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>俺</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>俺</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>俺</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export{Game};