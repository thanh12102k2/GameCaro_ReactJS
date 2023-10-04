import React from 'react';
import Board from './Board';
import { calculateWinner } from './helper';

const defaultWidth = 13;
const defaultHeight = 13;
const minSize = 5;
const maxSize = 20;

class Game extends React.Component {
    constructor(props) {
      super(props);
      let tmpArr = Array(defaultHeight);
      for (let i = 0; i < defaultHeight; i++) {
        tmpArr[i] = Array(defaultWidth).fill(null);
      }
      this.state = {
        inputWidth: defaultWidth,
        inputHeight: defaultHeight,
        width: defaultWidth,
        height: defaultHeight,
        xWins: 0, 
        oWins: 0,
        history: [{
          squares: tmpArr,
          location: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        isDescending: true,
      };
      this.handleChangeHeight = this.handleChangeHeight.bind(this);
      this.handleChangeWidth = this.handleChangeWidth.bind(this);
      this.sort = this.sort.bind(this);
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }

    handleClick(i, j) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      current.squares.map((row, idx) => {
        squares[idx] = current.squares[idx].slice();
        return true;
      })
      if (calculateWinner(squares) || squares[i][j]) {
        return;
      }
      squares[i][j] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          location: {x: i, y: j}
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    sort() {
      this.setState({isDescending: !this.state.isDescending});
    }

    handleChangeWidth(e) {
      const val = Number(e.target.value);
      this.setState({inputWidth: val});
      if (val >= minSize && val <= maxSize) {
        let tmpArr = Array(this.state.height);
        for (let i = 0; i < this.state.height; i++) {
          tmpArr[i] = Array(val).fill(null);
        }
        this.setState({
          width: val,
          history: [{
            squares: tmpArr,
            location: null,
          }],
          stepNumber: 0,
          xIsNext: true,
        });
      }
    }

    handleChangeHeight(e) {
      const val = Number(e.target.value);
      this.setState({inputHeight: val});
      if (val >= minSize && val <= maxSize) {
        let tmpArr = Array(val);
        for (let i = 0; i < val; i++) {
          tmpArr[i] = Array(this.state.width).fill(null);
        }
        this.setState({
          height: Number(val),
          history: [{
            squares: tmpArr,
            location: null,
          }],
          stepNumber: 0,
          xIsNext: true,
        });
      }
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
    
      const moves = history.map((step, move) => {
        const desc = move ? 'Quay lại bước #' + move + ' (' + step.location.x + ',' + step.location.y + ')' : 'Bắt đầu lại';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)} style={{width:"160px"}}>
              {desc}
            </button>
          </li>
        );
      });
    
      if (!this.state.isDescending) {
        moves.reverse();
      }
    
      let status;
      if (winner) {
        status = 'Người thắng: ' + winner.val;
      } else {
        status = 'Bước tiếp theo: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    
      let arrow = this.state.isDescending ? '↓' : '↑';
    
      return (
        <div className="content">
          <div className="game-config">
            <span className="fixed-size">Chiều rộng:</span>
            <input
              type="number"
              placeholder="Chiều rộng"
              value={this.state.inputWidth}
              onChange={this.handleChangeWidth}
            />
            <br />
            <span className="fixed-size" style={{paddingRight:"8px"}}>Chiều cao:</span>
            <input
              type="number"
              placeholder="Chiều cao"
              value={this.state.inputHeight}
              onChange={this.handleChangeHeight}
            />
          </div>
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i, j) => this.handleClick(i, j)}
                winner={winner}
              />
            </div>
            <div className="game-info">
              <div>
                <button onClick={this.sort} style={{marginBottom:"5px"}}>Thứ tự bước {arrow}</button>
              </div>
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      );
    }
  }    

  export default Game;
