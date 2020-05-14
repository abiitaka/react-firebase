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
        this.state = {
            xIsNext: true,
            squares: Array(12).fill(null),
            gameBoard: [3, 2, 6, 2, 6, 5, 5, 4, 1, 3, 1, 4],
            history: [],
            clickCount: 1,
            isPair: false,
            pairCount: 0,
            isStart: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i] && this.state.gameBoard.length === 0) {
            return;
        }

        // 盤表示
        squares[i] = this.state.gameBoard[i];

        // 表示履歴
        this.state.history.push(i);

        // ペア判定
        let isPair = this.isPair(this.state.history);
        let pairCount = this.state.pairCount;
        if (isPair) {
            pairCount = pairCount + 1;
        }

        this.setState({
            squares: squares,
            history: this.state.history,
            clickCount: this.state.clickCount + 1,
            isPair: isPair,
            pairCount: pairCount,
        });

        // ペア一致しない場合はボード版を戻す
        this.reverseBoard(this.state.history, squares, isPair);
    }

    isPair(history) {
        if (!this.isTwoClick(history)) {
            return false;
        }

        const oneIndexHistory = history[history.length - 2];
        const twoIndexHistory = history[history.length - 1];
        if (this.state.gameBoard[twoIndexHistory] === this.state.gameBoard[oneIndexHistory]) {
            return true;
        } else {
            return false;
        }
    }

    isTwoClick(history) {
        const isTwoClick = history.length % 2;
        return !(isTwoClick === 1)
    }

    reverseBoard(history, squares, isPair) {
        if (!this.isTwoClick(history)) {
            return;
        }

        if (!isPair) {
            setTimeout(() => {
                // ボードを2つ戻す
                squares[history[history.length - 2]] = null;
                squares[history[history.length - 1]] = null;
                this.setState({ squares: squares, });
            }, 300);
        }
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() {
        const isEnd = (this.state.squares[0] && this.state.pairCount === this.state.gameBoard.length / 2);
        return (
            <div>
                <p>{!isEnd ? (this.state.pairCount + 'ペア　') : 'ゲーム終了'}</p>
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
