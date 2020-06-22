import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClick()}
            >
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        const squareCount = 12;
        this.state = {
            gameBoard: this.gnerateBoard(squareCount),
            selectBoard: Array(squareCount).fill(null),
            history: [{ selectBoard: Array(squareCount).fill(null) }],
            previous: null,
            isPair: null,
        }
    }

    handleClick(current) {
        // 盤表示
        const selectBoard = this.state.selectBoard.slice();
        selectBoard[current] = this.state.gameBoard[current];

        // ペア判定
        let isPair = null, previous = null;
        if (this.state.previous == null) {
            previous = current;
        } else {
            isPair = this.isPair(selectBoard[this.state.previous], selectBoard[current]);
        }

        // 履歴
        const history = this.state.history.slice();

        this.setState({
            selectBoard: selectBoard,
            history: history.concat([{ selectBoard: selectBoard }]),
            previous: previous,
            isPair: isPair,
        });
    }

    // 盤のペア組み合わせ生成
    gnerateBoard(squareCount) {
        let result = [];
        // ペアの数字を生成
        for (let i = 1; i <= squareCount / 2; i++) {
            result.push(i, i);
        }
        // シャッフル(Fisher-Yates shufflアルゴリズム)
        for (let i = squareCount - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * (i + 1));
            let tmp = result[i];
            result[i] = result[random];
            result[random] = tmp;
        }
        return result;
    }

    // ペアをチェックする
    isPair(previous, current) {
        if (previous == null && current == null) {
            return false;
        } else if (previous === current) {
            return true;
        } else {
            return false;
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.selectBoard[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        // ペアにならない場合は盤を戻す 
        if (this.state.isPair === false) {
            setTimeout(() => {
                const history = this.state.history.slice(0, this.state.history.length - 2);
                const selectBoard = history[history.length - 1].selectBoard.slice();
                this.setState({
                    selectBoard: selectBoard,
                    history: history,
                    isPair: null,
                });
            }, 300);
        }
        return (
            <div>
                <p>{this.state.selectBoard.indexOf(null) === -1 ? 'ゲーム終了' : ''}</p>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
